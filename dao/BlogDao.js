let dbUtil = require('./DBUtil.js');

function insertBlog(title, content, tags, views, ctime, utime, success) {
    let insetSql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)";
    let params = [title, content, tags, views, ctime, utime];

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

function queryBlogByPage(page, pageSize, success) {
    let insetSql = "select * from blog order by id desc limit ?, ?;";
    let params = [page * pageSize, pageSize];

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

function queryBlogCount(success) {
    let querySql = "select count(1) as count from blog";
    let params = [];

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

function queryBlogById(id, success) {
    let querySql = "select * from blog where id = ?;";
    let params = [id];

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

function queryAllTags(success) {
    let querySql = "select * from tags;";
    let params = [];

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

function queryBlogByTags(tagId, success) {
    let querySql = "select * from tag_blog_mapping where tag_id = ?;";
    console.log(tagId);
    let params = [tagId];

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

function addViews(id, success) {
    let querySql = "update blog set views = views + 1 where id = ?;";
    let params = [id];

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

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllTags = queryAllTags;
module.exports.queryBlogByTags = queryBlogByTags;
module.exports.addViews = addViews;