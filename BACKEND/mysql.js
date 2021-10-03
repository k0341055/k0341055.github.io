let mysql = require("mysql2");
//let mysql = require("mysql");

var connection =mysql.createConnection({
    host    : "127.0.0.1",
	user	: "shopUser",
	password: "shop09182021",
    database: "line_shop", 
    port    : 3306
    //socketPath: '/var/run/mysqld/mysqld.sock'
});

// var pool = mysql.createPool({
//     host    : 'localhost',
//     user    : 'shopUser',
//     password: 'shop09182021',
//     database: 'line_shop'
// });

connection.connect(function(err){
    if(err){
        console.log('error connecting: ' + err.stack);
        return;
    }
    
    console.log('connected as id ' + connection.threadId);
});



const fetchData = (sqlQuery, callback) => {
	console.log("\nSQL fetch query: ", sqlQuery);
    connection.query(sqlQuery, (err, rows) => {
        if(err){
            console.log("error: " + err.message);
        } else {
            console.log("db results:");
            console.log(rows);
            callback(err, rows);
        }
        console.log("\nconnection closed...");
    });
};

const insertData = (sqlQuery, callback) => {
	console.log("\nSQL insert query: ", sqlQuery);
    connection.query(sqlQuery, (err, rows) => {
        if(err){
            console.log("error: " + err.message);
        } else {
            console.log("db results: " + rows.affectedRows);
            console.log(rows);
            callback(err, rows);
        }
        console.log("\nconnection closed...");
    });
};

const deleteData = (sqlQuery, callback) => {
	console.log("\nSQL delete query: ", sqlQuery);
    connection.query(sqlQuery, (err, rows) => {
        if(err){
            console.log("error: " + err.message);
        } else {
            console.log("db results:");
            console.log(rows);
            callback(err, rows);
        }
        console.log("\nconnection closed...");
    });
};

module.exports = {fetchData, insertData, deleteData};
