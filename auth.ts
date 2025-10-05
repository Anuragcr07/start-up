import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import { client } from "./sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if the user exists in Sanity
      const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
        id: profile?.id,
      });

      console.log({ existingUser, profile, user });

      if (!existingUser) {
        // User not found in Sanity, create a new user document
        await writeClient.create({
          _type: "author",
          githubId: String(profile?.id),
          name: user?.name,
          username: profile?.login,
          email: user?.email,
          image: user?.image,
          bio: profile?.bio || "",
        });
      }

      // Return true to continue the sign-in process
      return true;
    },
   async jwt({ token, account, profile }) {
  if (account && profile) {
    const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
      id: profile?.id,
    });

    if (user) {
      token.id = user._id;
    } else {
      console.warn("No matching Sanity user found for GitHub ID:", profile?.id);
    }
  }
  return token;
},


    async session({ session, token }) {
      // Pass the profile id from the token to the session
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
