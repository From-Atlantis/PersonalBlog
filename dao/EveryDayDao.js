// 引入数据库连接配置函数
let dbUtil = require('./DBUtil.js');

// 将数据插入到对应表中的函数
function insertEveryDay(content, ctime, success) {
    // sql命令 注意这里因为是单独的语句所以是不用加分号的
    let insetSql = "insert into every_day (`content`, `ctime`) values (?, ?)";
    // 要传入的参数
    let params = [content, ctime];

    // 拿到数据库对象
    let connection = dbUtil.creatConnection();
    // 连接数据库
    connection.connect();
    // 向表中插入数据
    connection.query(insetSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    // 断开数据库连接 防止计算机资源占用
    connection.end();
}

// 查询数据方法
function queryEveryDay(success) {
    // sql语句
    let querySql = "select * from every_day order by id desc limit 1;";
    let params = [];

    // 拿到数据库对象
    let connection = dbUtil.creatConnection();
    // 连接数据库
    connection.connect();
    // 查询开始
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    // 断开数据库连接 防止计算机资源占用
    connection.end();
}


module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;