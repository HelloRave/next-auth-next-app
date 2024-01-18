'use client'

import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import InputGroup from "./InputGroup"

type TLoginSchema = {
    email: string
    password: string
}

export default function LoginHookForm() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isValid },
        reset
    } = useForm<TLoginSchema>();

    const onSubmit = handleSubmit(async data => {
        const response = await signIn("credentials", {
            email: data.email, password: data.password,
            callbackUrl: '/', redirect: false,
        });

        if (response) {
            console.log(response);
            return;
        }

        reset();
    });

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div>
                <InputGroup<TLoginSchema>
                    label="Email"
                    name="email"
                    type="text"
                    register={register}
                />
            </div>
            <div>
                <InputGroup<TLoginSchema>
                    label="Password"
                    name="password"
                    type="password"
                    register={register}
                />
            </div>
            <button
                disabled={!isValid || isSubmitting}
                type="submit"
                className="bg-indigo-600 mt-5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
                    disabled:bg-slate-300
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded"
            >
                Submit
            </button>
        </form>
    )
}