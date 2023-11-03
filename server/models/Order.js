const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    client: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "En espera",
        enum: ["En espera", "Enviado", "Entregado"]
    }
});

module.exports = mongoose.model('Order', orderSchema);