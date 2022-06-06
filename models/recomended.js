const mongoose = require('mongoose');

const RecomendedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    size:{
        type:Object,
        required:true,
    },
    price:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    list:{
        type: Object,
        required: true,
    },
    info:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    }

});

RecomendedSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

RecomendedSchema.set('toJSON', {
    virtuals: true,
});

exports.Recomended = mongoose.model('Recomended', RecomendedSchema);
exports.RecomendedSchema = RecomendedSchema;
