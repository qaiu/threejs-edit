# threejs-edit

Three.js Editor 编辑器模块打包构建。

源码来自 [qaiu/three.js](https://github.com/qaiu/three.js/tree/dev) 的 `editor/` 目录，使用 Vite 完成打包构建。

## 目录结构

```
threejs-edit/
├── src/          # editor 源码（来自 three.js editor/）
│   ├── index.html
│   ├── css/
│   ├── js/
│   │   ├── *.js        # 编辑器核心模块
│   │   ├── commands/   # 命令模块
│   │   └── libs/       # 第三方库
│   └── ...
├── dist/         # Vite 构建产物（静态文件）
├── package.json
├── vite.config.js
└── README.md
```

## 本地开发

```bash
npm install
npm run dev    # 启动开发服务器（http://localhost:8080）
```

## 构建

```bash
npm run build  # 构建到 dist/ 目录
npm run preview  # 预览构建产物
```

## 说明

- `src/` 目录保持与原始 three.js editor 相同的文件结构
- three.js 等依赖通过 CDN（jsDelivr）加载，无需本地安装
- `src/js/libs/` 目录下的第三方库（codemirror、acorn、ternjs 等）以 `<script src>` 方式引入

Three.js Editor 模块打包构建项目。

源码来自 [qaiu/three.js](https://github.com/qaiu/three.js) 的 `editor/` 目录，使用 Vite 完成打包构建。

## 目录结构

- `src/` —— editor 源码
- `dist/` —— Vite 构建产物

## 使用

```bash
npm install
npm run dev    # 本地开发
npm run build  # 构建
```
