import NextAuth from 'next-auth'
import { Account, User as AuthUser } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import User from '@/models/User'
import connect from '@/utils/db'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'userType', type: 'text' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await connect()
        try {
          console.log('userType' + credentials.userType)

          const user = await User.findOne({ email: credentials.email })

          console.log(user)
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            )
            if (
              (credentials.userType == 2 &&
                user.posteTrav == 'Human Resources Specialist') ||
              (credentials.userType == 1 &&
                user.posteTrav != 'Human Resources Specialist' &&
                user.posteTrav != 'Ceo') ||
              (credentials.userType == 3 && user.posteTrav == 'Ceo')
            ) {
              if (isPasswordCorrect) {
                return user
              }
            }
          }
        } catch (err) {
          throw new Error(err)
        }
      }
    })
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == 'credentials') {
        return true
      }
      //   if (account?.provider == "github") {
      //     await connect();
      //     try {
      //       const existingUser = await User.findOne({ email: user.email });
      //       if (!existingUser) {
      //         const newUser = new User({
      //           email: user.email,
      //         });

      //         await newUser.save();
      //         return true;
      //       }
      //       return true;
      //     } catch (err) {
      //       console.log("Error saving user", err);
      //       return false;
      //     }
      //   }
    }
  }
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
