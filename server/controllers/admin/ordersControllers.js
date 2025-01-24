import OrderModel from '../../models/orderModel.js'
import moment from 'moment';
import WalletModel from '../../models/walletModel.js';

export const get_all_orders = async(req,res)=>{
    try {
        const orders = await OrderModel.find()
        res.status(200).json(orders)
      } catch (error) {
        console.error('Error fetching orders:', error.message)
        res.status(500).send({
          message: 'Error fetching orders',
          error: error.message,
        });
      }
}

export const update_order_status = async (req, res) => {
    const { orderId, status } = req.body;
  
    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required.",
      });
    }
  
    try {
      const order = await OrderModel.findById(orderId);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found.",
        });
      }
  
      order.status = status;


      if (order.paymentMethod === 'Wallet' || order.paymentMethod === 'Returned') {
        const walletUser = await WalletModel.findOne({ userId: order.userId });
        if (!walletUser) {
          return res.status(400).json({ message: 'Wallet not found for this user!' });
        }
  
        walletUser.balance += order.totalAmt;
        await walletUser.save();
      }
  


      await order.save();
  
      return res.status(200).json({
        success: true,
        message: "Order status updated successfully.",
        order,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };

  export const sales_report = async (req, res) => {
    try {
      const { startDate, endDate } = req.query; 
      
      const start_Date = new Date(startDate);
      const end_Date = new Date(new Date(endDate).setHours(23, 59, 59, 999));
      
      const orders = await OrderModel.aggregate([
        { 
          $match: { 
            date: { 
              $gte: start_Date, 
              $lte: end_Date 
            }, 
            status: 'Delivered' 
          }
        },
        { 
          $sort: { 
            date: -1 
          }
        }
      ]);
  
      const formattedOrders = orders.map((order) => ({
        date: moment(order.date).format('YYYY-MM-DD'),
        orderId: order._id,
        totalAmt: order.totalAmt,
        coupon: order.coupon,
        discount: order.discountAmt,
        paymentMethod: order.paymentMethod,
        products: order.products,
      }));
      
      console.log(formattedOrders);
      
      let salesData = formattedOrders.map((element) => ({
        date: element.date,
        orderId: element.orderId,
        totalAmt: element.totalAmt,
        discount: element.discount,
        coupon: element.coupon,
        payMethod: element.paymentMethod,
        products: element.products,
      }));
      
      let grandTotal = salesData.reduce((sum, element) => sum + element.totalAmt, 0);
      
      console.log(grandTotal);
      
      res.json({
        grandTotal,
        orders: salesData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate sales report' });
    }
  };

  export const get_sales_statistics = async (req, res) => {
    try {
      const currentMonthStart = moment().startOf('month').toDate();
      const currentMonthEnd = moment().endOf('month').toDate();
  
      const overallStats = await OrderModel.aggregate([
        {
          $match: { status: 'Delivered' },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalAmt' }, 
            totalSalesCount: { $sum: 1 }, 
          },
        },
      ]);
  
      const monthlyStats = await OrderModel.aggregate([
        {
          $match: {
            status: 'Delivered',
            date: {
              $gte: currentMonthStart,
              $lte: currentMonthEnd,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalAmt' }, 
            totalSalesCount: { $sum: 1 }, 
          },
        },
      ]);
  
      const overallRevenue = overallStats.length > 0 ? overallStats[0].totalRevenue : 0;
      const overallSalesCount = overallStats.length > 0 ? overallStats[0].totalSalesCount : 0;
  
      const monthlyRevenue = monthlyStats.length > 0 ? monthlyStats[0].totalRevenue : 0;
      const monthlySalesCount = monthlyStats.length > 0 ? monthlyStats[0].totalSalesCount : 0;
  
      const statistics = {
        overallRevenue,
        overallSalesCount,
        monthlyRevenue,
        monthlySalesCount,
      };
  
      res.status(200).json({
        success: true,
        statistics,
      });
    } catch (error) {
      console.error('Error fetching sales statistics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch sales statistics. Please try again.',
      });
    }
  };
  
  export const best_sellings_products = async (req, res) => {
    try {
      const best_sellings = await OrderModel.aggregate([
        { $match: { status: "Delivered" } }, 
        { $unwind: "$products" },
        {
          $group: {
            _id: "$products.productId",
            totalQuantityDelivered: { $sum: "$products.quantity" } 
          }
        },
        {
          $lookup: {
            from: "products", 
            localField: "_id", 
            foreignField: "_id",
            as: "productDetails"
          }
        },
        { $unwind: "$productDetails" }, 
        { $sort: { totalQuantityDelivered: -1 } },
        { $limit: 5 } 
      ]);
  
      if (!best_sellings || best_sellings.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No best-selling products found.",
        });
      }
  
      res.status(200).json({
        success: true,
        products: best_sellings,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };

  export const best_selling_categories = async (req, res) => {
    try {
      
      const best_sellings = await OrderModel.aggregate([
        { $match: { status: "Delivered" } },
        { $unwind: "$products" },
        {
          $group: {
            _id: "$products.categoryId",
            totalQuantityDelivered: { $sum: "$products.quantity" },
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        { $unwind: "$categoryDetails" },
        { $sort: { totalQuantityDelivered: -1 } },
        { $limit: 5 }
      ]);
      
  
      if (!best_sellings || best_sellings.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No best-selling products found.",
        });
      }
  
      res.status(200).json({
        success: true,
        categories: best_sellings,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };

  export const best_selling_brands = async (req, res) => {
    try {
      
      const best_sellings = await OrderModel.aggregate([
        { $match: { status: "Delivered" } },
        { $unwind: "$products" },
        {
          $group: {
            _id: "$products.brandId",
            totalQuantityDelivered: { $sum: "$products.quantity" },
          },
        },
        {
          $lookup: {
            from: "brands",
            localField: "_id",
            foreignField: "_id",
            as: "brandDetails",
          },
        },
        { $unwind: "$brandDetails" },
        { $sort: { totalQuantityDelivered: -1 } },
        { $limit: 5 }
      ]);
      
      
  
      if (!best_sellings || best_sellings.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No best-selling brands found.",
        });
      }
  
      res.status(200).json({
        success: true,
        brands: best_sellings,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };