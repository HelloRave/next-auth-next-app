import '@/public/styles/buttons/google.css';
import { ButtonHTMLAttributes } from 'react';

type ISocialButton = {
    readonly children: React.ReactNode;
    readonly title: string;
    readonly className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function SocialButton({
    children, title, className, ...props
}: ISocialButton) {
    return (
        <button
            type={ props.type }
            className={
                `flex gap-x-4 rounded px-6 py-2.5 font-medium shadow-md max-w-fit
                ${ className }`
            }
            {...props}
        >
            { children }
            <span>{ title }</span>
        </button>
    )
}