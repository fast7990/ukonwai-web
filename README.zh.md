这是一个使用 [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) 引导的 [Next.js](https://nextjs.org) 项目。

## 开始使用

首先，运行开发服务器：

```bash
npm run dev
# 或者
yarn dev
# 或者
pnpm dev
# 或者
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

您可以通过修改 `app/layout.tsx` 来开始编辑页面。当您编辑文件时，页面会自动更新。

此项目使用 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) 来自动优化和加载 [Geist](https://vercel.com/font)，这是 Vercel 的新字体家族。

## 了解更多

要了解有关 Next.js 的更多信息，请查看以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 的功能和 API。
- [学习 Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程。

您可以查看 [Next.js GitHub 仓库](https://github.com/vercel/next.js) - 欢迎提供您的反馈和贡献！

## 在 Vercel 上部署

部署 Next.js 应用程序最简单的方法是使用 Next.js 创建者提供的 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

有关更多详细信息，请查看我们的 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying)。

## 数据库
1. 执行Prisma迁移命令 以根据schema.prisma创建数据库表结构：
```
npx prisma migrate dev --name init
```
迁移命令作用 ：

- 基于 `schema.prisma` 生成SQL迁移文件
- 自动在数据库中执行SQL创建所有表（包括User表）
- 创建 prisma/migrations 目录存储迁移历史
2. 验证迁移结果 ：
```
npx prisma studio
```

3. 重置数据库
```
npx prisma migrate reset
```
重置数据库作用 ：

- 删除数据库中所有表
- 重新执行所有迁移文件
- 重置数据库连接池

4. 数据库连接池
数据库连接池作用 ：

- 管理数据库连接
- 复用数据库连接
- 限制数据库连接数量
- 提高数据库连接效率
