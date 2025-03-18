import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/db/db'
import { Adapter } from '@auth/core/adapters'

export const { handlers, auth, signIn, signOut } = NextAuth({
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [GitHub],
  basePath: '/auth',
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === 'update') token.name = session.user.name
      return token
    },
  },
})
