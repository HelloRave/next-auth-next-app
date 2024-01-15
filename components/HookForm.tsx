'use client'

import Image from "next/image";
import { useForm } from "react-hook-form"

import { registerUser } from "@/app/admin/actions";
import { TSignupSchema, signUpSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputGroup from "./InputGroup";
import SocialButton from "./SocialButton";
import { gitHubIcon, googleIcon } from "@/public/icons";

export default function HookForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm<TSignupSchema>({
        mode: 'onTouched',
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = handleSubmit(async data => {
        // Server actions
        const result = await registerUser(data);

        if (!result) {
            console.log('Something went wrong');
            return;
        }

        if (result.error) {
            console.log(result.error);
            return;
        }

        reset();
    })

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div>
                <InputGroup<TSignupSchema>
                    label="Name"
                    name="name"
                    type="text"
                    register={register}
                    errors={errors}
                />
            </div>
            <div>
                <InputGroup<TSignupSchema>
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                    errors={errors}
                />
            </div>
            <div>
                <InputGroup<TSignupSchema>
                    label="Password"
                    name="password"
                    type="password"
                    register={register}
                    errors={errors}
                />
            </div>
            <div>
                <InputGroup<TSignupSchema>
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    register={register}
                    errors={errors}
                />
            </div>
            <button
                disabled={!isValid || isSubmitting}
                type="submit"
                className="bg-indigo-600 mt-10 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
                disabled:bg-slate-300
                hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded"
            >
                Submit
            </button>
            <SocialButton
                title="Sign in with GitHub"
                type="button"
                className="bg-black text-white hover:opacity-75"
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
                title="Sign in with Google"
                type="button"
                className="bg-white text-black hover:opacity-75"
            >
                <Image
                    priority
                    src={googleIcon}
                    width={24}
                    height={24}
                    alt="google icon"
                />
            </SocialButton>
        </form>
    )
}