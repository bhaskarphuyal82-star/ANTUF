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

          const user = await User.findOne({ email: email.toLowerCase() });
          if (!user) {
            throw new Error("User not found");
          }
          if (!user.password) {
            throw new Error("Please login via the method used to sign up (OAuth provider)");
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid email or password!");
          }
          console.log("[NextAuth Credentials] User authenticated:", email);
          return user;
        } catch (error) {
          console.error("[NextAuth Credentials] Auth error:", error.message);
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log("[NextAuth SignIn] Starting signin for:", user?.email, "Provider:", account?.provider);
        
        await dbConnect();
        const { email } = user;
        
        if (!email) {
          console.error("[NextAuth SignIn] No email provided by provider");
          return false;
        }

        let dbUser = await User.findOne({ email: email.toLowerCase() });

        if (!dbUser) {
          console.log(`[NextAuth SignIn] Creating new ${account?.provider} user: ${email}`);
          // Create new user for OAuth providers
          try {
            dbUser = await User.create({
              email: email.toLowerCase(),
              name: user?.name || profile?.name || email.split("@")[0],
              image: user?.image || profile?.image,
              provider: account?.provider || "credentials",
              password: null, // OAuth users don't have passwords
            });
            console.log(`[NextAuth SignIn] ✓ New ${account?.provider} user created: ${email}`);
          } catch (createError) {
            console.error(`[NextAuth SignIn] Failed to create user:`, createError.message);
            // If user creation fails, still return true for OAuth to allow account linking
            if (account?.provider !== "credentials") {
              return true;
            }
            return false;
          }
        } else {
          console.log(`[NextAuth SignIn] Found existing user: ${email}`);
          // Update existing user with OAuth info if available
          let updated = false;
          if (user?.image && !dbUser.image) {
            dbUser.image = user.image;
            updated = true;
          }
          if (profile?.image && !dbUser.image) {
            dbUser.image = profile.image;
            updated = true;
          }
          // Update provider if missing
          if (!dbUser.provider && account?.provider) {
            dbUser.provider = account.provider;
            updated = true;
          }
          if (updated) {
            await dbUser.save();
            console.log(`[NextAuth SignIn] ✓ User updated`);
          }
        }
        console.log(`[NextAuth SignIn] ✓ SignIn successful for: ${email}`);
        return true;
      } catch (error) {
        console.error("[NextAuth SignIn] Callback error:", error.message, error.stack);
        return false;
      }
    },

    jwt: async ({ token, user, trigger }) => {
      try {
        // If this is the first time the JWT is created (initial signin), use the user object
        if (user) {
          console.log("[NextAuth JWT] Initial token creation for:", user.email);
          token.user = {
            _id: user._id?.toString() || user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role || "user",
            isAdmin: user.role === "admin" || user.isAdmin,
            provider: user.provider,
          };
        } else if (token?.email) {
          // For subsequent calls, fetch from database if token is being refreshed
          await dbConnect();
          const userByEmail = await User.findOne({ email: token.email });
          if (userByEmail) {
            token.user = {
              _id: userByEmail._id.toString(),
              email: userByEmail.email,
              name: userByEmail.name,
              image: userByEmail.image,
              role: userByEmail.role || "user",
              isAdmin: userByEmail.role === "admin" || userByEmail.isAdmin,
              provider: userByEmail.provider,
            };
          } else {
            console.warn("[NextAuth JWT] User not found in database:", token.email);
          }
        }
        return token;
      } catch (error) {
        console.error("[NextAuth JWT] Callback error:", error.message);
        return token;
      }
    },

    session: async ({ session, token }) => {
      try {
        if (token?.user) {
          session.user = {
            _id: token.user._id,
            email: token.user.email,
            name: token.user.name,
            image: token.user.image,
            role: token.user.role || "user",
            isAdmin: token.user.isAdmin || false,
            provider: token.user.provider,
          };
          console.log("[NextAuth Session] Session updated for:", session.user.email);
        } else {
          console.warn("[NextAuth Session] No user data in token");
        }
        return session;
      } catch (error) {
        console.error("[NextAuth Session] Callback error:", error.message);
        return session;
      }
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};