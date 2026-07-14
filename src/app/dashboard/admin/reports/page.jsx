"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Flag, Check, X, Loader2 } from "lucide-react";

export default function AdminReportsPage() {
    // const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoadingId, setActionLoadingId] = useState(null);

    async function fetchReports() {
        try {
            const res = await fetch(`/api/reports?status=pending`, {
                // credentials: "include",
            });
            const data = await res.json();
            if (data.success) setReports(data.data);
        } catch (err) {
            console.error("Error fetching reports:", err);
            toast.error("Failed to load reports.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchReports();
    }, []);

    async function handleStatusUpdate(id, status) {
        setActionLoadingId(id);
        try {
            const res = await fetch(`/api/reports/${id}/status`, {
                method: "PATCH",
                // credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message);

            toast.success(`Report ${status}!`);
            setReports((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            toast.error(err.message || "Something went wrong.");
        } finally {
            setActionLoadingId(null);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <main className="mx-auto w-full max-w-4xl px-6 py-12">
            <h1 className="flex items-center gap-2 text-2xl font-semibold text-base-content">
                <Flag className="text-primary" size={26} />
                Reports
            </h1>
            <p className="mt-1 text-sm text-neutral-content">
                Issues reported by creators awaiting review.
            </p>

            {reports.length === 0 && (
                <p className="mt-16 text-center text-sm text-neutral-content">
                    No pending reports. 🎉
                </p>
            )}

            {reports.length > 0 && (
                <div className="mt-8 flex flex-col gap-4">
                    {reports.map((r) => (
                        <div key={r._id} className="rounded-2xl border border-base-300 bg-base-200 p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="font-medium text-base-content">{r.subject}</p>
                                    <p className="mt-2 text-sm text-neutral-content">{r.description}</p>
                                    <p className="mt-3 text-xs text-neutral-content">
                                        Reported on {new Date(r.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex shrink-0 gap-2">
                                    <button
                                        onClick={() => handleStatusUpdate(r._id, "resolved")}
                                        disabled={actionLoadingId === r._id}
                                        className="btn btn-success btn-sm rounded-full gap-1"
                                    >
                                        <Check size={15} />
                                        Resolve
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(r._id, "dismissed")}
                                        disabled={actionLoadingId === r._id}
                                        className="btn btn-ghost btn-sm rounded-full gap-1"
                                    >
                                        <X size={15} />
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}