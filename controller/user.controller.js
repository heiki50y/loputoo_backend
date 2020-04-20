const User = require('../models/User');

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        next(err)
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');

        res.json(users);

    } catch (err) {
        next(err);
    }
}

exports.getUser = async (req, res, next) => {
    const id = req.params.id

    try {
        const user = await User.findById(id).select('-password');

        res.json(user);

    } catch (err) {
        next(err);
    }
}