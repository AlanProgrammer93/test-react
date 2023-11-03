const User = require('../models/User')
const Order = require('../models/Order')

exports.create = async (req, res) => {
    try {
        let newOrder = new Order(req.body);
        await newOrder.save();

        res.status(200).json({
            msg: 'Orden Creada Correctamente',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}

exports.getOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).exec()

        let posts = null
        if (user.role === "admin") {
            posts = await Order.find().sort({ createdAt: -1 })
        } else {
            posts = await Order.find({ userId }).sort({ createdAt: -1 })
        }

        res.status(200).json({
            posts
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}

exports.remove = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).exec()

        if (user.role === "admin") {
            await Order.findByIdAndDelete(req.params.id);
        } else {
            const order = await Order.findById(req.params.id);
            if (order.userId == userId) {
                await Order.findByIdAndDelete(req.params.id);
            } else {
                return res.status(401).send('Not Authorized');
            }
        }

        res.status(200).json({
            msg: 'Eliminado Correctamente',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}
