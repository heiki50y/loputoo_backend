const User = require('../models/User');
const config = require('config');
const asyncHandler = require('../middleware/async');

exports.register = asyncHandler (async (req, res, next) => {

    const { name, email, password, group, role} = req.body
    
    const user = await User.create({
        name,
        email,
        password,
        group,
        role
    });
        
    sendTokenResponse(user, 200, res);    
})

exports.login = asyncHandler (async (req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ msg: 'Palun sisestage õige email ja parool' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ msg: 'Vale email või parool' });
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return res.status(401).json({ msg: 'Vale email või parool' });
    }
        
    sendTokenResponse(user, 200, res);
})

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + config.get('jwt_cookie_expire') * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // secure: true
    }

    res.status(statusCode)
    .cookie('token', token, options)
    .json({ token })
}

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
      expires: new Date(0),
      httpOnly: true
    });
  
    res.status(200).json({
      success: true,
    });
});