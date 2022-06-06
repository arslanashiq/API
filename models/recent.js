const mongoose = require("mongoose");

const RecentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Object,
    required: true,
  },
  list: {
    type: Object,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
    category:{
        type: String,
        required: true,
    }
});

RecentSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

RecentSchema.set("toJSON", {
  virtuals: true,
});

exports.Recent = mongoose.model("Recent", RecentSchema);
exports.RecentSchema = RecentSchema;
