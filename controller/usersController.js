const Users = require('mongoose').model("Users");
const {errLogger} = require('../middlewares/logger');

async function getUsers (req, res) {

    try {
        const search = req.body.search;

        let users = await Users.find({username: new RegExp('^' + search)}, {_id: 0, username: 1});

        users = users.map(e => e.username)

        res.status(200).send({
            status: "success",
            users
        });

    } catch(err) {
        const error = { status: 'error', message: `${err.name}: ${err.message}` }; 
        res.status(500).send(error);
        errLogger(error.message);
    }
}


module.exports = {getUsers};