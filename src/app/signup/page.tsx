'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isCHA, setIsCHA] = useState<boolean>(false);
    const router = useRouter();
    
    useEffect(() => {
        const fetchCookie = async () => {
            const response = await fetch("/api/cookie");
            const data = await response.json();
            console.log("Cookie from API:", data.success);
            if(data.success){
                router.push('/dashboard');
            }
        };
        fetchCookie();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                cha: isCHA
            }),
        });

        const data = await response.json();
        console.log(data);
        if(data.success){
            router.push('/register');
        } else {
            toast.error("Failed to register");
        }
    };

    const handleMSMEClick = () => {
        setIsCHA(false);
    };

    const handleCHAClick = () => {
        setIsCHA(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300">
                <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <button
                            type="submit"
                            onClick={handleMSMEClick}
                            className="w-full bg-black hover:ring-2 hover:ring-purple-700/70 hover:scale-105 cursor-pointer text-white py-2 rounded-md font-semibold transition-all duration-300"
                        >
                            Register as MSME 🏭
                        </button>
                        <button
                            type="submit"
                            onClick={handleCHAClick}
                            className="w-full bg-black hover:ring-2 hover:ring-purple-700/70 hover:scale-105 cursor-pointer text-white py-2 rounded-md font-semibold transition-all duration-300"
                        >
                            Register as CHA 🤵
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
