import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import Credentials from "next-auth/providers/credentials";
import {
  credentialsSignInCallback,
  signInCallback,
} from "./app/api/auth/customAuth";
import { ProviderType } from "./types";

const providers = [
  Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: credentialsSignInCallback,
  }),
  GoogleProvider({
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
  FacebookProvider({
    clientId: process.env.AUTH_FACEBOOK_ID,
    clientSecret: process.env.AUTH_FACEBOOK_SECRET,
  }),

  TwitterProvider({
    clientId: process.env.AUTH_TWITTER_ID,
    clientSecret: process.env.AUTH_TWITTER_SECRET,
  }),
];

export const providerMap = providers
  .map((provider: any) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const providerList = providerMap.flatMap(
  (provider: ProviderType) => provider.id
);

const authOptions = {
  providers,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      const response = await signInCallback(user, account);
      return response;
      // if response is null then an auth error is automatically generated
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
