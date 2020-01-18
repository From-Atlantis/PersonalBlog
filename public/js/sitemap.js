let blogList = new Vue({
    el: '#blog_list',
    data: {
        totalTags: 0,
        tagsList: []
    },
    computed: {},
    created: function () {
        axios({
            method: 'get',
            url: '/queryAllTags',
        }).then(function (resp) {
            blogList.totalTags = resp.data.data.length;
            blogList.tagsList = resp.data.data;
            for (let i = 0; i < blogList.tagsList.length; i++) {
                blogList.$set(blogList.tagsList[i], 'tagLink', '/?tag=' + blogList.tagsList[i].id);
                axios({
                    method: 'get',
                    url: '/queryBlogByTags?tagId=' + blogList.tagsList[i].id
                }).then(function (resp) {
                    blogList.$set(blogList.tagsList[i], 'blogCount', resp.data.data.length);
                })
            }
        })
    }
})