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
    const [githubLoading, setGithubLoading] = useState(false);
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

    //Github Login
    async function handleGithubSignIn() {
        setGithubLoading(true);
        await authClient.signIn.social({
            provider: "github",
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

                {/* Github Login */}
                <button
                    type="button"
                    onClick={handleGithubSignIn}
                    disabled={githubLoading}
                    className="btn btn-outline w-full rounded-full gap-2 mt-3"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.298 24 12c0-6.63-5.373-12-12-12z" />
                    </svg>
                    {githubLoading ? "Redirecting..." : "Join as Developer"}
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