import OrderModel from "../../models/orderModel.js";
import Stripe from "stripe";
import ProductModel from "../../models/productsModel.js";
import CouponModel from "../../models/couponMedel.js";
import WalletModel from "../../models/walletModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = "inr";
const deliveryCharge = parseInt(process.env.DELIVERY_AMT, 10) || 50;

export const get_user_orders = async (req, res) => {
  try {
    const { id } = req.params; 
    
    const orders = await OrderModel.find({ userId :id}); 
    
    if (!orders || orders.length === 0) {
      return res.status(400).json({ message: 'No orders found for this user!' });
    }

    return res.status(200).json(orders);

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const get_user_order_detail = async(req,res)=>{
  try {
    console.log('req.user:',req.user)
    const { id } = req.params;
    
    const order = await OrderModel.findById(id); 
    
    if (!order ) {
      return res.status(400).json({ message: 'No orders found for this user!' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const order_cancel = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(400).json({ message: 'No orders found for this user!' });
    }

    order.status = 'Cancelled';

    await Promise.all(
      order?.products.map(async (product) => {
        const existProduct = await ProductModel.findById(product?.productId);
        if (existProduct) {
          existProduct.stock += product.quantity;
          await existProduct.save();
        } else {
          console.log(`Product not found: ${product?.productId}`);
        }
      })
    );

    await order.save();

    // Send only one response
    res.status(200).json({ message: 'Order Canceled successfully!' });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const order_return = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(400).json({ message: 'No orders found for this user!' });
    }

    order.status = 'Returned';

    await Promise.all(
      order?.products.map(async (product) => {
        const existProduct = await ProductModel.findById(product?.productId);
        if (existProduct) {
          existProduct.stock += product.quantity;
          await existProduct.save();
        } else {
          console.log(`Product not found: ${product?.productId}`);
        }
      })
    );

    await order.save();

    // Send only one response
    res.status(200).json({ message: 'Order Returned successfully!' });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const place_order = async (req, res) => {
  try {
    const {
      userId,
      products,
      address,
      totalAmt,
      couponId,
      paymentMethod,
      couponUsed,
      couponOfferPercentage,
      maxDiscountAmount,
      minDiscountAmount,
      couponDiscountAmt,
    } = req.body;

    if (!userId || !products?.length || !address || !totalAmt || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const order = new OrderModel({
      userId,
      products,
      address: address._id, 
      totalAmt,
      couponOfferPercentage,
      couponId: couponId || null,
      paymentMethod,
      couponUsed: couponUsed || false,
      deliveryCharge,
      couponDiscountAmt,
      date: new Date(),
      status: "Pending",
    });

    if (paymentMethod === "Stripe") {
      const { origin } = req.headers;

      const line_items = products.map((product) => ({
        price_data: {
          currency,
          product_data: {
            name: product?.name || "Product",
            images: product?.image ? [product.image] : [],
          },
          unit_amount: product?.price * 100, 
        },
        quantity: product?.quantity || 1,
      }));

      line_items.push({
        price_data: {
          currency,
          product_data: {
            name: "Delivery Charges",
            images: [], 
          },
          unit_amount: deliveryCharge * 100, 
        },
        quantity: 1,
      });

      try {
        await order.save();

        const session = await stripe.checkout.sessions.create({
          success_url: `${origin}/success?order_id=${order._id}`,
          cancel_url: `${origin}/failure?order_id=${order._id}`,
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
        });

        await Promise.all(
          products.map(async (product) => {
            const existProduct = await ProductModel.findById(product?.productId);
            if (existProduct) {
              existProduct.stock -= product.quantity; 
              await existProduct.save();
            }
          })
        );

        return res.json({ success: true, session_url: session.url });
      } catch (error) {
        console.error("Stripe API Error:", error);
        return res.status(500).json({ message: "Stripe payment failed.", error: error.message });
      }
    }
    else if (paymentMethod === "Wallet") {
      let wallet = await WalletModel.findOne({ userId });
    
      if (!wallet) {
        return res.status(404).json({
          message: "Wallet not found",
        });
      }
    
      // Check if the wallet balance is sufficient
      if (wallet.balance < totalAmt) {
        return res.status(400).json({
          message: "Insufficient balance in the wallet",
        });
      }
    
      // Deduct the amount from the wallet
      wallet.balance -= totalAmt;
    
      // Add transaction history to the wallet
      wallet.history.push({
        amount: totalAmt,
        status: "completed",
        date: new Date(),
      });
    
      // Save wallet updates
      await wallet.save();
    
      // Save the order
      await order.save();
    
      // Handle coupon logic
      const existCoupon = await CouponModel.findById(couponId);
      if (existCoupon) {
        existCoupon.usedBy.push({ userId });
        await existCoupon.save();
      }
    
      // Update product stocks
      await Promise.all(
        products.map(async (product) => {
          const existProduct = await ProductModel.findById(product?.productId);
          if (existProduct) {
            existProduct.stock -= product.quantity;
            await existProduct.save();
          } else {
            console.log(`Product not found: ${product?.productId}`);
          }
        })
      );
    
      // Send success response
      return res.status(200).json({
        success: true,
        message: "Order placed successfully.",
      });
    }
    
    else {
      await order.save();

      const existCoupon = await CouponModel.findById(couponId);

      if (existCoupon) {
        existCoupon.usedBy.push({ userId });
        await existCoupon.save();
      }

      await Promise.all(
        products.map(async (product) => {
          const existProduct = await ProductModel.findById(product?.productId); 
          if (existProduct) {
            existProduct.stock -= product.quantity;
            await existProduct.save();
          } else {
            console.log(`Product not found: ${product?.productId}`);
          }
        })
      );

      return res.status(200).json({ success: true, message: "Order placed successfully." });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const handle_failed_payment = async(req,res)=>{
  try {
    const {id} = req.params
    const foundOrder = await OrderModel.findById(id)

    if(!foundOrder){
      return res.status(404).json({ message: "Order not found"});
    }

    foundOrder.status = 'Payment Failed'
    foundOrder.save()
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}




