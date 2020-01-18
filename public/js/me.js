let sendComment = new Vue({
    el: '#send_comment',
    data: {
        vcode: '',
        rightCode: ''
    },
    computed: {
        changeCode: function () {
            return function () {
                axios({
                    method: 'get',
                    url: '/queryRandomCode'
                }).then(function (resp) {
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text;
                })
            }
        },
        sendComment: function () {
            return function () {
                let code = document.getElementById('comment_code').value;
                if (code != sendComment.rightCode.toLowerCase()) {
                    alert('验证码错误，请重新输入');
                    return;
                }

                let bid = -1;
                let reply = document.getElementById('comment_reply').value;
                let replyName = document.getElementById('comment_reply_name').value;
                let name = document.getElementById('comment_name').value;
                let email = document.getElementById('comment_email').value;
                let content = document.getElementById('comment_content').innerHTML;

                axios({
                    method: 'get',
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&parentName=" + replyName + "&content=" + content
                }).then(function (resp) {
                    alert('评论成功');
                })

            }
        }
    },
    created: function () {
        this.changeCode();
    }
})

let blogComments = new Vue({
    el: '#blog_comments',
    data: {
        total: 100,
        comments: []
    },
    computed: {
        reply: function () {
            return function (commentId, userName) {
                document.getElementById('comment_reply').value = commentId;
                document.getElementById('comment_reply_name').value = userName;
                location.href = "#send_comment";
            }
        }
    },
    created: function () {
        let bid = -1;
        axios({
            method: 'get',
            url: '/queryCommentsByBlogId?bid=' + bid
        }).then(function (resp) {
            blogComments.total = resp.data.data.length;
            blogComments.comments = resp.data.data;
            for (let i = 0; i < blogComments.comments.length; i++) {
                blogComments.comments[i].ctime = new Date(blogComments.comments[i].ctime * 1000);
                if (blogComments.comments[i].parent > -1) {
                    console.log('hah');
                    blogComments.comments[i].options = " @" + blogComments.comments[i].parent_name;
                }
            }
            console.log(blogComments.comments, blogComments.total);
        })
    }
})