# MUSIKGO 🎵

一个对标Spotify的现代化音乐流媒体平台，使用React和Node.js构建。

![Material Design 3](https://img.shields.io/badge/Material%20Design-3-blue)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)

## ✨ 核心特性

### 🎨 Material Design 3 & 莫奈取色
- **动态主题系统** - 从专辑封面自动提取主色调
- **莫奈配色方案** - 基于Material You设计语言生成和谐配色
- **明暗主题** - 支持浅色和深色模式无缝切换
- **流畅动画** - Material Design 3标准动画效果

### 🎵 完整音乐播放器
- ▶️ **播放控制** - 播放、暂停、上一首、下一首
- 📊 **进度控制** - 可拖拽进度条，实时显示播放时间
- 🔊 **音量控制** - 独立音量调节
- 🔀 **播放模式**:
  - 随机播放
  - 单曲循环
  - 列表循环
- 📋 **播放队列** - 智能队列管理

### 📱 功能页面
- **主页** - 精选专辑、最近播放、为你推荐
- **搜索** - 实时搜索音乐、艺人、专辑
- **音乐库** - 管理你的收藏
- **专辑详情** - 完整专辑信息和曲目列表
- **播放列表** - 创建和管理自定义播放列表

### 🎯 用户体验
- **加载状态** - 优雅的加载动画
- **错误处理** - 友好的错误提示和重试机制
- **空状态** - 引导性的空状态设计
- **响应式设计** - 完美适配各种屏幕尺寸
- **流畅交互** - 平滑的过渡动画和悬停效果

## 🛠 技术栈

### 前端
- **React 18** - 最新的React特性
- **TypeScript** - 类型安全
- **Vite** - 极速开发构建工具
- **Material-UI v5** - Material Design组件库
- **React Router v6** - 路由管理
- **Zustand** - 轻量级状态管理
- **Axios** - HTTP客户端

### 后端
- **Node.js** - JavaScript运行时
- **Express** - Web框架
- **TypeScript** - 类型安全的后端
- **MongoDB** - NoSQL数据库
- **Mongoose** - MongoDB对象建模
- **JWT** - 身份认证（预留）
- **Helmet** - 安全中间件
- **Compression** - 响应压缩

## 🚀 快速开始

### 环境要求
- Node.js 18+
- MongoDB 5.0+
- npm 或 yarn

### 安装步骤

1. **克隆仓库**
```bash
git clone <repository-url>
cd MUSIKGO
```

2. **安装依赖**
```bash
npm run install:all
```

3. **配置环境变量**

**前端配置** (`client/.env`):
```env
VITE_API_URL=http://localhost:3000/api
```

**后端配置** (`server/.env`):
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/musikgo
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

4. **启动MongoDB**
```bash
# macOS (使用Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

5. **填充示例数据**
```bash
cd server
npm run seed
```

6. **启动开发服务器**
```bash
# 从根目录同时启动前后端
npm run dev

# 或单独启动
npm run dev:client  # 前端: http://localhost:5173
npm run dev:server  # 后端: http://localhost:3000
```

7. **访问应用**
打开浏览器访问 [http://localhost:5173](http://localhost:5173)

## 📁 项目结构

```
MUSIKGO/
├── client/                         # React前端应用
│   ├── src/
│   │   ├── components/            # React组件
│   │   │   ├── Common/           # 通用组件
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   ├── ErrorMessage.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   └── AnimatedCard.tsx
│   │   │   ├── Layout/           # 布局组件
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Header.tsx
│   │   │   ├── Player/           # 播放器组件
│   │   │   │   ├── AudioPlayer.tsx
│   │   │   │   └── PlayerBar.tsx
│   │   │   ├── AlbumCard/        # 专辑卡片
│   │   │   ├── TrackList/        # 曲目列表
│   │   │   └── Playlist/         # 播放列表组件
│   │   ├── pages/                # 页面组件
│   │   │   ├── Home.tsx
│   │   │   ├── Search.tsx
│   │   │   ├── Library.tsx
│   │   │   ├── AlbumDetail.tsx
│   │   │   └── Playlists.tsx
│   │   ├── stores/               # Zustand状态管理
│   │   │   ├── playerStore.ts    # 播放器状态
│   │   │   ├── themeStore.ts     # 主题状态
│   │   │   └── musicStore.ts     # 音乐数据状态
│   │   ├── services/             # API服务
│   │   │   └── api.ts
│   │   ├── theme/                # 主题系统
│   │   │   ├── theme.ts          # Material Design 3主题
│   │   │   └── monetColors.ts    # 莫奈取色系统
│   │   ├── types/                # TypeScript类型定义
│   │   ├── App.tsx               # 根组件
│   │   └── main.tsx              # 入口文件
│   └── package.json
│
├── server/                         # Node.js后端API
│   ├── src/
│   │   ├── controllers/          # 控制器
│   │   │   ├── trackController.ts
│   │   │   └── playlistController.ts
│   │   ├── models/               # Mongoose模型
│   │   │   ├── Track.ts
│   │   │   ├── Playlist.ts
│   │   │   └── User.ts
│   │   ├── routes/               # API路由
│   │   │   ├── tracks.ts
│   │   │   └── playlists.ts
│   │   ├── config/               # 配置文件
│   │   │   └── database.ts
│   │   ├── utils/                # 工具函数
│   │   │   └── seedData.ts
│   │   └── index.ts              # 服务器入口
│   └── package.json
│
├── package.json                   # 根package.json
├── README.md                      # 项目文档
└── CONTRIBUTING.md               # 贡献指南
```

## 🎨 核心功能实现

### 莫奈取色系统
位于 `client/src/theme/monetColors.ts`

- 从专辑封面图片提取主色调
- 使用Canvas API分析图片颜色
- 生成Material Design 3调色板
- 自动计算互补色和对比色
- 支持明暗主题自适应

```typescript
// 使用示例
const palette = await applyMonetTheme(albumCoverUrl);
setMonetPalette(palette);
```

### 播放器核心
位于 `client/src/stores/playerStore.ts`

- HTML5 Audio API集成
- 队列管理和播放历史
- 播放模式控制（随机、循环）
- 音量和进度同步
- 状态持久化

### API服务层
位于 `client/src/services/api.ts`

- Axios拦截器配置
- 自动Token注入
- 统一错误处理
- 请求/响应拦截

## 🔌 API端点

### 音乐接口
- `GET /api/tracks` - 获取所有音乐
- `GET /api/tracks/:id` - 获取单个音乐
- `GET /api/tracks/search?q=query` - 搜索音乐
- `POST /api/tracks` - 创建音乐
- `PUT /api/tracks/:id` - 更新音乐
- `DELETE /api/tracks/:id` - 删除音乐

### 播放列表接口
- `GET /api/playlists/user/:userId` - 获取用户播放列表
- `GET /api/playlists/:id` - 获取播放列表详情
- `POST /api/playlists` - 创建播放列表
- `PUT /api/playlists/:id` - 更新播放列表
- `POST /api/playlists/:id/tracks` - 添加音乐到播放列表
- `DELETE /api/playlists/:id/tracks/:trackId` - 从播放列表移除音乐
- `DELETE /api/playlists/:id` - 删除播放列表

## 🎯 开发脚本

```bash
# 开发模式
npm run dev              # 同时启动前后端
npm run dev:client       # 仅启动前端
npm run dev:server       # 仅启动后端

# 构建
npm run build            # 构建前后端
npm run build:client     # 仅构建前端
npm run build:server     # 仅构建后端

# 生产环境
npm start                # 启动生产服务器（需先构建）

# 数据库
cd server && npm run seed  # 填充示例数据

# 代码检查
npm run lint             # 运行ESLint
```

## 🎨 设计系统

### 颜色系统
- **Primary** - 主色调，从专辑封面提取
- **Secondary** - 辅助色，基于主色调生成
- **Tertiary** - 第三色，用于强调
- **Surface** - 表面色，用于卡片和容器
- **Background** - 背景色

### 组件设计
- 遵循Material Design 3规范
- 12px圆角（borderRadius）
- 流畅的过渡动画（300ms cubic-bezier）
- 响应式断点：xs, sm, md, lg, xl

## 🚧 待实现功能

- [ ] 用户认证和授权
- [ ] 文件上传功能
- [ ] 社交功能（关注、分享）
- [ ] 个性化推荐算法
- [ ] 歌词显示
- [ ] 音频可视化
- [ ] 离线模式
- [ ] PWA支持

## 🤝 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解更多信息。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Spotify](https://spotify.com) - 设计灵感
- [Material Design 3](https://m3.material.io/) - 设计系统
- [React](https://react.dev/) - 前端框架
- [MongoDB](https://www.mongodb.com/) - 数据库

---

**Made with ❤️ using React, Node.js, and Material Design 3**
