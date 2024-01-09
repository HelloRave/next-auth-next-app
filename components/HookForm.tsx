'use client'

import { registerUser } from "@/app/admin/actions";
import { TSignupSchema, signUpSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import InputGroup from "./InputGroup";

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