'use client'

import { signIn } from "next-auth/react";
import Image from "next/image";

import FormCard from "@/components/FormCard";
import SocialButton from "@/components/SocialButton";
import { gitHubIcon, googleIcon } from "@/public/icons";

export default function LoginPage() {
    return (
        <div className="min-h-full flex justify-center my-10">
            <FormCard
                title="Login"
                className="w-1/2 py-10 shadow-md rounded bg-white"
            >
                <div className="flex flex-col gap-3 items-center">
                    <SocialButton
                        title="Continue with GitHub"
                        type="button"
                        className="bg-black text-white hover:opacity-75"
                        onClick={() => signIn("github", {
                            callbackUrl: '/'
                        })}
                    >
                        <Image
                            priority
                            src={gitHubIcon}
                            width={24}
                            height={24}
                            alt="github icon"
                        />
                    </SocialButton>
                    <SocialButton
                        title="Continue with Google"
                        type="button"
                        className="bg-white text-black hover:opacity-75"
                        onClick={() => signIn("google", {
                            callbackUrl: '/'
                        })}
                    >
                        <Image
                            priority
                            src={googleIcon}
                            width={24}
                            height={24}
                            alt="google icon"
                        />
                    </SocialButton>
                </div>
            </FormCard>
        </div>
    )
}