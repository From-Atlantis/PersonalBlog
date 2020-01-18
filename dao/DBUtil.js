const mysql = require('mysql');

// 连接到数据库
function creatConnection() {
    let connection = mysql.createConnection({
        // host: '47.100.92.62',
        host: '192.168.1.34',
        port: '3306',
        // user: 'chloe',
        user: 'root',
        // password: 'Chloe0418..',
        password: 'Chloe0418',
        database: 'my_blog'
    })
    return connection;
}

module.exports.creatConnection = creatConnection;