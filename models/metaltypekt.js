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

    getMetalTypeKT: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM metaltypekt';
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

    getMetalTypeKTById: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM metaltypekt WHERE metalTypeKTId = ?';
            connection.query(sql, [req.params.metalTypeKTId], (err, rows, fields) => {
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

    deleteMetalTypeKTId: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'DELETE FROM metaltypekt WHERE metalTypeKTId= ?';
            connection.query(sql, [req.params.metalTypeKTId], (err, rows, fields) => {
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

    createMetalTypeKT: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'INSERT INTO metaltypekt SET ?';
            var values = { 'metalTypeKT': req.body.metalTypeKT, 'metalTypeKTRemarks': req.body.metalTypeKTRemarks }
            // Use the connection
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    resultsNotFound["errorMessage"] = "MetalKT already exists/Improper Format";
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

    updateMetalTypeKT: function (req, res) {


        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'UPDATE metaltypekt SET ? WHERE `metalTypeKTId` = ?';
            var values = { 'metalTypeKT': req.body.metalTypeKT, 'metalTypeKTRemarks': req.body.metalTypeKTRemarks }
            // Use the connection
            connection.query(sql, [values, [req.params.metalTypeKTId]], function (error, results, fields) {
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