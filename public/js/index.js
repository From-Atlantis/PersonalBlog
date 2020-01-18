let everyDay = new Vue({
    el: "#every-day",
    data: {
        content: "我们都有底线，而我，也许已经越过自己的了。"
    },
    computed: {
        getContent() {
            return this.content;
        }
    },
    created: function () {
        //向后端请求数据，并给content赋值
        let self = this;
        axios({
            method: 'get',
            url: '/queryEveryDay'
        }).then(function (resp) {
            self.content = resp.data.data[0].content;
        }).catch(function (resp) {
            console.log('请求失败');
        })
    }
});

let articleList = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: []
    },
    computed: {
        prevPage: function () {
            return function () {
                if (this.page == 1) {
                    alert('这已经是首页了哦~');
                    return;
                }
                this.page--;
                this.getPage(this.page, this.pageSize);
            }
        },
        nextPage: function () {
            return function () {
                if (this.page == parseInt((this.count + this.pageSize - 1) / this.pageSize)) {
                    alert('这已经是最后一页了哦~');
                    return;
                }
                this.page++;
                this.getPage(this.page, this.pageSize);
            }
        },
        jumpTo: function () {
            return function (page) {
                this.getPage(page, this.pageSize);
            }
        },
        getPage: function () {
            return function (page, pageSize) {
                let searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
                let tag = '';
                for (let i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split('=')[0] == 'tag') {
                        try {
                            tag = parseInt(searchUrlParams[i].split('=')[1]);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }

                // tag为空 则不是通过标签查询博客的情况
                if (tag == '') {
                    axios({
                        method: 'get',
                        url: '/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize
                    }).then(function (resp) {
                        let result = resp.data.data;
                        let list = [];
                        for (let i = 0; i < result.length; i++) {
                            let temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].date;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = '/views/blog_detail.html?bid=' + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log('请求错误');
                    });
                    axios({
                        method: 'get',
                        url: '/queryBlogCount'
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    })
                } else {
                    this.articleList = [];
                    axios({
                        method: 'get',
                        url: '/queryBlogByTags?tagId=' + tag
                    }).then(function (resp) {
                        for (let i = 0; i < resp.data.data.length; i++) {
                            let temp = {};
                            axios({
                                method: 'get',
                                url: '/queryBlogById?bid=' + resp.data.data[i].blog_id
                            }).then(function (resp) {
                                let result = resp.data.data[0];
                                temp.title = result.title;
                                temp.content = result.content;
                                temp.ctime = result.ctime;
                                temp.tags = result.tags;
                                temp.views = result.views;
                                temp.link = '/views/blog_detail.html?bid=' + result.id;
                                articleList.articleList.push(temp);
                            }).catch(function (resp) {
                                console.log(resp)
                            })
                        }
                        articleList.page = 5;
                    })
                    this.count = this.articleList.length;
                    this.generatePageTool;
                }
            }
        },
        generatePageTool: function () {
            let nowPage = this.page;
            let pageSize = this.pageSize;
            let totalCount = this.count;
            let totalPages = parseInt((totalCount + pageSize - 1) / pageSize);
            let result = [];
            // result.push({
            //     text: "<span class='iconfont prev'>&#xe63a;</span>",
            //     page: 1
            // });
            if (nowPage > 2) {
                result.push({
                    text: nowPage - 2,
                    page: nowPage - 2
                })
            }
            if (nowPage > 1) {
                result.push({
                    text: nowPage - 1,
                    page: nowPage - 1
                })
            }
            result.push({
                text: nowPage,
                page: nowPage
            })
            if (nowPage + 1 <= totalPages) {
                result.push({
                    text: nowPage + 1,
                    page: nowPage + 1
                })
            }
            if (nowPage + 2 <= totalPages) {
                result.push({
                    text: nowPage + 2,
                    page: nowPage + 2
                })
            }
            // result.push({
            //     text: "<span class='iconfont next'>&#xe63a;</span>",
            //     page: totalPages
            // })
            this.pageNumList = result;
            return result;
        }
    },
    method: {

    },
    created: function () {
        this.getPage(this.page, this.pageSize);
    }
})