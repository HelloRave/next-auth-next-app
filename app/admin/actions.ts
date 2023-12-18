'use server'

import { TSignupSchema, signUpSchema } from "@/lib/schema";

export async function registerUser(data: TSignupSchema) {
    const result = signUpSchema.safeParse(data);

    if (!result.success) {
        return { sucess: false, error: result.error.format() };
    } else {
        return { success: true, data: result.data }
    }

    // Perform queries to db
}
