'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";

const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password at least 6 characters'),
    confirmPassword: z.string(),
}).refine(
    (data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    }
)

type TSignupSchema = z.infer<typeof signUpSchema>;

export default function HookForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
    } = useForm<TSignupSchema>({
        resolver: zodResolver(signUpSchema)
    });

    const onSubmit = handleSubmit(async data => {
        await Promise.resolve(setTimeout(() => {
            console.log(data)
            reset();
        }, 3000));
    })

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3 w-1/2">
            <input
                {...register('email')}
            />
            {
                errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                )
            }
            <input
                {...register('password')}
            />
            {/* <input
                {...register('password', {
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password at least 6 characters',
                    },
                })}
            /> */}
            {
                errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )
            }
            <input
                {...register('confirmPassword')}
            />
            {/* <input
                {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: (value) => {
                        return value === getValues('password') || 'Password must match'
                    }
                })}
            /> */}
            {
                errors.confirmPassword && (
                    <p className="text-red-500">{errors.confirmPassword.message}</p>
                )
            }
            <button
                disabled={isSubmitting}
                type="submit"
                className="bg-blue-500 disable:bg-gray-500 py-2 rounded"
            >
                Submit
            </button>
        </form>
    )
}