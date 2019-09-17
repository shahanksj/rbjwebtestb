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

    getCastingAndFinishStyles: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM castingandfinishpojo';
            connection.query(sql, (err, rows, fields) => {
                if (!err)
                    return res.send(rows);
                else
                    console.log(err);

                // When done with the connection, release it.
                connection.release(); // Handle error after the release.
                if (error) throw error;
                // Don't use the connection here, it has been returned to the pool.
            })

        })
    },

    getCastingAndFinishById: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'SELECT * FROM castingandfinishpojo WHERE castingandfinishpojoId = ?';
            connection.query(sql, [req.params.castingandfinishpojoId], (err, rows, fields) => {
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

    deleteCastingAndFinishbyId: function (req, res) {

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!

            var sql = 'DELETE FROM castingandfinishpojo WHERE castingandfinishpojoId = ?';
            connection.query(sql, [req.params.castingandfinishpojoId], (err, rows, fields) => {
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

    createCastingAndFinish: function (req, res) {

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            var sql = 'INSERT INTO castingandfinishpojo SET ?';
            var values = { 'finishstyle': req.body.finishstyle}
            // Use the connection
            connection.query(sql, values, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    resultsNotFound["errorMessage"] = "Casting style already exists.";
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

    updateCastingAndFinish: function (req, res) {

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            var sql = 'UPDATE castingandfinishpojo SET ? WHERE `castingandfinishpojoId` = ?';
            var values = {'finishstyle': req.body.finishstyle}
            // Use the connection
            connection.query(sql, [values, [req.params.castingandfinishpojoId]], function (error, results, fields) {
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