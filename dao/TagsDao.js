let dbUtil = require('./DBUtil.js');

function insertTag(tag, ctime, utime, success) {
    let insetSql = "insert into tags (`tag`, `ctime`, `utime`) values (?, ?, ?)";
    let params = [tag, ctime, utime];

    let connection = dbUtil.creatConnection();
    connection.connect();
    connection.query(insetSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();
}

function queryTag(tag, success) {
    let insetSql = "select * from tags where tag = ?;";
    let params = [tag];

    let connection = dbUtil.creatConnection();
    connection.connect();
    connection.query(insetSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();
}

module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;