# template

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 开发项目

> 该模板基于 Vue 框架，Vue 有着体积小，速度快，上手易等优点，同时还有这一个非常棒的中文文档 [Vue 中文文档](https://cn.vuejs.org/v2/guide/)，如果你对 Vue 还不是很熟悉，建议可以先快速浏览一下 Vue 的文档。

基于joyLink2.0 协议的  空调设备 H5 模板提供了一个完整的 空调设备 项目示例，你只需要根据具体的业务需求来对项目进行简单的整改即可。

### 公共组件简介

本项目使用了vue-stone组件库，具体的使用方案可以查看Github:[vue-stone](https://github.com/jd-smart-fe/vue-stone/)。

### JSSDK

src/libs目录下的SmartSDK2-0-0.js文件是对 index.html中[JSSDK](https://static.360buyimg.com/smart/jdsmart-1.0.3.js)引用文件的封装，开发者可以根据需求进行修改。JSSDK文档说明可以在开发者中心 [文档中心](https://smartdev.jd.com/)下载。

### 设备参数
 | 参数名        | 说明           | 范围  |    是否控制    |
| ------------- |:-------------:| :-----:| ------------:|
| curtemp       | 当前温度       | 0~99    |   不可控      |
| ecomode       | 节能模式       | 0~1     |   可控       |
| mark          | 调节风速       | 0~5     |   可控       |
| mode          | 模式选择       | 0~4     |   可控       |
| power         | 开关          | 0~1     |   可控       |
| settemp       | 温度设置       | 32~16   |   可控       |
| sleepmode     | 睡眠           | 0~1    |   可控       |
| scrdispaly    | 屏显           | 0~1    |   可控       |
### 解决痛点 （开发者只简单增减 stream_id 及组件相关解析即可）
1，封装桥文件jdsmart-1.0.3.js  公共的方法调用可放在 libs/SmartSDK1.0.3.js中定义。
2，解决轮询机制下相同快照数据，频繁渲染页面的问题。
3，简化调用流程减少代码量：以下是开发者需要关心的地方 src/App.vue
  a.  resolveStreams 函数 ：遍历stream_id 判断快照数据是否相同
      添加和修改 设备参数（stream_id）
  b. diffObject 函数：，控制是否渲染页面。
  c. renderHtml 函数: 渲染页面
     跟据快照值进行页面渲染。
