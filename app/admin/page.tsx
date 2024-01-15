import RegisterHookForm from "@/components/RegisterHookForm";
import FormCard from "@/components/FormCard";

export default function AdminPage() {
    return (
        <div className="min-h-full flex justify-center my-10">
            <FormCard
                title="Sign up for an account"
                className="w-1/2 py-10 shadow-md rounded bg-white"
            >
                <RegisterHookForm />
            </FormCard>
        </div>
    )
}