import GithubProviver from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Provider } from "next-auth/providers/index";

export const options = {
    providers: [
        GithubProviver({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            profile(profile) {
                console.log("Profile Github: ", profile);

                let userRole = "GitHub User"

                if(profile?.email == "huang.weiwei@trentglobal.edu.sg") {
                    userRole = "admin";
                }

                return {
                    ...profile, role: userRole,
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            profile(profile) {
                console.log("Profile Google: ", profile);

                let userRole = "Google User"

                if(profile?.email == "hellowallaceww@gmail.com") {
                    userRole = "admin";
                }

                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                }
            }
        }),
    ] as Provider[],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) token.role = user.role
            return token
        },
        async session({ session, token }: any) {
            if (session?.user) session.user.role = token.role
            return session
        }
    }
}