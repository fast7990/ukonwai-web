import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/db/db'
import { Adapter } from '@auth/core/adapters'
import Email from 'next-auth/providers/nodemailer'

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GitHub,
    Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  basePath: '/auth',
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === 'update') token.name = session.user.name
      return token
    },
  },
})
