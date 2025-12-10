# 宠物MBTI测试应用

一个基于React + TypeScript + Tailwind CSS开发的宠物MBTI性格测试应用。通过15个科学设计的问题，帮助宠物主人了解狗狗的性格特征。

## 功能特性

- 🐕 **MBTI性格测试** - 15个精心设计的问题，科学评估宠物性格
- 📊 **个性化结果** - 详细的性格分析报告和特征描述
- 🔐 **用户认证** - 支持用户注册、登录和历史记录保存
- 📱 **响应式设计** - 移动端优先，适配各种设备
- 🎨 **精美UI** - 温暖的配色方案和可爱的宠物插画
- 📤 **分享功能** - 支持分享测试结果到社交媒体

## 技术栈

- **前端框架**: React 18 + TypeScript
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **路由**: React Router DOM
- **后端服务**: Supabase (BaaS平台)
- **构建工具**: Vite
- **图标**: Lucide React

## 快速开始

### 1. 克隆项目

```bash
git clone [项目地址]
cd pet_mbti
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 文件为 `.env`，并填入你的Supabase配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看应用。

## 项目结构

```
src/
├── components/          # 可复用组件
├── data/               # 静态数据（问题、选项等）
├── hooks/              # 自定义Hooks
├── lib/                # 工具库（Supabase客户端等）
├── pages/              # 页面组件
├── store/              # 状态管理
├── types/              # TypeScript类型定义
├── utils/              # 工具函数
└── App.tsx             # 主应用组件
```

## 主要页面

- **首页** (`/`) - 欢迎界面和功能介绍
- **测试页面** (`/quiz`) - 15个问题的MBTI测试
- **结果页面** (`/result`) - 个性化性格分析报告
- **登录页面** (`/login`) - 用户登录
- **注册页面** (`/register`) - 用户注册
- **历史记录** (`/history`) - 查看过往测试结果

## MBTI类型

应用支持16种MBTI性格类型，每种都有详细的特征描述：

- **ENFP** - 热情洋溢的探险家
- **ISTJ** - 可靠稳重的守护者
- **ESFP** - 快乐活泼的表演者
- **INTJ** - 独立自主的战略家
- 以及更多...

## 部署

### 部署到Vercel

1. 连接GitHub仓库到Vercel
2. 配置环境变量
3. 自动部署

### 部署到Netlify

1. 连接GitHub仓库到Netlify
2. 配置构建命令和环境变量
3. 自动部署

## 数据库配置

项目使用Supabase作为后端服务。数据库schema文件位于 `supabase/schema.sql`，包含：

- `users` - 用户表
- `test_results` - 测试结果表
- `mbti_types` - MBTI类型定义表

## 开发说明

### 模拟数据模式

如果没有配置Supabase凭据，应用会自动切换到模拟数据模式，方便开发和测试。

### 添加新问题

编辑 `src/data/questions.ts` 文件来添加或修改测试问题。

### 自定义MBTI类型

编辑 `src/utils/mbtiCalculator.ts` 文件来修改MBTI类型描述。

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License