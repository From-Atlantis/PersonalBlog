let dbUtil = require('./DBUtil.js');

function insertComment(blogId, parent, parentName, userName, email, comments, ctime, utime, success) {
    let insertSql = "insert into comments (`blog_id`, `parent`, `parent_name`, `user_name`, `email`, `comments`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?, ?)";
    let params = [blogId, parent, parentName, userName, email, comments, ctime, utime];

    let connection = dbUtil.creatConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();
}

function queryCommentsByBlogId(blogId, success) {
    let querySql = "select * from comments where blog_id = ?;";
    let params = [blogId];

    let connection = dbUtil.creatConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();
}

module.exports.insertComment = insertComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;