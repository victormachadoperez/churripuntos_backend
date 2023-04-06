if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const {errLogger} = require('../middlewares/logger');

const Users = require('mongoose').model("Users")
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {

    try {
        const username = req.body.username;
        const email = req.body.email;

        const userEntry = await Users.findOne({$or: [{username}, {email}]});

        const user = {
            _id: userEntry._id,
            username: userEntry.username,
        }

        const accessToken = jwt.sign(user, process.env.DEV_ACCESS_TOKEN_SECRET)

        res.status(200).send({
            status: "success",
            user: {
                _id: user._id,
                username: user.username,
                accessToken
            }
        });

     } catch(err) {
        const error = { status: 'error', message: `${err.name}: ${err.message}` }; 
        res.status(500).send(error);
        errLogger(error.message);
    }
}