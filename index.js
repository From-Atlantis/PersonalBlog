const express = require("express");
let globalConfig = require('./config.js');
let loader = require('./loader.js');

let app = express();

app.use(express.static('public'));

app.post('/editEveryDay', loader.get('/editEveryDay'));

app.get('/queryEveryDay', loader.get('/queryEveryDay'));

app.post('/editBlog', loader.get('/editBlog'));

app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));

app.get('/queryBlogCount', loader.get('/queryBlogCount'));

app.get('/queryBlogById', loader.get('/queryBlogById'));

app.get('/addComment', loader.get('/addComment'));

app.get('/queryRandomCode', loader.get('/queryRandomCode'));

app.get('/queryCommentsByBlogId', loader.get('/queryCommentsByBlogId'));

app.get('/queryAllTags', loader.get('/queryAllTags'));

app.get('/queryBlogByTags', loader.get('/queryBlogByTags'));

app.listen(globalConfig.port, function () {
    console.log("app is running ... ");
})