import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import prisma from "./lib/prisma"
import { Adapter } from "next-auth/adapters"
import Credentials from "next-auth/providers/credentials"
import { signInEmailPassword } from "./app/auth/actions/auth-actions"
 

export const { handlers, signIn, signOut, auth } = NextAuth({

  
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    
    Credentials({
      name: "Credentials",
      credentials: {
        email: {label: "Correo electronico", type:"email", placeholder: "usuario@google.com"},
        password: {label: "Contraseña", type: "password", placeholder: "*****"}
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInEmailPassword(credentials!.email as any, credentials!.password as any)
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } 
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }),
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET
  }),
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET
  }),

],

  session: {
    strategy: 'jwt'
  },

  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      console.log(user)
      return true
    },

    async jwt({token, user, account, profile}) {
      
      const dbUser = await prisma.user.findUnique({where: {email: token.email ?? 'No-email'}})

      if(dbUser?.isActive === false) {
        throw Error('El usuario no esta activo')
      }

      token.roles = dbUser?.roles ?? ['no-roles']
      token.id = dbUser?.id ?? 'No uuid'

      return token
    },

    async session({session, token, user}) {

      if(session && session.user) {
        session.user.roles = token.roles 
        session.user.id = token.id 
      }
      return session
    }
  }

})


// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"
// import async from './app/dashboard/page';
 
// export const { handlers, auth } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_ID,
//       clientSecret: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_SECRET,
//     }),
//   ],
// })