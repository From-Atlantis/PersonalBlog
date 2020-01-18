let commentDao = require('../dao/CommentDao.js');
let timeUtil = require('../utils/TimeUtil.js');
let respUtil = require('../utils/RespUtil.js');
let captcha = require('svg-captcha');
let url = require('url');

let path = new Map();

function addComment(request, response) {
    let params = url.parse(request.url, true).query;
    console.log(params);
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '评论成功', null));
        response.end();
    })
}

path.set('/addComment', addComment);

function queryRandomCode(request, response) {
    let img = captcha.create({
        fontSize: 30,
        width: 100,
        height: 34
    });

    response.writeHead(200);
    response.write(respUtil.writeResult('success', '评论成功', img));
    response.end();
}

path.set('/queryRandomCode', queryRandomCode);

function queryCommentsByBlogId(request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}

path.set('/queryCommentsByBlogId', queryCommentsByBlogId);

module.exports.path = path;