'use client'

import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import InputGroup from "./InputGroup"

type TLoginSchema = {
    email: string
    password: string
}

export default function LoginHookForm() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isValid, errors },
        setError,
        reset
    } = useForm<TLoginSchema>();

    const router = useRouter();

    const onSubmit = handleSubmit(async data => {
        const response = await signIn("credentials", {
            email: data.email, password: data.password,
            redirect: false,
        });

        reset();

        if (response?.ok) {
            router.push('/');
        } else if (response?.status === 401) {
            setError("root.invalidCredentials", {
                message: 'Invalid Credentials'
            });
        } else {
            setError("root.serverError", {
                message: 'Internal server error'
            });
        }
    });

    const emailValidation = {
        label: 'Email',
        type: 'text',
        register: register,
        rules: { required: true }
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div>
                <InputGroup<TLoginSchema>
                    name='email'
                    placeholder="joe@email.com"
                    { ...emailValidation }
                />
            </div>
            <div>
                <InputGroup<TLoginSchema>
                    label="Password"
                    name="password"
                    type="password"
                    register={register}
                    rules={{required: true}}
                />
            </div>
            {
                errors?.root?.invalidCredentials &&
                <p className="text-pink-500">
                    {errors?.root?.invalidCredentials.message}
                </p>
            }
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