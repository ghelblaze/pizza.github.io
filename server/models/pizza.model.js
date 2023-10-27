const mongoose = require("mongoose");
const OrdersSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "pepperoni",
        "cheese",
        "combination",
        "philly",
        "hawaiian",
        "veggie",
      ],
      default: "pepperoni",
      required: [true, "You must select Pizza type"],
    },

    size: {
      type: String,
      enum: ["single", "small", "medium", "large"],
      default: "single",
      required: [true, "You must select Pizza size"],
    },
    notes: {
      type: String,
      maxlength: 25,
    },
    date: {
        type: Date,
        required: [true, "You must add Delivery time"]
    },
    checkDelivery:{
      type: Boolean,
      default:false,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Orders", OrdersSchema);
