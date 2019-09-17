const pool = require('../../dbconnection/connector')
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

    getVendorOps: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM vendorops order by rbjstyle, finalshipdate';
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

    getVendorOpsById: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM vendorops WHERE vendoropsId = ?';
            connection.query(sql, [req.params.vendoropsId], (err, rows, fields) => {
                if (!err) {
                    console.log(req.params.vendoropsId)
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
    getVendorOpsByRbjStyle: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM vendorops WHERE `rbjstyle` = ?';


            connection.query(sql, [req.params.rbjstyle], (err, row, fields) => {

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

    truncateVendorOps: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'TRUNCATE TABLE vendorops';
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

    deleteVendorOpsById: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'DELETE FROM vendorops WHERE vendoropsId= ?';
            connection.query(sql, [req.params.vendoropsId], (err, rows, fields) => {
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

    generateVendorOpsData: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = "INSERT INTO vendorops (vendorcode,customerorder,vendorpo,customercode,orderdate,rbjstyle,vendorstyle,agingrbjdate,orderqty,receivedqty,cancelledqty,balanceqty,metalweight,metalkt,metalcolor,finalshipdate,setdesp_rd,setdesp_bgt,setdesp_pr,setdesp_mq,setdesp_pear,setdesp_pie,setdesp_other,setcancelled_rd,setcancelled_bgt,setcancelled_pr,setcancelled_mq,setcancelled_pear,setcancelled_pie,setcancelled_other,setbalance_rd,setbalance_bgt,setbalance_pr,setbalance_mq,setbalance_pear,setbalance_pie,setbalance_other,othersetscancelled,othersetsbalance,remarks,findings,metaladvance,newyorkstock,repairpieces,repairwith,skunumber,memoasset,ringsize,customerdate,castings,centerstone,stamp,diasupply,vgroup,vendorstamp) VALUES ?"

            var values = req.body;
            console.log(req.body)
            connection.query(sql, [values], function (error, results, fields) {
                if (error) {
                    console.log(error)

                    return res.send(error);
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

    updateVendorOps: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'UPDATE vendorops SET ? WHERE `vendoropsId` = ?';
            var values = {
                'vendorcode': req.body.vendorcode,
                'customerorder': req.body.customerorder,
                'vendorpo': req.body.vendorpo,
                'customercode': req.body.customercode,
                'orderdate': req.body.orderdate,
                'rbjstyle': req.body.rbjstyle,
                'vendorstyle': req.body.vendorstyle,
                'agingrbjdate': req.body.agingrbjdate,
                'orderqty': req.body.orderqty,
                'receivedqty': req.body.receivedqty,
                'cancelledqty': req.body.cancelledqty,
                'balanceqty': req.body.balanceqty,
                'metalweight': req.body.metalweight,
                'metalkt': req.body.metalkt,
                'metalcolor': req.body.metalcolor,
                'finalshipdate': req.body.finalshipdate,
                'setdesp_rd': req.body.setdesp_rd,
                'setdesp_bgt': req.body.setdesp_bgt,
                'setdesp_pr': req.body.setdesp_pr,
                'setdesp_mq': req.body.setdesp_mq,
                'setdesp_pear': req.body.setdesp_pear,
                'setdesp_pie': req.body.setdesp_pie,
                'setdesp_other': req.body.setdesp_other,
                'setcancelled_rd': req.body.setcancelled_rd,
                'setcancelled_bgt': req.body.setcancelled_bgt,
                'setcancelled_pr': req.body.setcancelled_pr,
                'setcancelled_mq': req.body.setcancelled_mq,
                'setcancelled_pear': req.body.setcancelled_pear,
                'setcancelled_pie': req.body.setcancelled_pie,
                'setcancelled_other': req.body.setcancelled_other,
                'setbalance_rd': req.body.setbalance_rd,
                'setbalance_bgt': req.body.setbalance_bgt,
                'setbalance_pr': req.body.setbalance_pr,
                'setbalance_mq': req.body.setbalance_mq,
                'setbalance_pear': req.body.setbalance_pear,
                'setbalance_pie': req.body.setbalance_pie,
                'setbalance_other': req.body.setbalance_other,
                'othersetscancelled': req.body.othersetscancelled,
                'othersetsbalance': req.body.othersetsbalance,
                'remarks': req.body.remarks,
                'findings': req.body.findings,
                'metaladvance': req.body.metaladvance,
                'newyorkstock': req.body.newyorkstock,
                'repairpieces': req.body.repairpieces,
                'repairwith': req.body.repairwith,
                'skunumber': req.body.skunumber,
                'memoasset': req.body.memoasset,
                'ringsize': req.body.ringsize,
                'customerdate': req.body.customerdate,
                'castings': req.body.castings,
                'centerstone': req.body.centerstone,
                'stamp': req.body.stamp,
                'diasupply': req.body.diasupply,
                'group': req.body.group,
                'vendorstamp': req.body.vendorstamp

            }
            // Use the connection
            connection.query(sql, [values, [req.params.vendoropsId]], function (error, results, fields) {
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