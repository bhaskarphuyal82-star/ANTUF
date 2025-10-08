import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/models/user";
import bcrypt from "bcrypt";

import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/utils/dbConnect";
import { Straight } from "@mui/icons-material";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        try {
          await dbConnect();
          const { email, password } = credentials;

          if (!email || !password) {
            throw new Error("Email and password are required");
          }

          const user = await User.findOne({ email });
          
          if (!user) {
            throw new Error("No user found with this email address");
          }

          if (!user.password) {
            throw new Error("Please login via the method used to sign up");
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          
          if (!isPasswordValid) {
            throw new Error("Invalid email or password!");
          }

          return {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role || "user",
            image: user.image,
          };
        } catch (error) {
          console.error("Auth error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await dbConnect();
      const { email } = user;
      let dbUser = await User.findOne({ email });

      if (!dbUser) {
        // Check if this is the first user or admin email
        const userCount = await User.countDocuments();
        const isAdminEmail = process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL;
        
        dbUser = await User.create({
          email,
          name: user?.name,
          image: user?.image,
          // First user or admin email gets admin role
          role: userCount === 0 || isAdminEmail ? "admin" : "user",
        });
      }
      return true;
    },

    jwt: async ({ token, user }) => {
      try {
        await dbConnect();
        
        if (user) {
          // First time login - user object is available
          token.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role || "user",
            image: user.image,
          };
        } else if (token.email) {
          // Subsequent requests - get user from database
          const userByEmail = await User.findOne({ email: token.email });
          if (userByEmail) {
            token.user = {
              id: userByEmail._id,
              email: userByEmail.email,
              name: userByEmail.name,
              role: userByEmail.role || "user",
              image: userByEmail.image,
            };
          }
        }
      } catch (error) {
        console.error("JWT callback error:", error);
      }

      return token;
    },

    session: async ({ session, token }) => {
      session.user = {
        ...token.user,
        role: token.user.role || "user",
      };

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
