'use client'

import { registerUser } from "@/app/admin/actions";
import { TSignupSchema, signUpSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

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
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                    Name
                </label>
                <input
                    className="block mt-2 w-full rounded-md border-0 p-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300"
                    {...register('name')}
                />
                {
                    errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                    )
                }
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Email
                </label>
                <input
                    className="block mt-2 w-full rounded-md border-0 p-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300"
                    {...register('email')}
                />
                {
                    errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )
                }
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                    Password
                </label>
                <input
                    className="block mt-2 w-full rounded-md border-0 p-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300"
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
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                    Confirm Password
                </label>
                <input
                    className="block mt-2 w-full rounded-md border-0 p-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300"
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
            </div>
            <button
                disabled={isSubmitting}
                type="submit"
                className="bg-indigo-600 mt-10 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
                hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded"
            >
                Submit
            </button>
        </form>
    )
}