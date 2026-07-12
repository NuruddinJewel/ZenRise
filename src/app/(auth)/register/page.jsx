"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "supporter",
    });
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { data, error } = await authClient.signUp.email({
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
        });

        setLoading(false);

        if (error) {
            setError(error.message || "Something went wrong. Try again.");
            toast.error(error.message || "Registration failed. Try again.");
            return;
        }

        toast.success(`Welcome, ${form.name}! Account created successfully.`);
        router.push("/");
    }

    async function handleGoogleSignIn() {
        setGoogleLoading(true);
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    }

    return (
        <main className="flex flex-1 items-center justify-center px-6 py-16">
            <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-200 p-8">
                <h1 className="text-2xl font-semibold text-base-content">
                    Create your account
                </h1>
                <p className="mt-2 text-sm text-neutral-content">
                    Join as a supporter or start raising funds as a creator.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Full name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="At least 8 characters"
                            className="input input-bordered w-full"
                            minLength={8}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">I want to join as</span>
                        </label>
                        <div className="flex gap-3">
                            <label className="flex-1 cursor-pointer rounded-xl border border-base-300 p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                                <input
                                    type="radio"
                                    name="role"
                                    value="supporter"
                                    checked={form.role === "supporter"}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <span className="text-sm font-medium">Supporter</span>
                            </label>
                            <label className="flex-1 cursor-pointer rounded-xl border border-base-300 p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                                <input
                                    type="radio"
                                    name="role"
                                    value="creator"
                                    checked={form.role === "creator"}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <span className="text-sm font-medium">Creator</span>
                            </label>
                        </div>
                    </div>

                    {error && <p className="text-sm text-error">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary mt-2 rounded-full"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-base-300" />
                    <span className="text-xs text-neutral-content">OR</span>
                    <div className="h-px flex-1 bg-base-300" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={googleLoading}
                    className="btn btn-outline w-full rounded-full gap-2"
                >
                    <svg width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.26 5.36-4.78 7.02l7.73 6c4.51-4.18 7.09-10.36 7.09-17.49z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                    {googleLoading ? "Redirecting..." : "Continue with Google"}
                </button>

                <p className="mt-6 text-center text-sm text-neutral-content">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary font-medium">
                        Log in
                    </a>
                </p>
            </div>
        </main>
    );
}