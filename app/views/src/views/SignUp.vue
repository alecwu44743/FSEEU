<template>
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    </head>

    <body>
        <div class="container d-flex justify-content-center align-items-center" style="height: 80vh;">
            <div class="row">
                <div class="col-6">
                    <div class="card" style="width: 25rem;">
                        <div class="card-body">
                            <form @submit.prevent="signUp" @input="check">
                                <div class= "mb-3">
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="學號" name="username" v-model="username" required="required">
                                    <p v-if="usernameError" style="color: red;margin-top: 10px;">不符合學號格式！</p>
                                </div>
                                <div class= "mb-3">
                                    <input type="password" class="form-control" id="formGroupExampleInput" placeholder="密碼"name="password" v-model="password" required="required">
                                </div>
                                <div class= "mb-3">
                                    <input type="password" class="form-control" id="formGroupExampleInput" placeholder="密碼確認"name="password2" v-model="password2" required="required">
                                    <p v-if="passwordError" style="color: red;margin-top: 10px;">密碼不相符！</p>
                                </div>
                                <div class= "mb-3">
                                    <input type="email" class="form-control" id="formGroupExampleInput" placeholder="email" name="email" v-model="email" required="required">
                                </div>
                                <div class="separator"></div>
                                <a href="/signin" style="text-decoration: none;color: black;margin-right: 280px;">返回登入</a>
                                <br>
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-light" style="margin-top: 20px;">註冊</button>
                                </div>
                            </form>
                            <p style="margin-top: 20px;">{{ msg }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
import axios from 'axios'

const API_URL = "http://localhost:8000/";

export default {
    name: 'SignUp',
    data() {
        return {
            username: "",
            password: "",
            password2: "",
            email: "",
            msg: "",
            usernameError: false,
            passwordError: false,
        }
    },
    methods: {
        signUp() {
            // 構造要發送到後端的資料
            const userData = {
                username: this.username,
                password: this.password,
                email: this.email
            };

            // 使用 Axios 發送 POST 請求到後端的 API 端點
            axios({
                method: 'post',
                url: API_URL+ 'api/auth/signup',
                data: userData,
            })
            .then(res=> {
                this.msg= res.data;

                if(this.msg!= "帳號重複註冊！"&& this.msg!= "email重複註冊！"){
                    window.location.href= "/signin";
                }
            })
        },
        check(){
            if (this.username.length !== 8 || this.username[0] !== 'D') {
                // 如果條件被滿足，將 showErrorMessage 設置為 true，顯示錯誤消息
                this.usernameError = true;
            }
            else {
                // 如果條件不被滿足，將 showErrorMessage 設置為 false，隱藏錯誤消息
                this.usernameError = false;
            }

            if(this.password!== this.password2){
                this.passwordError= true;
            }
            else{
                this.passwordError= false;
            }
        }
    },
}
</script>

<style>
.separator {
    border-top: 1px solid #000; /* 分隔線的樣式 */
    margin: 20px 0; /* 分隔線上下的間距 */
}
</style>