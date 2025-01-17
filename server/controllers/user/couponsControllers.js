import CouponModel from "../../models/couponMedel.js";

export const get_all_coupons = async (req, res) => {
  try {
    const currentDate = new Date();

    const coupons = await CouponModel.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },  
      status: true                
    });

    if (coupons.length > 0) {
      res.status(200).json(coupons);
    } else {
      res.status(404).json({ message: 'No active coupons found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
export const add_coupon = async (req, res) => {
  try {
    const {
      name,
      code,
      discount,
      minDiscountAmount,
      maxDiscountAmount,
      startDate,
      endDate,
      status,
    } = req.body;

    if (
      !name ||
      !code ||
      !discount ||
      !minDiscountAmount ||
      !maxDiscountAmount ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "Start date must be before end date." });
    }

    const existingCoupon = await CouponModel.findOne({
      $or: [{ name }, { code }],
    });

    if (existingCoupon) {
      return res
        .status(400)
        .json({ message: "Coupon name or code already exists." });
    }

    const newCoupon = new CouponModel({
      name,
      code,
      discount,
      minDiscountAmount,
      maxDiscountAmount,
      startDate,
      endDate,
      status: status ?? true, 
    });

    await newCoupon.save();

    res.status(200).json({ message: "Coupon added successfully", newCoupon });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export const toggleBlockCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedCoupon = await CouponModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCoupon) {
      return res.status(404).json({ message: "Coupon not found." });
    }

    res.status(200).json({
      message: "Coupon status updated successfully.",
      updatedCoupon,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

