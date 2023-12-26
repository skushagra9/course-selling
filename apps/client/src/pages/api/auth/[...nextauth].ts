import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";
import { connectToDatabase } from "../../../lib/db.Connect";
import { Admin } from "db";
import GoogleProvider from "next-auth/providers/google";



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
        await connectToDatabase();
        if (!credentials) {
          return null;
        }
        const username = credentials.username;
        const secret = credentials.secret;

        // Add logic here to look up the user from the credentials supplied
        const admin = await Admin.findOne({ username });

        if (!admin) {
          console.log("No admin");
        } else {
          // TODO: Make this safer, encrypt passwords
          if (secret !== process.env.GLOBAL_SECRET) {
            return null;
          }
          // User is authenticated
          return {
            id: admin._id,
            email: admin.username,
            userId: admin._id.toString(), // Include userId in the token
          };
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
        await connectToDatabase();
        if (!credentials) {
          return null;
        }
        const username = credentials.username;
        const password = credentials.password;
        // Add logic here to look up the user from the credentials supplied
        const admin = await Admin.findOne({ username });

        if (!admin) {
          const obj = { username: username, password: password };
          const newAdmin = new Admin(obj);
          let adminDb = await newAdmin.save();
          console.log(adminDb);
          return {
            id: adminDb._id,
            email: adminDb.username,
            userId: adminDb._id.toString(), // Include userId in the token
          };
        } else {
          // TODO: Make this safer, encrypt passwords
          if (admin.password !== password) {
            return null;
          }
          req.session.user = {
            id: admin._id, // Convert ObjectId to string
            email: admin.username,
            userId: admin._id.toString(), // Include userId
          };
          // User is authenticated
          return {
            id: admin._id,
            email: admin.username,
            userId: admin._id.toString(), // Include userId in the token
          };
        }
      },
    }),
  ] as Provider[],
  callbacks: {
    async session(session, user) {
      // Modify the session object here
      if (user) {
        session.user.id = user.id;
        session.user.email = user.email;
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
