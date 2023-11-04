const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User')

exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    let user = await User.findOne({ username });

    if (!role || !username || !password) {
        return res.status(400).json({
            msg: 'Todos los campos son requeridos.'
        });
    }

    if (user) {
        return res.status(401).json({
            msg: 'Existe una cuenta con ese nombre de usuario.'
        });
    }

    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    try {
        await user.save();

        res.status(200).json({
            msg: 'Usuario Creado Correctamente',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}

exports.currentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).exec()
        if (user) {
            jwt.sign({ userId }, process.env.JWT_SECRET,
                { expiresIn: '2d' },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        user: {
                            username: user.username,
                            role: user.role
                        },
                        token
                    });
                });
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    let user = await User.findOne({ username });

    if (!username || !password) {
        return res.status(400).json({
            msg: 'Todos los campos son requeridos.'
        });
    }

    if (!user) {
        return res.status(401).json({
            msg: 'Usuario o Contraseña Incorrecta.'
        });
    }

    try {
        if (bcrypt.compareSync(password, user.password)) {
            const payload = { userId: user._id };

            jwt.sign(payload, process.env.JWT_SECRET,
                { expiresIn: '2d' },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        user: {
                            username: user.username,
                            role: user.role
                        },
                        token
                    });
                });
        } else {
            return res.status(400).json({
                msg: 'Usuario o Contraseña Incorrecta.'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno.'
        });
    }
}
