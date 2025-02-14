import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
        price: { type: Number },
        categoryId:{ type: mongoose.Schema.Types.ObjectId },
        brandId:{ type: mongoose.Schema.Types.ObjectId },
        quantity: { type: Number },
        image: { type: String },
        offerAmt: {
          type: Number,
        },
        offerPercentage :{
          type: Number,
        },
        offerID:{
          type: String
        }
      },
    ],

    address: {
      type: String,
      required: true,
    },

    couponDiscountAmt:{
      type: Number,
      required: true,
    },

    totalAmt: {
      type: Number,
      required: true,
    },

    couponId: {
      type: String,
    },

    couponOfferPercentage :{
      type: Number,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    couponUsed: {
      type: Boolean,
      default: false,
    },

    deliveryCharge: {
      type: Number,
      default: 50,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Payment Failed",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      default: "Pending",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Orders", OrderSchema);
export default OrderModel;
