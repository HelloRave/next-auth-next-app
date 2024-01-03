import HookForm from "@/components/HookForm";

export default function AdminPage() {
    return (
        <div className="flex flex-col min-h-full justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
                    Sign up for an account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <HookForm />
            </div>
        </div>
    )
}