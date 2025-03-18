import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  providers: [GitHub],
  basePath: '/auth',
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname.startsWith(`/work`)) return !!auth
      return true
    },
    jwt({ token, trigger, session }) {
      if (trigger === 'update') token.name = session.user.name
      return token
    },
  },
})
