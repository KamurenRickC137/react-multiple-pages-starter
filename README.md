# react-multiple-pages-starter
多页面react脚手架，基于webpack4.x，react 16.x构建，新颖快捷。

# 开发

`yarn install`或`npm install` 安装依赖

`npm run start` 执行开发环境

`npm run build` 打包项目到dist目录

# 特性

* css/sass/less支持
* 热加载支持（动态增加删除页面同样支持）
* 无需写任何的html文件，直接约定src/pages目录下的jsx(注意，仅限jsx文件)为页面文件，正常编写任何component，只需要调用src/create方法，
传入component组件即可。像这样

```jsx
import React from 'react'
import create from '../create'
const App = () => <div>hello world</div>
create(App)
```
即完成一个页面，简单快捷，访问路径为/\**.html。其中\**为src/pages下的相对路径，并将.jsx替换为.html即可。
