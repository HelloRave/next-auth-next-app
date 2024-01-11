import '@/public/styles/buttons/google.css';

interface ISocialButton {
    readonly children: React.ReactNode;
    readonly title: string;
    readonly className: string;
}

export default function SocialButton({ children, title, className }: ISocialButton) {
    return (
        <button
            type="button"
            className={
                `rounded px-6 py-2.5 font-medium shadow-md
                ${ className }`
            }
        >
            { children }
            <span>{ title }</span>
        </button>
    )
}