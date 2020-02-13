const express = require('express');
const app = express();
const fs = require('fs');


//1.需要一个渲染器
const {createBundleRenderer} = require('vue-server-renderer');
//bundle是服务端的包
const bundle = require('../dist/server/vue-ssr-server-bundle.json');
const renderer = createBundleRenderer(bundle,{
    runInNewContext: false,
    template:fs.readFileSync('../public/index.tmpl.html','utf-8'),
    clientManifest: require("../dist/client/vue-ssr-client-manifest.json")
})
app.use(express.static('../dist/client',{index:false}));
app.get('*',async (req, res)=>{
    console.log(req.url);
    const context = {
        title:"SSR-test",
        url:req.url
    }
    //2.执行渲染
    const html = await renderer.renderToString(context);
    res.send(html);
});
app.listen(3000,()=>{
    console.log('渲染服务器就绪');
});