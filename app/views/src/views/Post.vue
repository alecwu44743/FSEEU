<template>
    <div v-for="(value, key) in postInfo" :key="key">
      <p v-if="value">{{ key }}: {{ value }}</p>
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
            }
        }
    },
    methods: {
        async refreshData() {
            axios.get(`${API_URL}/post/${this.$route.params.param}`)
            .then((response)=>{
                this.postInfo= {
                    course: response.data.course,
                    college: response.data.college,
                    department: response.data.department,
                    teacher: response.data.teacher,
                    title: response.data.title,
                    content: response.data.content,
                }
            })
        }
    },
    mounted: function() {
        this.refreshData();
    }
}
</script>

<style>

</style>