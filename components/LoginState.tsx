import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function LoginState() {
    const session = await getServerSession(options);
    return (
        <>
            {session ? (
                <Link href={{
                    pathname: '/api/auth/signout',
                    query: { callbackUrl: '/' },
                }}>Logout</Link>
            ) : (
                <Link href="/api/auth/signin">Login</Link>
            )}
        </>
    )
}
