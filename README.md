## fullstack-demo

### font-end use

vue + webpack + express, and eslint、babel

### back-end use

express + mongodb

## how to start

```bash
npm run start
```

## how to make this project

### 预置环境准备

安装vue-cli，express-generator，并初始化构建一个 express 项目 express-demo 和一个 vue 项目 vue-project 。

```bash
npm i -g vue-cli
npm i -g express-generator
vue init webpack vue-project
express express-demo
```

### 融合

初始化启动express-demo

```
cd express-demo
npm run start
```

可以看到 `localhost:3000` 能够访问到express所构建的项目，使用 jade 作为模版，现在要把它视图层一步步变为 vue 。

