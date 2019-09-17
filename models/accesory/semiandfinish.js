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

    getSemiandFinishList: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM semiandfinishpojo';
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

    getSemiandFinishbyId: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM semiandfinishpojo WHERE semiandfinishpojoId = ?';
            connection.query(sql, [req.params.semiandfinishpojoId], (err, rows, fields) => {
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

    deleteSemiandFinishbyId: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'DELETE FROM semiandfinishpojo WHERE semiandfinishpojoId = ?';
            connection.query(sql, [req.params.semiandfinishpojoId], (err, rows, fields) => {
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

    createSemiandFinishList: function (req, res) {

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            var sql = 'INSERT INTO semiandfinishpojo SET ?';
            var values = { 'semistyle': req.body.semistyle, 'finishstyle': req.body.finishstyle }
            // Use the connection
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    resultsNotFound["errorMessage"] = "Semi or Finish Style already exists.";
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

    updateSemiandFinish: function (req, res) {

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            var sql = 'UPDATE semiandfinishpojo SET ? WHERE `semiandfinishpojoId` = ?';
            var values = { 'semistyle': req.body.semistyle, 'finishstyle': req.body.finishstyle }
            // Use the connection
            connection.query(sql, [values, [req.params.semiandfinishpojoId]], function (error, results, fields) {
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