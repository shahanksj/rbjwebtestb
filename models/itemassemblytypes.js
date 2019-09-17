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

    getItemAssemblyTypes: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM itemassemblytypes';
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

    getItemAssemblyTypesbyId: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM itemassemblytypes WHERE itemAssemblyId = ?';
            connection.query(sql, [req.params.itemAssemblyId], (err, rows, fields) => {
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

    deleteItemAssemblyTypesbyId: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'DELETE FROM itemassemblytypes WHERE itemAssemblyId = ?';
            connection.query(sql, [req.params.itemAssemblyId], (err, rows, fields) => {
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

    createItemAssemblyTypes: function (req, res) {

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            var sql = 'INSERT INTO itemassemblytypes SET ?';
            var values = { 'itemAssemblyTypes': req.body.itemAssemblyTypes, 'itemAssemblyRemarks': req.body.itemAssemblyRemarks }
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


    },

    updateItemAssemblyTypes: function (req, res) {

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            var sql = 'UPDATE itemassemblytypes SET ? WHERE `itemAssemblyId` = ?';
            var values = { 'itemAssemblyTypes': req.body.itemAssemblyTypes, 'itemAssemblyRemarks': req.body.itemAssemblyRemarks }
            // Use the connection
            connection.query(sql, [values, [req.params.itemAssemblyId]], function (error, results, fields) {
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