const jwt = require('jsonwebtoken')


exports.createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '1h'
    })
}

exports.createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: '1d'
    })
}