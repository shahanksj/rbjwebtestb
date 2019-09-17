const pool = require('../dbconnection/connector')
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

    getMetalType: function (req, res) {



        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM metaltype';
            connection.query(sql, (err, rows, fields) => {
                if (!err)
                    return res.send(rows);
                else
                    console.log(err);

                // When done with the connection, release it.
                connection.release(); // Handle error after the release.
                if (error) throw error; // Don't use the connection here, it has been returned to the pool.
            })
        })
    },

    getMetalTypeById: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM metaltype WHERE metalTypeId = ?';
            connection.query(sql, [req.params.metalTypeId], (err, rows, fields) => {
                if (!err)
                    return res.send(rows);

                else
                    console.log(err);

                // When done with the connection, release it.
                connection.release(); // Handle error after the release.
                if (error) throw error; // Don't use the connection here, it has been returned to the pool.
            })
        })
    },



    deleteMetalTypeId: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'DELETE FROM metaltype WHERE metalTypeId= ?';
            connection.query(sql, [req.params.metalTypeId], (err, rows, fields) => {
                if (!err)
                    res.send(resultsFound);
                else
                    res.send(resultsNotFound)

                // When done with the connection, release it.
                connection.release(); // Handle error after the release.
                if (error) throw error; // Don't use the connection here, it has been returned to the pool.
            })

        })
    },



    createMetalType: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'INSERT INTO metaltype SET ?';
            var values = { 'metalType': req.body.metalType, 'metalTypeRemarks': req.body.metalTypeRemarks }
            // Use the connection
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    resultsNotFound["errorMessage"] = "Category already exists.";
                    return res.send(resultsNotFound);
                } else {
                    return res.send(resultsFound);

                }

                // When done with the connection, release it.
                connection.release(); // Handle error after the release.
                if (error) throw error; // Don't use the connection here, it has been returned to the pool.
            })

        })

    },

    updateMetalType: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'UPDATE metaltype SET ? WHERE `metalTypeId` = ?';
            var values = { 'metalType': req.body.metalType, 'metalTypeRemarks': req.body.metalTypeRemarks }
            // Use the connection
            connection.query(sql, [values, [req.params.metalTypeId]], function (error, results, fields) {
                if (error) {
                    console.log(error)
                    resultsNotFound["errorMessage"] = "Data is NOT updated.";
                    return res.send(resultsNotFound);
                } else return res.send(resultsFound);

                // When done with the connection, release it.
                connection.release(); // Handle error after the release.
                if (error) throw error; // Don't use the connection here, it has been returned to the pool.
            })

        })
    }

}