<template>
    <div class= "container justify-content-center align-items-center" style="">
        <form class="row g-3" @submit.prevent="post">
            <div class="col-md-6">
                <input type="text" class="form-control" id="inputCollege" placeholder="學院" name= "college" v-model="college" required="required">
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control" id="inputTeacher" placeholder="教授" name= "teacher" v-model="teacher" required="required">
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control" id="inputDepartment" placeholder="學系" name= "department" v-model="department" required="required">
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control" id="inputCourse" placeholder="課程名稱" name= "course" v-model="course" required="required">
            </div>
            <div class="col-12">
                <input type="text" class="form-control" id="inputTitle" placeholder="標題" name= "title" v-model="title" required="required">
            </div>
            <div class="col-12">
                <textarea class="form-control" aria-label="With textarea" placeholder="內容" name= "content" v-model="content" required="required"></textarea>
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-light" style="margin-top: 20px;">提交</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

const API_URL = "http://localhost:8000";

export default {
    name: 'Submit',
    data(){
        return {
            course: "",
            college: "",
            department: "",
            teacher: "",
            title: "",
            content: "",
            postId: "",
        }
    },
    methods: {
        post(){
            const postData= {
                course: this.course,
                college: this.college,
                department: this.department,
                teacher: this.teacher,
                title: this.title,
                content: this.content,
            };

            axios({
                method: 'post',
                url: API_URL+ '/submit',
                data: postData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authTokenAccessToken')}`,
                }
            })
            .then(res=> {
                this.postId= res.data.post_id;
                this.$router.push(`/post/${this.postId}`);
                window.location.href= `/post/${this.postId}`;
            })

            this.course= "";
            this.college= "";
            this.department= "";
            this.teacher= "";
            this.title= "";
            this.content= "";
        }
    }
}
</script>

<style>

</style>