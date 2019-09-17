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

    getPlansheetData: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM plansheet';
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

    getPlansheetById: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM plansheet WHERE plansheetId = ?';
            connection.query(sql, [req.params.plansheetId], (err, rows, fields) => {
                if (!err) {
                    console.log(req.params.plansheetId)
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
    getPlansheetByItem: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT item_id FROM plansheet WHERE `item_id` = ?';

            
            connection.query(sql, [req.params.item_id], (err, row, fields) => {

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

    truncatePlansheet: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'TRUNCATE TABLE plansheet';
             connection.query(sql, (err, rows) => {
                if (!err) {
                    return res.send(resultsFound);
                } else {
                    console.log(err);
                    return res.send(resultsNotFound)
                }
               
            })

             // When done with the connection, release it.
             connection.release(); // Handle error after the release.
             if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        })

    },

    deletePlansheetById: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'DELETE FROM plansheet WHERE plansheetId= ?';
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

    generatePlansheetData: function (req, res) {

           pool.getConnection( function (error, connection) {
           if (error) throw error; // not connected!

      

            var sql = "INSERT INTO plansheet (item_category,item_id,location,size,customer_item_id,customer_id,price,cost,SO,SOSTK,PR,PO,WB,WBC,CNTR,QC,LAB,REJ,RET,REP,DISC,RTS,PL,SURPLUS,SHORTAGE) VALUES ?"
            
            var values=req.body;
           // var values =req;//
       
            
        //     var sql = 'INSERT INTO plansheet SET ?';
        //     var values = {

        //         'item_category': req.body.item_category,
        //         'item_id': req.body.item_id,
        //         'location': req.body.location,
        //         'size': req.body.size,
        //         'customer_item_id': req.body.customer_item_id,
        //         'customer_id': req.body.customer_id,
        //         'price': req.body.price,
        //         'cost': req.body.cost,
        //         'SO': req.body.SO,
        //         'SOSTK': req.body.SOSTK,
        //         'PR': req.body.PR,
        //         'PO': req.body.PO,
        //         'WB': req.body.WB,
        //         'WBC': req.body.WBC,
        //         'CNTR': req.body.CNTR,
        //         'QC': req.body.QC,
        //         'LAB': req.body.LAB,
        //         'REJ': req.body.REJ,
        //         'RET': req.body.RET,
        //         'REP': req.body.REP,
        //         'DISC': req.body.DISC,
        //         'RTS': req.body.RTS,
        //         'PL': req.body.PL,
        //         'SURPLUS': req.body.SURPLUS,
        //         'SHORTAGE': req.body.SHORTAGE



        //     }
        //     console.log(values.length)
        //     // Use the connection
            connection.query(sql, [values], function (error, results, fields) {
                if (error) {
                    console.log(error)

                    return res.send(resultsNotFound);
                } else {
                    console.log(results)
                    return res.send(resultsFound);

                }

                // When done with the connection, release it.
               connection.release(); // Handle error after the release.
               if (error) throw error; // Don't use the connection here, it has been returned to the pool.

            })

            })

    },

    updatePlansheet: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'UPDATE plansheet SET ? WHERE `plansheetId` = ?';
            var values = {
                'item_category': req.body.item_category,
                'item_id': req.body.item_id,
                'location': req.body.location,
                'size': req.body.size,
                'customer_item_id': req.body.customer_item_id,
                'customer_id': req.body.customer_id,
                'price': req.body.price,
                'cost': req.body.cost,
                'SO': req.body.SO,
                'SOSTK': req.body.SOSTK,
                'PR': req.body.PR,
                'PO': req.body.PO,
                'WB': req.body.WB,
                'WBC': req.body.WBC,
                'CNTR': req.body.CNTR,
                'QC': req.body.QC,
                'LAB': req.body.LAB,
                'REJ': req.body.REJ,
                'RET': req.body.RET,
                'REP': req.body.REP,
                'DISC': req.body.DISC,
                'RTS': req.body.RTS,
                'PL': req.body.PL,
                'SURPLUS': req.body.SURPLUS,
                'SHORTAGE': req.body.SHORTAGE
            }
            // Use the connection
            connection.query(sql, [values, [req.params.plansheetId]], function (error, results, fields) {
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