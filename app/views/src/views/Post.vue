<template>
    <div class="overlay-backdrop">
        <div class="post-info">
            <div class="post-item">
                <div class= "cd">
                    <span class= "college">{{ postInfo.college }} | </span>
                    <span class= "department">{{ postInfo.department }}</span>
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
                    <!-- <div v-for="comment in comments" :key="comment.id" class="comment">
                        <p><strong>{{ comment.author }}</strong> {{ comment.date }}</p>
                        <p>{{ comment.text }}</p>
                    </div> -->
                    <form @submit.prevent="submitComment" class="comment-form">
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="你想說......" name="comment" v-model="comment" required="required">
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-light" style="margin-top: 20px;">送出</button>
                        </div>
                    </form>
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
            author: localStorage.getItem("authTokenUsername"),
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
                    date: response.data.date.substring(0, 10)
                }
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
        }
    },
    mounted: function() {
        this.refreshData();
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
    padding-bottom: 10px; /* 分割線上方的間距 */
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
</style>