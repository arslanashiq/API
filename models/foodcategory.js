const mongoose = require('mongoose');

const foodcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }

});

foodcategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

foodcategorySchema.set('toJSON', {
    virtuals: true,
});

exports.FoodCategory = mongoose.model('FoodCategory', foodcategorySchema);
exports.foodcategorySchema = foodcategorySchema;
