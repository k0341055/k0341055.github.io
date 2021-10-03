var mysql = require('mysql');
// 建立資料庫連線
var db  = mysql.createPool({
    user: 'root',
    password: '123456',
    host: 'localhost',
    database: 'db', 
    waitForConnections : true, 
    connectionLimit : 10       
});
module.exports = db;



