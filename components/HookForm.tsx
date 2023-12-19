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
        <form onSubmit={onSubmit} className="flex flex-col gap-3 w-1/2">
            <input
                {...register('name')}
            />
            {
                errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                )
            }
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