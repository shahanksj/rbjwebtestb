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

    getmetalItems: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM metalitem';
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

    getMetalItembyId: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM metalitem WHERE metalitemId = ?';
            connection.query(sql, [req.params.metalItemId], (err, rows, fields) => {
                if (!err) {
                    console.log(req.params.metalItemId)
                    return res.send(rows);
                }
                else {
                    console.log(err);
                }

                // When done with the connection, release it.
                connection.release(); // Handle error after the release.
                if (error) throw error; // Don't use the connection here, it has been returned to the pool.
            })

        })

    },
    getbyMetalItem: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT metalItem FROM metalitem WHERE metalItem = ?';
            connection.query(sql, [req.params.metalItem], (err, row, fields) => {

                if (!err) {
                    if (row != null && row != '') {
                        return res.send(row);
                    } else {
                        return res.send(null)
                    }

                } else {
                    console.log(err);
                    return res.send(resultsNotFound)
                }
                // When done with the connection, release it.
                connection.release(); // Handle error after the release.
                if (error) throw error; // Don't use the connection here, it has been returned to the pool.

            })
        })
    },

    deleteMetalItembyId: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'DELETE FROM metalitem WHERE metalItemId= ?';
            connection.query(sql, [req.params.metalItemId], (err, rows, fields) => {
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

    createMetalItem: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'INSERT INTO metalitem SET ?';
            var values = {
                'metalItem': req.body.metalItem,
                'metalItemDetails': req.body.metalItemDetails,
                'metalItemCategory': req.body.metalItemCategory,
                'metalItemTypes': req.body.metalItemTypes,
                'metalTypeKT': req.body.metalTypeKT,
                'metalItemColor': req.body.metalItemColor,
                'metalItemCF': req.body.metalItemCF,
                'metalItemSizeLength': req.body.metalItemSizeLength,
                'metalItemGoldPrice': req.body.metalItemGoldPrice,
                'metalItemGoldLoss': req.body.metalItemGoldLoss,
                'metalItemWeightType': req.body.metalItemWeightType,
                'metalItemWeight': req.body.metalItemWeight,
                'metalItemLaborType': req.body.metalItemLaborType,
                'metalItemLabor': req.body.metalItemLabor,
                'metalItemWeightLoss': req.body.metalItemWeightLoss,
                'metalItemFinishWeight': req.body.metalItemFinishWeight,
                'metalItemVendor': req.body.metalItemVendor,
                'metalItemVendorStyle': req.body.metalItemVendorStyle
            }

            // Use the connection
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    resultsNotFound["errorMessage"] = "MetalItem already exists.";
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

    updateMetalItem: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'UPDATE metalitem SET ? WHERE `metalItemId` = ?';
            var values = {
                'metalItem': req.body.metalItem,
                'metalItemDetails': req.body.metalItemDetails,
                'metalItemCategory': req.body.metalItemCategory,
                'metalItemTypes': req.body.metalItemTypes,
                'metalTypeKT': req.body.metalTypeKT,
                'metalItemColor': req.body.metalItemColor,
                'metalItemCF': req.body.metalItemCF,
                'metalItemSizeLength': req.body.metalItemSizeLength,
                'metalItemGoldPrice': req.body.metalItemGoldPrice,
                'metalItemGoldLoss': req.body.metalItemGoldLoss,
                'metalItemWeightType': req.body.metalItemWeightType,
                'metalItemWeight': req.body.metalItemWeight,
                'metalItemLaborType': req.body.metalItemLaborType,
                'metalItemLabor': req.body.metalItemLabor,
                'metalItemWeightLoss': req.body.metalItemWeightLoss,
                'metalItemFinishWeight': req.body.metalItemFinishWeight,
                'metalItemVendor': req.body.metalItemVendor,
                'metalItemVendorStyle': req.body.metalItemVendorStyle
            }
            // Use the connection
            connection.query(sql, [values, [req.params.metalItemId]], function (error, results, fields) {
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