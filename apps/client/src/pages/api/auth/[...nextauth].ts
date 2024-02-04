import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";
import { PrismaClient } from '@prisma/client'
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      id: "credentialsimpersonate",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        secret: { label: "Secret", type: "text", placeholder: "Global_Secret" },
      },
      async authorize(credentials, req) {
        try {
          const { username, secret } = credentials;

          if (!credentials) {
            return null;
          }

          const admin = await prisma.admin.findUnique({
            where: { username },
          });

          if (!admin || secret !== process.env.GLOBAL_SECRET) {
            return null;
          }

          return {
            id: admin.id,
            username: admin.username,
            userId: admin.id.toString(),
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        } finally {
          await prisma.$disconnect(); // Close Prisma connection
        }
      },
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { username, password } = credentials;

          if (!credentials) {
            return null;
          }

          const admin = await prisma.admin.findUnique({
            where: { username },
          });

          if (!admin) {
            const newAdmin = await prisma.admin.create({
              data: {
                username,
                password,
              },
            });

            console.log(newAdmin);

            return {
              id: newAdmin.id,
              username: newAdmin.username,
              userId: newAdmin.id.toString(),
            };
          } else if (admin.password !== password) {
            return null;
          }

          return {
            id: admin.id,
            username: admin.username,
            userId: admin.id.toString(),
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        } finally {
          await prisma.$disconnect(); // Close Prisma connection
        }
      },
    }),
  ] as Provider[],
  callbacks: {
    async session(session, user) {
      // Modify the session object here
      if (user) {
        session.user.id = user.id;
        session.user.username = user.username;
        session.user.userId = user.userId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    encryption: true,
  },
};

export default NextAuth(authOptions);
