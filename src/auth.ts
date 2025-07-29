// 导入NextAuth核心模块 - 提供完整的认证解决方案
import NextAuth from 'next-auth'
// 导入GitHub OAuth认证提供商
import GitHub from 'next-auth/providers/github'
// 导入Prisma适配器 - 用于将认证数据存储到数据库
import { PrismaAdapter } from '@auth/prisma-adapter'
// 导入数据库连接实例
import { db } from '@/db/db'
// 导入认证适配器类型定义
import { Adapter } from '@auth/core/adapters'
// 导入电子邮件认证提供商
import Email from 'next-auth/providers/nodemailer'

/**
 * 认证配置主函数
 * 导出认证相关的处理器和方法：
 * - handlers: 包含GET和POST请求处理器
 * - auth: 用于获取会话信息的React钩子
 * - signIn: 登录函数
 * - signOut: 登出函数
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  // 信任主机头配置
  // 生产环境中启用，确保NextAuth能正确处理来自反向代理的请求
  // 避免在URL重定向时出现协议/主机不匹配的问题
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  // 认证页面主题配置
  // 自定义登录/注册页面的视觉样式
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png', // 登录页面显示的Logo
  },
  adapter: PrismaAdapter(db) as Adapter,
  // 认证提供商配置数组
  // 配置支持的登录方式，用户可选择其中一种进行认证
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // authorization: { 
      //   params: { 
      //     redirect_uri: "https://localhost:3000/api/auth/callback/github" // 需与环境一致 
      //   }
      // }
    }), // GitHub OAuth登录 - 使用用户的GitHub账号进行认证
    Email({
      // 电子邮件认证配置
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: true, // 587端口使用STARTTLS，不需要直接TLS
        tls: {
          ciphers: 'SSLv3',
          rejectUnauthorized: process.env.NODE_ENV === 'production', // 开发环境允许自签名证书
        },
        maxAge: 24 * 60 * 60, // 验证码有效期（24小时）
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM, // 发件人邮箱
    }),
  ],
  // 认证路由基础路径
  // 所有认证相关的API和页面都将挂载在该路径下
  // 例如: /auth/signin, /auth/signout, /auth/callback
  basePath: '/api/auth',
  // 认证回调函数配置
  // 自定义认证流程中的关键环节处理逻辑
  callbacks: {
    // JWT令牌处理回调
    // 在创建或更新JWT时触发
    jwt({ token, trigger, session }) {
      // 当用户更新个人信息时，同步更新JWT中的用户名
      if (trigger === 'update') token.name = session.user.name
      return token
    },
  },
})
