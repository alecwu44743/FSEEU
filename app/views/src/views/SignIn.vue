<template>
    <div class= "signUp">
        <form @submit.prevent="signUp">
            <label>
                帳號：<input type="text" name="username" v-model="username">
            </label>
            <br>
            <label>
                密碼：<input type="password" name="password" v-model="password">
            </label>
            <br>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

const API_URL = "http://localhost:8000";

export default {
    name: 'SignIn',
    data() {
        return {
            username: "",
            password: "",
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
            });
        }
    }
}
</script>

<style>

</style>