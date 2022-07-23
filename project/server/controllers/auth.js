const User = require('../models/user');
const { Op } = require("sequelize");
const {OAuth2Client} = require('google-auth-library')
const jwt = require('../utils/jsonwebtoken')
const jsonWebToken = require('jsonwebtoken')

const googleClient = new OAuth2Client({
    clientId: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,

});


exports.authenticateUser = async(req, res, next) => {
    try{
        const { token } = req.body;

        const ticket = await googleClient.verifyIdToken({
          idToken: token,
          audient: `${process.env.GOOGLE_CLIENT_ID}`,
        });
      
        const payload = ticket.getPayload();
      
        let user = await User.findOne({
            where:{
                email: payload.email
            }
         });

        if (!user) {
            const newUser = await User.create({
                username: payload.email,
                password: 'dominh',
                name: payload.name,
                email: email,
                address: 'Xa Dan',
                phone: '05632156462',
                role: 'user'
            });
        }

        const accessToken = jwt.createAccessToken({username: user ? user.username : payload.email});
        const refreshToken = jwt.createRefreshToken({username: user ? user.username : payload.email});
        console.log('accessToken',accessToken)
        console.log('refreshToken',refreshToken)

        res.cookie('refresh_token', refreshToken,{
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7*24*60*60*1000 // 7d
        })
     
        res.json({
            accessToken,
            user: await User.findOne({
                where:{
                    email: payload.email
                }
             })
        })

      
    }catch(err) {
        console.log(err)
    };
};
