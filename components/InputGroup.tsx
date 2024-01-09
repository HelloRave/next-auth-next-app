import { Fragment } from "react";
import {
    DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister
} from "react-hook-form";

export type FormInputProps<TFormValues extends FieldValues> = {
    readonly label: string;
    readonly name: Path<TFormValues>;
    readonly register: UseFormRegister<TFormValues>;
    readonly errors: Partial<DeepMap<TFormValues, FieldError>>;
    readonly rules?: RegisterOptions;
} & {
    readonly type: string;
}

export default function InputGroup<TFormValues extends FieldValues>({
    label, name, register, errors, rules, ...props
}: FormInputProps<TFormValues>) {
    return (
        <Fragment>
            <label htmlFor={name} className="block text-sm font-medium text-gray-900">
                {label}
            </label>
            <input
                className="block mt-2 w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300"
                {...props}
                {...register(name, rules)}
            />
            {
                errors[name] && (
                    <p className="text-red-500">{errors[name].message}</p>
                )
            }
        </Fragment>
    )
}
