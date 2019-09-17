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

    getItemCategorys: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM itemcategory';
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

    getItemCategoryById: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM itemcategory WHERE itemCategoryId = ?';
            connection.query(sql, [req.params.itemCategoryId], (err, rows, fields) => {
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

    deleteItemCategoryId: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'DELETE FROM itemcategory WHERE itemCategoryId= ?';
            connection.query(sql, [req.params.itemCategoryId], (err, rows, fields) => {
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

    createItemCategory: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'INSERT INTO itemcategory SET ?';
            var values = { 'itemCategory': req.body.itemCategory, 'itemCategoryRemarks': req.body.itemCategoryRemarks }
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

    updateItemCategory: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'UPDATE itemcategory SET ? WHERE `itemCategoryId` = ?';
            var values = { 'itemCategory': req.body.itemCategory, 'itemCategoryRemarks': req.body.itemCategoryRemarks }
            // Use the connection
            connection.query(sql, [values, [req.params.itemCategoryId]], function (error, results, fields) {
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