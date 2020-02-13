//创建Vue示例
import Vue from 'vue'
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';

//客户端挂载之前，检查组件是否有异步获取数据
Vue.mixin({
    beforeMount() {
        console.log(this.$options);
        const { asyncData } = this.$options;
        if (asyncData) {
            // 将获取数据操作分配给 promise
            // 以便在组件中，我们可以在数据准备就绪后
            // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
            this.dataPromise = asyncData({
                store: this.$store,
                route: this.$route
            });
        }
    },
});

export function createApp(context) {
    //1.获取路由示实例
    const router = createRouter();
    //创建store实例
    const store = createStore();
    //2.创建vue实例
    const app = new Vue({
        router,
        store,
        context,
        render: h => h(App)
    })
    return { app, router, store }
}