<template>
    <div class="overlay-backdrop">
        <div class="post-info">
            <div class="post-item">
                <div class= "cd">
                    <span class= "college">{{ postInfo.college }} | </span>
                    <span class= "department">{{ postInfo.department }}</span>
                    <span class="dropdownPost">
                        <a class="btn btn-secondary dropdown-togglePost no-caret" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            . . .
                        </a>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">檢舉</a></li>
                            <li v-if= "(username== post_author)|| isModerator"><a class="dropdown-item" @click="showDeleteWarning">刪除</a></li>
                        </ul>
                    </span>
                </div>
                <div class= "tctd">
                    <div class= "ttitle">{{ postInfo.title }}</div>
                    <span class= "course">{{ postInfo.course }} | </span>
                    <span class= "teacher">{{ postInfo.teacher }}</span>
                    <span class= "ddate">{{ postInfo.date }}</span>
                </div>
                <div class= "contentArea">
                    <p class= "content">{{ postInfo.content }}</p>
                </div>
                <div class="commentArea">
                    <h3>留言區</h3>
                    <form v-if= "isLoggedIn" @submit.prevent="submitComment" class="comment-form">
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="你想說......" name="comment" v-model="comment" required="required">
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-light" style="margin-top: 20px;">送出</button>
                        </div>
                    </form>
                    <div v-else style= "margin-top: 20px; margin-bottom: 20px;">
                        <a href= "/signin" style="text-decoration: none; color: black;">留言請先登入</a>
                    </div>
                    <div>
                        <div class= "commentsArea" v-for= "item in comments">
                            <span class= "commentsAuthor">
                                {{ item.author }}
                            </span>
                            <span class= "commentsDate">
                                {{ item.date }}
                            </span>
                            <div class= "commentLog">
                                {{ item.commentLog }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

const API_URL = "http://localhost:5038";

export default{
    name: 'Post',
    data() {
        return {
            postInfo: {
                course: "",
                college: "",
                department: "",
                teacher: "",
                title: "",
                content: "",
                date: ""
            },
            isLoggedIn: false,
            isModerator: false,
            username: "",
            post_author: "",
            comment: "",
            comments: []
        }
    },
    methods: {
        async refreshData() {
            axios.get(`${API_URL}/post/${this.$route.params.param}`)
            .then((response)=> {
                this.postInfo= {
                    course: response.data.course,
                    college: response.data.college,
                    department: response.data.department,
                    teacher: response.data.teacher,
                    title: response.data.title,
                    content: response.data.content,
                    author: response.data.author,
                    date: response.data.date.substring(0, 10)
                };
                this.post_author= this.postInfo.author;
            });
            axios.get(`${API_URL}/comments/${this.$route.params.param}`)
            .then((response)=> {
                    this.comments = response.data.map(item => ({
                    author: item.author,
                    commentLog: item.content,
                    date: item.date.substring(0, 10)
                }));
            });
        },
        submitComment(){
            const commentInfo= {
                author: this.author,
                comment: this.comment
            };

            axios({
                method: 'post',
                url: `http://localhost:8000/comment/${this.$route.params.param}`,
                data: commentInfo,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authTokenAccessToken')}`,
                }
            })
            .then(res=> {
                location.reload();
            })
        },
        getUser(){
            if(localStorage.getItem("authTokenUsername")){
                if(localStorage.getItem("authTokenRoles")== "moderator"){
                    this.isModerator= true;
                }
                this.username= localStorage.getItem("authTokenUsername");
                this.isLoggedIn= true;
            }
        },
        showDeleteWarning(){
            if (confirm('確定要刪除嗎？')) {
                this.deletePost();
            }
        },
        deletePost(){
            axios({
                method: 'post',
                url: `http://localhost:8000/d/post/${this.$route.params.param}`,
                data: {
                    author: this.username,
                    isModerator: this.isModerator
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authTokenAccessToken')}`,
                }
            })
            .then(res=> {
                window.location.href= "/";
            })
        }
    },
    mounted: function() {
        this.refreshData();
        this.getUser();
    }
}
</script>

<style>
.overlay-backdrop {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.3); /* 可選的背景色，增加對比 */
    margin-top: 50px;
}

.post-info {
    background-color: white;
    /* border-radius: 8px; */
    text-align: left;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%; /* 調整寬度 */
    max-width: 750px; /* 設置最大寬度，根據需要調整 */
    padding: 50px;
}

.post-item {
    margin-bottom: 10px;
}

.ttitle {
    font-size: 30px;
    margin-top: 10px;
}

.cd {
    border-bottom: 1px solid #ddd; /* 添加分割線 */
    padding-bottom: 15px; /* 分割線上方的間距 */
}

.course{
    font-size: 13px;
    margin-left: 2px;
}

.teacher {
    font-size: 13px;
}

.ddate {
    font-size: 13px;
    margin-left: 20px;
    color: gray;
}

.contentArea {
    margin-top: 20px;
    border-bottom: 1px solid #ddd; /* 添加分割線 */
    padding-bottom: 10px; /* 分割線上方的間距 */
}

.content {
    line-height: 2; /* 調整此值來增加行距 */
}

.commentArea {
    margin-top: 30px;
}

.comment-form {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    border-bottom: 1px solid #ddd; /* 添加分割線 */
    padding-bottom: 10px; /* 分割線上方的間距 */
}

.comment-form .form-control {
    flex: 1;
}

.comment-form .btn {
    margin-bottom: 19px;
}

.commentsArea {
    border-bottom: 1px solid #ddd; /* 添加分割線 */
    padding-bottom: 10px; /* 分割線上方的間距 */
}

.commentsAuthor {
    font-size: 20px;
}

.commentsDate {
    font-size: 13px;
    float: right;
    color: gray;
    padding-top: 8px;
}

.dropdownPost {
    float: right;
}

.dropdown-togglePost {
    background-color: transparent;
    border: none;
    color: black; /* 文字顏色，可以根據需要修改 */
}

.dropdown-togglePost:hover,
.dropdown-togglePost:focus,
.dropdown-togglePost:active {
    background-color: transparent;
    border: none;
    color: black; /* 文字顏色在hover時保持不變 */
}

.no-caret::after {
    display: none !important; /* 移除下拉箭頭 */
}
</style>