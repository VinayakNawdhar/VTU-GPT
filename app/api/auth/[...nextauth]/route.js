import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { sql } from "@vercel/postgres";

const authOptions = {
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks : {
    async session({ session,token }) {
        session.userId = token.sub;
        return session
      }
    }
}

const handler =  NextAuth(authOptions);

export {handler as GET, handler as POST,authOptions}