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

    getOpenOrder: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM openorder order by item_id, ship_dt';
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

    getOpenorderById: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM openorder WHERE openorderId = ?';
            connection.query(sql, [req.params.openorderId], (err, rows, fields) => {
                if (!err) {
                    console.log(req.params.openorderId)
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
    getOpenorderByItem: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT item_id FROM openorder WHERE `item_id` = ?';


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

    truncateOpenorder: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'TRUNCATE TABLE openorder';
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

    deleteopenorderById: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'DELETE FROM openorder WHERE openorderId= ?';
            connection.query(sql, [req.params.openorderId], (err, rows, fields) => {
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

    generateOpenorderData: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = "INSERT INTO openorder (trans_bk,trans_no,trans_dt,account_id,trans_period,ship_dt,sales_person,po_no,po_dt,serial_no,item_id,size,trans_qty,item_price,item_category,item_description,clear_qty,packet_no,name,contact1,phone1,fax1,trans_qty_pc,trans_qty_wt,cancel_qty,cancel_dt,sku_no,Balance_qty,Balance_Amt) VALUES ?"

            var values = req.body;

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

    updateOpenorder: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'UPDATE openorder SET ? WHERE `openorderId` = ?';
            var values = {
                'trans_bk': req.body.trans_bk,
                'trans_no': req.body.trans_no,
                'trans_dt': req.body.trans_dt,
                'account_id': req.body.account_id,
                'trans_period': req.body.trans_period,
                'ship_dt': req.body.ship_dt,
                'sales_person': req.body.sales_person,
                'po_no': req.body.po_no,
                'po_dt': req.body.po_dt,
                'serial_no': req.body.serial_no,
                'item_id': req.body.item_id,
                'size': req.body.size,
                'trans_qty': req.body.trans_qty,
                'item_price': req.body.item_price,
                'item_category': req.body.item_category,
                'item_description': req.body.item_description,
                'clear_qty': req.body.clear_qty,
                'packet_no': req.body.packet_no,
                'name': req.body.name,
                'contact1': req.body.contact1,
                'phone1': req.body.phone1,
                'fax1': req.body.fax1,
                'trans_qty_pc': req.body.trans_qty_pc,
                'trans_qty_wt': req.body.trans_qty_wt,
                'cancel_qty': req.body.cancel_qty,
                'cancel_dt': req.body.cancel_dt,
                'sku_no': req.body.sku_no,
                'Balance_qty': req.body.Balance_qty,
                'Balance_Amt': req.body.Balance_Amt

            }
            // Use the connection
            connection.query(sql, [values, [req.params.openorderId]], function (error, results, fields) {
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