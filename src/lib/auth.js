import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

const client = new MongoClient(process.env.MONGODB_URI);

export const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "supporter",
                input: true,
            },
            credits: {
                type: "number",
                defaultValue: 0,
                input: false,
            },
        },
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user, ctx) => {
                    const requestedRole = ctx?.body?.role;
                    const allowedRoles = ["supporter", "creator"];
                    const finalRole = allowedRoles.includes(requestedRole)
                        ? requestedRole
                        : "supporter";

                    return {
                        data: {
                            ...user,
                            role: finalRole,
                            credits: 0,
                        },
                    };
                },
            },
        },
    },
    advanced: {
        defaultCookieAttributes: {
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production",
        },
    },
    plugins: [nextCookies()],
});