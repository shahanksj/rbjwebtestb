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

    getVendors: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM vendors';
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

    getVendorById: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM vendors WHERE vendorId = ?';
            connection.query(sql, [req.params.vendorId], (err, rows, fields) => {
                if (!err) {
                    console.log(req.params.vendorId)
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
    getVendorName: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT vendorName FROM vendors WHERE vendorName = ?';
            connection.query(sql, [req.params.vendorName], (err, row, fields) => {

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

    deleteVenorbyId: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'DELETE FROM vendors WHERE vendorId= ?';
            connection.query(sql, [req.params.vendorId], (err, rows, fields) => {
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

    createVendor: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'INSERT INTO vendors SET ?';
            var values = {
                'vendorName': req.body.vendorName,
                'startDate': req.body.startDate,
                'status': req.body.status,
                'vendorCategory': req.body.vendorCategory,
                'vendorExpenseAccount': req.body.vendorExpenseAccount,
                'vendorContact': req.body.vendorContact,
                'vendorSalesPerson': req.body.vendorSalesPerson,
                'vendorBookKeeper': req.body.vendorBookKeeper,
                'vendorReturnContact': req.body.vendorReturnContact,
                'vendorAddress1': req.body.vendorAddress1,
                'vendorAddress2': req.body.vendorAddress2,
                'vendorCity': req.body.vendorCity,
                'vendorState': req.body.vendorState,
                'vendorZipCode': req.body.vendorZipCode,
                'vendorCountry': req.body.vendorCountry,
                'vendorWebsite': req.body.vendorWebsite,
                'vendorEmail1': req.body.vendorEmail1,
                'vendorEmail2': req.body.vendorEmail2,
                'vendorPhone1': req.body.vendorPhone1,
                'vendorPhone2': req.body.vendorPhone2,
                'vendorFax': req.body.vendorFax,
                'vendorTerms': req.body.vendorTerms,
                'vendorCreditLimit': req.body.vendorCreditLimit,
                'vendorPriceLevel': req.body.vendorPriceLevel,
                'vendor1099': req.body.vendor1099,
                'vendorEinSSn': req.body.vendorEinSSn,
                'vendorTaxId': req.body.vendorTaxId,
                'vendorPaymentPriority': req.body.vendorPaymentPriority


            }

            // Use the connection
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    resultsNotFound["errorMessage"] = "Vendor already exists.";
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

    updateVendor: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'UPDATE vendors SET ? WHERE `vendorId` = ?';
            var values = {
                'vendorName': req.body.vendorName,
                'startDate': req.body.startDate,
                'status': req.body.status,
                'vendorCategory': req.body.vendorCategory,
                'vendorExpenseAccount': req.body.vendorExpenseAccount,
                'vendorContact': req.body.vendorContact,
                'vendorSalesPerson': req.body.vendorSalesPerson,
                'vendorBookKeeper': req.body.vendorBookKeeper,
                'vendorReturnContact': req.body.vendorReturnContact,
                'vendorAddress1': req.body.vendorAddress1,
                'vendorAddress2': req.body.vendorAddress2,
                'vendorCity': req.body.vendorCity,
                'vendorState': req.body.vendorState,
                'vendorZipCode': req.body.vendorZipCode,
                'vendorCountry': req.body.vendorCountry,
                'vendorWebsite': req.body.vendorWebsite,
                'vendorEmail1': req.body.vendorEmail1,
                'vendorEmail2': req.body.vendorEmail2,
                'vendorPhone1': req.body.vendorPhone1,
                'vendorPhone2': req.body.vendorPhone2,
                'vendorFax': req.body.vendorFax,
                'vendorTerms': req.body.vendorTerms,
                'vendorCreditLimit': req.body.vendorCreditLimit,
                'vendorPriceLevel': req.body.vendorPriceLevel,
                'vendor1099': req.body.vendor1099,
                'vendorEinSSn': req.body.vendorEinSSn,
                'vendorTaxId': req.body.vendorTaxId,
                'vendorPaymentPriority': req.body.vendorPaymentPriority


            }
            // Use the connection
            connection.query(sql, [values, [req.params.vendorId]], function (error, results, fields) {
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