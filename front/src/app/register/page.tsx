"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import { signup } from '@/service/supabase/auth/signup';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    const handleRegister = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // authorization: `Bearer ${localStorage.getItem("token")}`, // トークンを送信する場合。不要か？
                },
                body: JSON.stringify({ username, email, password }),
            });

            await signup(email, password, username);
            toast.success("新規登録完了");

            if (response.ok) {
                router.push("/ranking"); // 登録成功時、/rankingページに遷移
                toast.success("Registration successful");
            } else {
                console.error("Registration failed");
                toast.error("Registration failed");
            }
        } catch (error) {
            console.error("An error occurred", error);
            toast.error("An error occurred");
        }
    };

    return (
        <div>
            <Toaster />
            <form onSubmit={handleRegister}>
                <h1>新規登録</h1>
                <input
                    type="text"
                    placeholder="名前"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレス"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワード"
                    required
                />
                <button type="submit">Register</button>
            </form>
            <Link href="/">ホーム</Link>
        </div>
    );
};

export default Register;
