"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { Check, X } from "lucide-react";

export default function ManageCampaignsPage() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoadingId, setActionLoadingId] = useState(null);

    async function fetchPendingCampaigns() {
        try {
            const res = await fetch(
                // `${process.env.NEXT_PUBLIC_API_URL}/api/campaigns?status=pending`,
                `/api/campaigns?status=pending`,
                // { credentials: "include" }

            );
            const data = await res.json();
            setCampaigns(data);
        } catch (err) {
            console.error("Error fetching campaigns:", err);
            toast.error("Failed to load campaigns.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPendingCampaigns();
    }, []);

    async function handleStatusUpdate(id, status) {
        setActionLoadingId(id);
        try {
            const res = await fetch(
                // `${process.env.NEXT_PUBLIC_API_URL}/api/campaigns/${id}/status`,
                `/api/campaigns/${id}/status`,
                {
                    method: "PATCH",
                    // credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status }),
                }
            );

            if (!res.ok) throw new Error("Failed to update status");

            toast.success(`Campaign ${status}!`);
            setCampaigns((prev) => prev.filter((c) => c._id !== id));
        } catch (err) {
            toast.error(err.message || "Something went wrong.");
        } finally {
            setActionLoadingId(null);
        }
    }

    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-12">
            <h1 className="text-2xl font-semibold text-base-content">
                Manage Campaigns
            </h1>
            <p className="mt-1 text-sm text-neutral-content">
                Review and approve pending campaigns before they go live.
            </p>

            {loading && (
                <div className="mt-10 flex flex-col gap-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="h-28 animate-pulse rounded-2xl bg-base-300" />
                    ))}
                </div>
            )}

            {!loading && campaigns.length === 0 && (
                <p className="mt-16 text-center text-sm text-neutral-content">
                    No pending campaigns right now. 🎉
                </p>
            )}

            {!loading && campaigns.length > 0 && (
                <div className="mt-8 flex flex-col gap-4">
                    {campaigns.map((c) => (
                        <div
                            key={c._id}
                            className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-200 p-6 sm:flex-row sm:items-center"
                        >
                            {c.coverImage && (
                                <Image
                                    src={c.coverImage}
                                    alt={c.title}
                                    width={144}
                                    height={96}
                                    className="h-24 w-full rounded-xl object-cover sm:w-36"
                                />
                            )}

                            <div className="flex-1">
                                <h3 className="font-medium text-base-content">{c.title}</h3>
                                <p className="mt-1 line-clamp-2 text-sm text-neutral-content">
                                    {c.description}
                                </p>
                                <div className="mt-2 flex gap-4 text-xs text-neutral-content">
                                    <span>Category: {c.category}</span>
                                    <span>Goal: {c.goalCredits} credits</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleStatusUpdate(c._id, "approved")}
                                    disabled={actionLoadingId === c._id}
                                    className="btn btn-success btn-sm rounded-full gap-1"
                                >
                                    <Check size={15} />
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(c._id, "rejected")}
                                    disabled={actionLoadingId === c._id}
                                    className="btn btn-error btn-sm rounded-full gap-1"
                                >
                                    <X size={15} />
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}