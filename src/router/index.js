import Vue from 'vue';
import Router from 'vue-router';
//分别创建Index.vue和Detail.vue
import Index from '@/views/Index';
import Detail from '@/views/Detail';

Vue.use(Router);

//导出工厂函数
export function createRouter(){
    return new Router({
        mode:'history',
        routes:[
            {path:"/", component: Index},
            {path:"/detail", component: Detail}
        ]
    })
}