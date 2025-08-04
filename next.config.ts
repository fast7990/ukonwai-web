import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  // 解决跨域问题 - 方法1: 配置CORS头
  // 此方法允许浏览器直接访问你的API路由
  headers: async () => [
    {
      // 匹配所有API路由
      source: '/api/:path*',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: '*', // 允许所有来源，生产环境建议指定具体域名
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type,Authorization',
        },
      ],
    },
  ],
  // 解决跨域问题 - 方法2: 使用代理
  // 此方法将请求转发到外部API，适用于需要隐藏实际API地址的情况
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/external/:path*',
  //       destination: 'https://external-api.example.com/:path*', // 替换为实际的API地址
  //     },
  //   ]
  // },
}

export default nextConfig
