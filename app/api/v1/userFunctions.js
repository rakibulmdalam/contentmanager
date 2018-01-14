var config = require('config');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var Users = mongoose.model('users');
// TODO combine these two functions by giving in a JSON with either mail or ID

async function findUserByMail(userEmail, input) {
    var resOutput = input || {statusCode: 0, reasonPhrase: ''};

    if (resOutput.statusCode  >= 500) {
        return resOutput;
    };

    return new Promise(resolve => {
        try {
            Users.find({ email: userEmail}).limit(1).sort({$natural:-1}).exec((err, users) => {
                if (err) {
                    resOutput.statusCode = 500;
                    resOutput.reasonPhrase = 'DOCUMENT_ERROR';
                }

                if (users.length === 0) {
                    resOutput.statusCode = 404;
                    resOutput.reasonPhrase = 'USER_NOT_FOUND';
                } else {
                    resOutput.statusCode = 200;
                    resOutput.reasonPhrase = 'SUCCESS';
                    resOutput.returnResults = resOutput.returnResults || {};
                    resOutput.returnResults.user = users[0];
                }
                resolve(resOutput);
            });
        } catch (err) {
            resOutput.statusCode = 500;
            resOutput.reasonPhrase = 'UNKNOWN_DOCUMENT_ERROR';
            resolve(resOutput);
        }
    });
}

async function checkPassword(req, input) {
    var resOutput = input || {statusCode: 0, reasonPhrase: ''};

    return new Promise(resolve => {
        bcrypt.compare(req.body.userPassword, input.returnResults.user['password'], function(err, isMatch) {
            if (err) {
                resOutput.statusCode = 500;
                resOutput.reasonPhrase = "PASSWORD_HASH_ERROR";
            }
            else if (isMatch !== true) {
                resOutput.statusCode = 401;
                resOutput.reasonPhrase = "WRONG_PASSWORD";
            }
            else {
                // generate authorization token
                var date = new Date();

                var authToken = jwt.encode({
                    email: req.body.userEmail,
                    date: date.toISOString().substr(0,10)
                }, config.jwtSecret);

                //Successfully logged in, token provided
                resOutput.statusCode = 200;
                resOutput.reasonPhrase = "OK";
                resOutput.returnResults = {
                    authToken: authToken,
                    userLoginTime: new Date()
                }
            }

            resolve(resOutput);
        });
    });

}

async function updateUserToken(connection, newToken, input) {
    var resOutput = input || {statusCode: 0, reasonPhrase: ''};

    var userId = input.interFunc.userId;
    var updateQuery = "UPDATE Users SET userToken = ? WHERE userId = ?";

    try {
        await connection.query(updateQuery, [newToken, userId]);
        resOutput.statusCode = 200;
        resOutput.reasonPhrase = "OK";
    }
    catch (err) {
        console.log(err);
        resOutput.statusCode = 500;
        resOutput.reasonPhrase = "SERVER_ERROR";
    }

    return resOutput;
}

module.exports = {findUserByMail, checkPassword, updateUserToken};