"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function AddCampaignPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        goalCredits: "",
        coverImage: "",
        deadline: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
                const res = await fetch(`/api/categories`);
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        }
        fetchCategories();
    }, []);

    // Redirect if not logged in or not a creator
    useEffect(() => {
        if (!isPending && (!session || session.user.role !== "creator")) {
            toast.error("Only creators can add campaigns.");
            router.push("/");
        }
    }, [isPending, session, router]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.title || !form.description || !form.category || !form.goalCredits) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        try {
            // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/campaigns`, {
            const res = await fetch(`/api/campaigns`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to create campaign");
            }

            toast.success("Campaign submitted! Waiting for admin approval.");
            router.push("/dashboard/creator/my-campaigns");
        } catch (err) {
            toast.error(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    if (isPending) {
        return (
            <main className="flex flex-1 items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary" />
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-2xl px-6 py-12">
            <h1 className="text-2xl font-semibold text-base-content">
                Add New Campaign
            </h1>
            <p className="mt-2 text-sm text-neutral-content">
                Your campaign will be visible to supporters only after admin approval.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-5 rounded-2xl border border-base-300 bg-base-200 p-8"
            >
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Campaign Title</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. Clean Water for Rural Villages"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe your campaign, its goals, and how funds will be used..."
                        className="textarea textarea-bordered w-full"
                        rows={5}
                        required
                    />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat.slug}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Goal (Credits)</span>
                        </label>
                        <input
                            type="number"
                            name="goalCredits"
                            value={form.goalCredits}
                            onChange={handleChange}
                            placeholder="e.g. 5000"
                            min={200}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Cover Image URL</span>
                        <span className="label-text-alt text-neutral-content">optional</span>
                    </label>
                    <input
                        type="url"
                        name="coverImage"
                        value={form.coverImage}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Deadline</span>
                        <span className="label-text-alt text-neutral-content">optional</span>
                    </label>
                    <input
                        type="date"
                        name="deadline"
                        value={form.deadline}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary mt-2 rounded-full"
                >
                    {loading ? "Submitting..." : "Submit Campaign"}
                </button>
            </form>
        </main>
    );
}