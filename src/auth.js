import NextAuth from "next-auth"
import Google from 'next-auth/providers/google'
import Credential from 'next-auth/providers/credentials'
import { User } from "./models/userModel"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"
import { connect } from "./lib/dbConnect"

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credential({
      async authorize(credentials) {
        if (!credentials) return null
        try {
          await connect()
          const user = await User.findOne({
            email: credentials?.email
          })
          if (user) {
            console.log("Email matched")
            const isMatch = await bcrypt.compare(credentials?.password, user.password)
            if (isMatch) {
              console.log("Password Match");
              // Return user with _id
              return user;
            } else {
              throw new Error("Invalid identifier or Password")
            }
          } else {
            throw new Error("User Doesn't Exist")
          }
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error(`Error occur from auth.js: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
        }
      }
    })
  ],
})