const pool = require('../dbconnection/connector')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

var resultsNotFound = {
    "errorCode": "0",
    "errorMessage": "Operation not successful.",
    "rowCount": "0",
    "data": ""
};
var resultsFound = {
    "errorCode": "1",
    "errorMessage": "Operation successful.",
    "rowCount": "1",
    "data": ""
};

module.exports = {

    loginUser: function (req, res) {

        pool.getConnection(function (err, connection) {

            if (err) throw err; // not connected!

            var sql = 'SELECT * FROM `users` WHERE `userName` = ?';
            var values = [req.body.userName]
            // Use the connection
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    resultsNotFound["errorMessage"] = "Something went wrong with Server.";
                    return res.send(resultsNotFound);
                }
                if (results == "") {
                    resultsNotFound["errorMessage"] = "User Id not found.";
                    return res.send(resultsNotFound);
                }
                bcrypt.compare(req.body.password, results[0].password, function (err, result) {
                    if (result == true) {
                        var token = {
                            "token": jwt.sign(
                                { userName: req.body.userName },
                                process.env.JWT_SECRET,
                                { expiresIn: '30d' }
                            )
                        }
                        resultsFound["rowCount"] = results
                        resultsFound["data"] = token;
                        return res.send(resultsFound);
                    } else {
                        resultsNotFound["errorMessage"] = "Incorrect Password.";
                        return res.send(resultsNotFound);
                    }
                });
                // When done with the connection, release it.
                connection.release(); // Handle error after the release.
                if (error) throw error; // Don't use the connection here, it has been returned to the pool.

            })
        });

    },

    getUsers: function (input, res) {
        pool.getConnection(function (err, connection) {

            if (err) throw err; // not connected!    

            var sql = 'SELECT * FROM users';


            connection.query(sql, function (error, results, fields) {
                if (error) {
                    resultsNotFound["errorMessage"] = "Something went wrong with Server.";
                    return res.send(resultsNotFound);
                }
                if (results == "") {
                    resultsNotFound["errorMessage"] = "User Id not found.";
                    return res.send(resultsNotFound);
                }
                resultsFound["data"] = results[0];
                res.send(results);
                // When done with the connection, release it.
                connection.release(); // Handle error after the release.
                if (error) throw error; // Don't use the connection here, it has been returned to the pool.
            });

        })
    },

    getUserbyId: function (req, res) {

        pool.getConnection(function (error, connection) {

            if (error) throw error; // not connected!   

            var sql = 'SELECT * FROM users WHERE _id = ?';
            connection.query(sql, [req.params.id], (err, rows, fields) => {
                if (!err)
                    return res.send(rows);

                else
                    console.log(err);
            })

            // When done with the connection, release it.
            connection.release(); // Handle error after the release.
            if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        })
    },

    deleteUserbyId: function (req, res) {


        pool.getConnection(function (error, connection) {

            if (error) throw error; // not connected!   

            var sql = 'DELETE FROM users WHERE _id = ?';
            connection.query(sql, [req.params.id], (err, rows, fields) => {
                if (!err)
                    res.send(resultsFound);
                else
                    res.send(resultsNotFound)
            })

            // When done with the connection, release it.
            connection.release(); // Handle error after the release.
            if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        })
    },

    createUser: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

                var sql = 'INSERT INTO users SET ?';
                var values = {
                    'userName': req.body.userName, 'password': hash, 'firstName': req.body.firstName,
                    'lastName': req.body.lastName, 'email': req.body.email, 'role': req.body.role
                }
                // Use the connection
                connection.query(sql, values, function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        resultsNotFound["errorMessage"] = "UserName already exists.";
                        return res.send(resultsNotFound);
                    } else {
                        return res.send(resultsFound);

                    }

                    // When done with the connection, release it.
                    connection.release(); // Handle error after the release.
                    if (error) throw error; // Don't use the connection here, it has been returned to the pool.

                })

            })

        })

    },

    updateUser: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

                var sql = 'UPDATE users SET ? WHERE `_id` = ?';
                var values = {
                    'userName': req.body.userName, 'password': hash, 'firstName': req.body.firstName,
                    'lastName': req.body.lastName, 'email': req.body.email, 'role': req.body.role
                }
                // Use the connection
                connection.query(sql, [values, [req.params.id]], function (error, results, fields) {
                    if (error) {
                        resultsNotFound["errorMessage"] = "Data is NOT updated.";
                        return res.send(resultsNotFound);
                    } else return res.send(resultsFound);

                    // When done with the connection, release it.
                    connection.release(); // Handle error after the release.
                    if (error) throw error; // Don't use the connection here, it has been returned to the pool.
                })

            })
        })
    }

}