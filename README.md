# light-link-server
通过页面配置生成 HTML


## 目录结构
```
.
├── README.md
├── package.json
├── src
│   ├── app.ts 入口文件
│   ├── config 项目的配置文件
│   ├── controllers 控制器
│   │   ├── base.ts
│   │   └── home.ts
│   ├── dal 数据处理
│   │   ├── BulidTemplates
│   │   │   └── Base.ts
│   │   ├── ReplaceTemplates
│   │   │   └── Base.ts
│   │   ├── UploadZipFile
│   │   │   └── Base.ts
│   │   └── ZipFile
│   │       └── Base.ts
│   ├── middwares 中间件
│   ├── models 模型
│   ├── public 静态资源文件
│   ├── routes 路由
│   │   ├── home.ts
│   │   └── index.ts
│   ├── services 服务
│   ├── test 单元测试
│   └── views 视图层
│       └── home
│           └── index.html
├── tsconfig.json typescript 配置文件
└── tslint.json typescript 语法规范
```

## 安装依赖
### 安装项目依赖
```
npm install
```

### 安装打包依赖

```bash
cd ./temp
```
```
npm install
```

## dev

```
npm start
```

### vscode debug

通过 `F5` 启动（启动文件 `/src/app.ts`），支持断点调试。

## bulid

```
npm run build
```

