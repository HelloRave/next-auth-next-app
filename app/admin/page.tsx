import HookForm from "@/components/HookForm";
import RegisterForm from "@/components/RegisterForm";

export default function AdminPage() {
    return (
        <div className="min-h-full flex justify-center my-10">
            <RegisterForm 
                title="Sign up for an account" 
                className="w-1/2 py-10 shadow-md rounded bg-white"
            >
                <HookForm />
            </RegisterForm>
        </div>
    )
}