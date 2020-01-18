let dbUtil = require('./DBUtil.js');

function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    let insetSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values (?, ?, ?, ?)";
    let params = [tagId, blogId, ctime, utime];

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

module.exports.insertTagBlogMapping = insertTagBlogMapping;