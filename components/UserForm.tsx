'use client'

import { useRouter } from "next/navigation"
import { useState } from "react";

export default function UserForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '', email: '', password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement)?.value;
        const name = (e.target as HTMLInputElement)?.name;

        setFormData((prevState) => {
            return {
                ...prevState, [name]: value,
            }
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ formData }),
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!res.ok) {
            const response = await res.json();
            setErrorMessage(response.message);
        } else {
            router.refresh();
            router.push('/');
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                method="post"
                className="flex flex-col gap-3 w-1/2"
            >
                <h1>Create new user</h1>
                <label htmlFor="name">Full name</label>
                <input type="text"
                    id="name" name="name"
                    onChange={handleChange} value={formData.name}
                    className="m-2 bg-slate400 rounded"
                    required />
                <label htmlFor="name">Email</label>
                <input type="text"
                    id="email" name="email"
                    onChange={handleChange} value={formData.email}
                    className="m-2 bg-slate400 rounded"
                    required />
                <label htmlFor="name">Password</label>
                <input type="password"
                    id="password" name="password"
                    onChange={handleChange} value={formData.password}
                    className="m-2 bg-slate400 rounded"
                    required />
                <input type="submit" value="Create User" className="bg-blue-300 hover:bg-blue-100" />
            </form>
            <p className="text-red-500">{errorMessage}</p>
        </>
    )
}