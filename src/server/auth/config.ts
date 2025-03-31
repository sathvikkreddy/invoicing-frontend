import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import type { StrapiErrorT, StrapiLoginResponseT } from "~/types/strapi";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
    strapiToken: string;
    strapiUserId: number;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      // Initial sign in - save the access token
      if (account) {
        if (account.provider === "google") {
          // we now know we are doing a sign in using GoogleProvider
          try {
            const strapiResponse = await fetch(
              `${process.env.STRAPI_BACKEND_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`,
              { cache: "no-cache" },
            );
            if (!strapiResponse.ok) {
              const strapiError = (await strapiResponse.json()) as StrapiErrorT;
              // console.log('strapiError', strapiError);
              throw new Error(strapiError.error.message);
            }
            const strapiLoginResponse =
              (await strapiResponse.json()) as StrapiLoginResponseT;
            // customize token
            // name and email will already be on here
            token.strapiToken = strapiLoginResponse.jwt;
            token.strapiUserId = strapiLoginResponse.user.id;
          } catch (error) {
            throw error;
          }
        }
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        image: token.picture,
      },
      strapiToken: token.strapiToken,
      strapiUserId: token.strapiUserId,
    }),
  },
} satisfies NextAuthConfig;
