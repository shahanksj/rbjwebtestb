var mysql = require('mysql');
require('dotenv').config();

var pool= mysql.createPool({
    connectionLimit:120,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:"80",
  //  queueLimit: 30,
    acquireTimeout: 1000000,
    multipleStatements: true
});


pool.getConnection(function(err, connection) {
    if (!err)
    console.log('DB connection succeded.');
else
    console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
  });

module.exports = pool;
