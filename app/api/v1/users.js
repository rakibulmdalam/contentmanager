/*
* For authentication of requests
*/


var config = require('config');
var mongoose = require('mongoose');
var inputValidation = require('./helpers/validationHelper')
var userFunctions = require('./userFunctions');
var crypto = require('crypto-js');


module.exports = {
	test: (req, res) => {
		return res.json({ result: 'success'});
	},

    login: async (req, res) => {
        console.log('inside login');
        // check for required attributes
        const requiredAtt = ['userEmail', 'userPassword'];

        try {
            await inputValidation(req, requiredAtt);
        } catch(err) {
            // console.log(err)
            return res.end(res.writeHead(400, 'DATA_VALIDATION_ERROR'));
        };

        var userOutput = await userFunctions.findUserByMail(req.body.userEmail);

        if (userOutput.statusCode >= 300) {
            return res.end(res.writeHead(userOutput.statusCode, userOutput.reasonPhrase));
        }

        console.log(userOutput);
        // check password
        var pwOutput = await userFunctions.checkPassword(req, userOutput)

        if (pwOutput.statusCode >= 300) {
            return res.end(res.writeHead(pwOutput.statusCode, pwOutput.reasonPhrase));
        } else {
            res.status(pwOutput.statusCode).send(pwOutput.returnResults);
        }
    },

};