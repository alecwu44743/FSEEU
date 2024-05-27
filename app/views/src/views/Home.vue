<template>
  <div class= "container">
    <div class="title-item" v-for= "item in items">
      <a class="title-link" style="text-decoration: none; color: black;" :href= "`/post/${item.id}`">
        <div class="title-and-date">
          <span class="title">{{ item.title }}</span>
          <span class="date">{{ item.date }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = "http://localhost:5038";

export default {
  name: 'Home',
  data() {
    return {
      items: []
    }
  },
  methods: {
    async refreshData() {
      axios.get(API_URL+ "/feeds")
      .then((response)=>{
        this.items = response.data.map(item => ({
          id: item._id,
          title: item.title,
          date: item.date.substring(0, 10)
        }));
      })
    }
  },
  mounted: function() {
    this.refreshData();
  }
}
</script>

<style>
.container {
  padding: 20px;
}

.title-item {
  margin-bottom: 10px;
  text-align: left; /* 確保所有標題文字置左 */
  border-bottom: 1px solid #ddd; /* 添加分割線 */
  padding-bottom: 10px; /* 分割線上方的間距 */
}

.title-link {
  text-decoration: none;
  color: black;
  display: block;
}

.title-link:hover {
  text-decoration: underline;
}

.title-and-date {
  display: flex;
  justify-content: space-between; /* 將內容置於彼此對齊的容器的兩側 */
  align-items: end; /* 在容器中垂直居中對齊 */
}

.title {
  font-size: 25px;
}

.date {
  font-size: 15px;
  float: right;
}
</style>