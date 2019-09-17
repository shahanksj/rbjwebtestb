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

    getItemCategoryTypes: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM itemcategorytype';
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

    getItemCategoryTypesById: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM itemcategorytype WHERE itemCategoryTypeId = ?';
            connection.query(sql, [req.params.itemCategoryTypeId], (err, rows, fields) => {
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

    deleteItemCategoryTypeId: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'DELETE FROM itemcategorytype WHERE itemCategoryTypeId= ?';
            connection.query(sql, [req.params.itemCategoryTypeId], (err, rows, fields) => {
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

    createItemCategoryType: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!


            var sql = 'INSERT INTO itemcategorytype SET ?';
            var values = { 'itemCategoryType': req.body.itemCategoryType, 'itemCategoryTypeRemarks': req.body.itemCategoryTypeRemarks }
            // Use the connection
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    resultsNotFound["errorMessage"] = "CategoryType already exists.";
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

    updateItemCategoryType: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'UPDATE itemcategorytype SET ? WHERE `itemCategoryTypeId` = ?';
            var values = { 'itemCategoryType': req.body.itemCategoryType, 'itemCategoryTypeRemarks': req.body.itemCategoryTypeRemarks }
            // Use the connection
            connection.query(sql, [values, [req.params.itemCategoryTypeId]], function (error, results, fields) {
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