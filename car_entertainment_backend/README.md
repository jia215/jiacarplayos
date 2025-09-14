# 车载娱乐系统

基于串流技术的现代化车载娱乐系统，提供音频和视频内容的播放、管理和串流功能。

## 功能特性

### 核心功能
- 🎵 **音频播放**: 支持多种音频格式的播放和串流
- 🎬 **视频播放**: 支持视频内容的播放和串流
- 📱 **响应式设计**: 适配车载屏幕和移动设备
- 🔍 **内容搜索**: 智能搜索音视频内容
- 📂 **分类浏览**: 按类型和分类浏览内容
- 📋 **播放列表**: 创建和管理个人播放列表
- 📊 **播放历史**: 记录和追踪播放历史

### 技术特性
- 🚀 **串流技术**: 支持HTTP Live Streaming (HLS)
- 🔄 **断点续传**: 支持Range请求和断点续传
- 🎛️ **播放控制**: 完整的媒体播放控制功能
- 🔊 **音量控制**: 精确的音量调节
- ⏯️ **播放状态**: 实时播放状态管理
- 📱 **全屏播放**: 支持全屏视频播放

## 技术架构

### 后端技术栈
- **框架**: Flask (Python)
- **数据库**: SQLite
- **ORM**: SQLAlchemy
- **跨域**: Flask-CORS
- **串流**: 自定义HTTP串流实现

### 前端技术栈
- **框架**: React 18
- **构建工具**: Vite
- **UI组件**: shadcn/ui
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **路由**: React Router

### 数据模型
- **用户模型**: 用户认证和管理
- **内容模型**: 音视频内容信息
- **播放列表模型**: 用户播放列表
- **播放历史模型**: 播放记录追踪

## 安装和运行

### 环境要求
- Python 3.11+
- Node.js 20+
- pnpm

### 后端启动
```bash
cd car_entertainment_backend
source venv/bin/activate
pip install -r requirements.txt
python init_sample_data.py  # 初始化示例数据
python run_server.py
```

### 前端开发
```bash
cd car-entertainment-frontend
pnpm install
pnpm run dev
```

### 生产部署
```bash
# 构建前端
cd car-entertainment-frontend
pnpm run build

# 复制到Flask静态目录
cp -r dist/* ../car_entertainment_backend/src/static/

# 启动生产服务器
cd ../car_entertainment_backend
source venv/bin/activate
python run_server.py
```

## API接口

### 内容管理
- `GET /api/contents` - 获取内容列表
- `GET /api/contents/<id>` - 获取内容详情
- `POST /api/contents` - 创建新内容
- `GET /api/categories` - 获取分类列表
- `GET /api/trending` - 获取热门内容

### 播放列表
- `GET /api/playlists` - 获取播放列表
- `POST /api/playlists` - 创建播放列表
- `POST /api/playlists/<id>/contents` - 添加内容到播放列表

### 串流服务
- `GET /api/stream/<id>` - 串流内容
- `GET /api/stream-info/<id>` - 获取串流信息
- `GET /api/hls/<id>/playlist.m3u8` - HLS播放列表
- `GET /api/quality-levels/<id>` - 获取质量级别

### 播放会话
- `POST /api/playback-session` - 开始播放会话
- `PUT /api/playback-session/<id>` - 更新播放会话
- `POST /api/play-history` - 记录播放历史

## 使用说明

### 基本操作
1. **浏览内容**: 在首页查看推荐内容，或通过音乐/视频标签浏览
2. **搜索内容**: 使用搜索框查找特定内容
3. **播放内容**: 点击播放按钮开始播放音频或视频
4. **播放控制**: 使用播放器控制播放、暂停、音量等
5. **管理播放列表**: 创建和管理个人播放列表

### 高级功能
- **分类筛选**: 按内容类型或分类筛选
- **播放历史**: 查看播放历史记录
- **全屏播放**: 视频支持全屏播放模式
- **断点续传**: 支持从上次播放位置继续

## 开发说明

### 项目结构
```
car_entertainment_backend/
├── src/
│   ├── models/          # 数据模型
│   ├── routes/          # API路由
│   ├── static/          # 静态文件
│   └── main.py          # 主应用
├── venv/                # 虚拟环境
├── requirements.txt     # Python依赖
└── run_server.py        # 服务器启动脚本

car-entertainment-frontend/
├── src/
│   ├── components/      # React组件
│   ├── assets/          # 静态资源
│   └── App.jsx          # 主应用组件
├── dist/                # 构建输出
└── package.json         # Node.js依赖
```

### 扩展开发
- **添加新内容类型**: 扩展Content模型和相关API
- **增强串流功能**: 实现更多串流协议和质量级别
- **用户认证**: 完善用户登录和权限管理
- **推荐算法**: 实现智能内容推荐
- **离线功能**: 支持内容下载和离线播放

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进项目。

## 联系方式

如有问题或建议，请通过GitHub Issues联系。

