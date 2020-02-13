<template>
  <div class="hello">
    <h1>Index</h1>
    <h2>num:{{$store.state.count}}</h2>
    <button @click="$store.commit('add')">add</button>
  </div>
</template>

<script>
export default {
  asyncData({store}) {
    // 约定预取逻辑编写在预取钩子asyncData中
    // 触发 action 后，返回 Promise 以便确定请求结果
    return store.dispatch("getCount");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
