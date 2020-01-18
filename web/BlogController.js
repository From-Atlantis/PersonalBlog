let blogDao = require('../dao/BlogDao.js');
let tagsDao = require('../dao/TagsDao.js');
let tagBlogMappingDao = require('../dao/TagBolgMappingDao.js');
let timeUtil = require('../utils/TimeUtil.js');
let respUtil = require('../utils/RespUtil.js');
let url = require('url');

let path = new Map();

function queryBlogByTags(request, response) {
    let params = url.parse(request.url, true).query;
    blogDao.queryBlogByTags(params.tagId, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result))
        response.end();
    })
}

path.set('/queryBlogByTags', queryBlogByTags);

function queryAllTags(request, response) {
    blogDao.queryAllTags(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result))
        response.end();
    })
}

path.set('/queryAllTags', queryAllTags);

function queryBlogById(request, response) {
    let params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result))
        response.end();
        blogDao.addViews(parseInt(params.bid), function (result) {})
    })
}

path.set('/queryBlogById', queryBlogById);

function queryBlogCount(request, response) {
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result))
        response.end();
    })
}

path.set('/queryBlogCount', queryBlogCount);

function queryBlogByPage(request, response) {
    let params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, '');
            // result[i].content = result[i].content.replace(/<[\w\W]{1, 500}>/g, '');
            result[i].content = result[i].content.substring(0, 3000);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result))
        response.end();
    });
}

path.set('/queryBlogByPage', queryBlogByPage);

function editBlog(request, response) {
    let params = url.parse(request.url, true).query;
    let tags = params.tags.replace(/ /g, '').replace(/，/g, ',');
    request.on('data', function (data) {
        blogDao.insertBlog(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
            let blogId = result.insertId;
            let tagList = tags.split(',');
            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i] == '') {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        })
    })
}

path.set('/editBlog', editBlog);

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (result) {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {});
        }
    })
}

function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId);
    })
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {

    })
}

module.exports.path = path;