<template>
    <div class="container d-flex justify-content-center align-items-center" style="height: 80vh;">
        <div class="row">
            <div class="col-6">
                <div class="card" style="width: 25rem;">
                    <div class="card-body">
                        <form @submit.prevent="signIn">
                            <div class= "mb-3">
                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="學號" name="username" v-model="username" required="required">
                            </div>
                            <div class= "mb-3">
                                <input type="password" class="form-control" id="formGroupExampleInput" placeholder="密碼"name="password" v-model="password" required="required">
                            </div>
                            <div class="separator"></div>
                            <a href="/signup" style="text-decoration: none;color: black;">註冊</a>
                            <a href="/signin" style="text-decoration: none;margin-left: 250px;color: black;">忘記密碼</a>
                            <br>
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-light" style="margin-top: 20px;">登入</button>
                            </div>
                        </form>
                        <p style="margin-top: 20px;">{{ msg }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

const API_URL = "http://localhost:8000/";

export default {
    name: 'SignIn',
    data() {
        return {
            username: "",
            password: "",
            msg: "",
        }
    },
    methods: {
        signIn() {
            // 構造要發送到後端的資料
            const userData = {
                username: this.username,
                password: this.password,
            };

            // 使用 Axios 發送 POST 請求到後端的 API 端點
            axios({
                method: 'post',
                url: API_URL+ 'api/auth/signin',
                data: userData,
            })
            .then(res=> {
                if(res.data== "帳號錯誤！"|| res.data== "密碼錯誤！"){
                    this.msg= res.data;
                }
                else{
                    this.$store.commit('setToken',res.data);
                    window.location.href= "/";
                }
            })

        },
    }
}
</script>

<style>
.separator {
    border-top: 1px solid #000; /* 分隔線的樣式 */
    margin: 20px 0; /* 分隔線上下的間距 */
}
</style>