"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Flag } from "lucide-react";

export default function ReportIssuePage() {
    // const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const [form, setForm] = useState({ subject: "", description: "" });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.subject || !form.description) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`/api/reports`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message);

            toast.success("Report submitted! Admin will review it soon.");
            setForm({ subject: "", description: "" });
        } catch (err) {
            toast.error(err.message || "Failed to submit report.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="mx-auto w-full max-w-2xl px-6 py-12">
            <h1 className="flex items-center gap-2 text-2xl font-semibold text-base-content">
                <Flag className="text-primary" size={24} />
                Report an Issue
            </h1>
            <p className="mt-1 text-sm text-neutral-content">
                Facing a problem with the platform or a campaign? Let the admin know.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-5 rounded-2xl border border-base-300 bg-base-200 p-8"
            >
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Subject</span>
                    </label>
                    <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="e.g. Withdrawal not processed"
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
                        placeholder="Describe the issue in detail..."
                        className="textarea textarea-bordered w-full"
                        rows={5}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary mt-2 rounded-full"
                >
                    {loading ? "Submitting..." : "Submit Report"}
                </button>
            </form>
        </main>
    );
}