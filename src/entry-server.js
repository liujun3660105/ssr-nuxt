//创建一个vue实例并且做首屏渲染
import { createApp } from './app';

export default context => {
    //context由node服务器传过来，传过来url地址，知道首屏到底渲染的是哪个页面
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp(context);
        //跳转首屏
        router.push(context.url);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            Promise.all(
                matchedComponents.map((Component) => {
                    if (Component.asyncData) {
                        return Component.asyncData({
                            store,
                            route: router.currentRoute
                        });
                    }
                })
            ).then(() => {
                // 所有预取钩子 resolve 后，
                // store 已经填充入渲染应用所需状态
                // 将状态附加到上下文，且 `template` 选项用于 renderer 时，
                // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
                context.state = store.state;
                resolve(app);
            })

        }, reject)
    })
}