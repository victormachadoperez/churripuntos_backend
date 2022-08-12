require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Users = require('mongoose').model("Users")

const authentication = async (req, res, next) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username && !email) return res.status(400).send({ status: "fail", message: `username nor email provided`});
    if (!password) return res.status(400).send({ status: "fail", message: `password not provided`});

    // Check if user exists
    const userExists = await Users.findOne({$or: [{username}, {email}]});
    if(!userExists) return res.status(400).send({ status: "fail", message: `wrong username or email`});

    // Check if the password is right
    if ( ! await bcrypt.compare(password, userExists.password)) {
        return res.status(400).send({
            status: 'fail',
            message: "Wrong password"
        })
    }

    next();
}

const authJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // "Bearer TOKEN"
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.username = decoded.username;
        req.email = decoded.email;
        req.userId = decoded.userId;
        next();
    })
}

module.exports = {authentication, authJWT};