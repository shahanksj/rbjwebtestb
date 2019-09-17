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

    getDiasandWebStyle: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM diasandwebstyle';
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

    getDiasandWebById: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM diasandwebstyle WHERE diasandwebstyleId = ?';
            connection.query(sql, [req.params.diasandwebstyleId], (err, rows, fields) => {
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

    deleteDiasandWebId: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'DELETE FROM diasandwebstyle WHERE diasandwebstyleId = ?';
            connection.query(sql, [req.params.diasandwebstyleId], (err, rows, fields) => {
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

    createDiasandWebStyle: function (req, res) {

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            var sql = 'INSERT INTO diasandwebstyle SET ?';
            var values = { 'diasparkstyle': req.body.diasparkstyle, 'webstyle': req.body.webstyle }
            // Use the connection
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    resultsNotFound["errorMessage"] = "Diaspark or Web Style already exists.";
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

    updateDiasandWebStyle: function (req, res) {

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            var sql = 'UPDATE diasandwebstyle SET ? WHERE `diasandwebstyleId` = ?';
            var values = { 'diasparkstyle': req.body.diasparkstyle, 'webstyle': req.body.webstyle }
            // Use the connection
            connection.query(sql, [values, [req.params.diasandwebstyleId]], function (error, results, fields) {
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