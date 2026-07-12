"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "supporter",
    });
    const [loading, setLoading] = useState(false);
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
            return;
        }

        router.push("/");
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
                            placeholder="Rakib Hasan"
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

                    {error && (
                        <p className="text-sm text-error">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary mt-2 rounded-full"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>

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