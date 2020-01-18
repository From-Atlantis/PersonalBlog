let nav = new Vue({
    el: "#content_right",
    data: {
        article_num: 0,
        categories_num: 0
    },
    computed: {

    },
    created: function () {
        axios({
            method: 'get',
            url: '/queryAllTags',
        }).then(function (resp) {
            nav.categories_num = resp.data.data.length;
        })

        axios({
            method: 'get',
            url: '/queryBlogCount',
        }).then(function (resp) {
            nav.article_num = resp.data.data[0].count;
        })

    }
});

let footer = new Vue({
    el: '#footer',
    data: {
        visit_num: 0
    },
    computed: {},
    created: function () {}
})