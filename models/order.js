const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_detail:{
        type:Object,
        required:true,
    },
    order_detail:{
        type:Object,
        required:true,
    },
    total_price:{
        type: String,
        required: true,
    },
    order_time:{
        type:String,
        required:false,
    },
    status:{
        type:String,
        required:true,
    }
    
})

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});


exports.Order = mongoose.model('Order', orderSchema);
