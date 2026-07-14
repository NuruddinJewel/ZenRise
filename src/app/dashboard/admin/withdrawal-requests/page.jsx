"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Wallet, Check, X, Loader2 } from "lucide-react";

export default function AdminWithdrawalRequestsPage() {
    // const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoadingId, setActionLoadingId] = useState(null);

    async function fetchPendingWithdrawals() {
        try {
            // const res = await fetch(`${backendUrl}/api/withdrawals?status=pending`, {
            const res = await fetch(`/api/withdrawals?status=pending`, {
                // credentials: "include",
            });
            const data = await res.json();

            if (data.success) {
                setWithdrawals(data.data);
            }
        } catch (err) {
            console.error("Error fetching withdrawals:", err);
            toast.error("Failed to load withdrawal requests.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPendingWithdrawals();
    }, []);

    async function handleStatusUpdate(id, status) {
        setActionLoadingId(id);
        try {
            const res = await fetch(`/api/withdrawals/${id}/status`, {
                method: "PATCH",
                // credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Failed to update status");
            }

            toast.success(`Withdrawal ${status}!`);
            setWithdrawals((prev) => prev.filter((w) => w._id !== id));
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
        <main className="mx-auto w-full max-w-5xl px-6 py-12">
            <h1 className="flex items-center gap-2 text-2xl font-semibold text-base-content">
                <Wallet className="text-primary" size={26} />
                Withdrawal Requests
            </h1>
            <p className="mt-1 text-sm text-neutral-content">
                Review and approve pending payout requests from creators.
            </p>

            {withdrawals.length === 0 && (
                <p className="mt-16 text-center text-sm text-neutral-content">
                    No pending withdrawal requests right now. 🎉
                </p>
            )}

            {withdrawals.length > 0 && (
                <div className="mt-8 flex flex-col gap-4">
                    {withdrawals.map((w) => (
                        <div
                            key={w._id}
                            className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-200 p-6 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <p className="text-lg font-semibold text-primary">
                                    {w.amount} credits
                                    <span className="ml-2 text-sm font-normal text-neutral-content">
                                        (${(w.amount / 20).toFixed(2)})
                                    </span>
                                </p>
                                <div className="mt-2 flex flex-wrap gap-4 text-sm text-neutral-content">
                                    <span className="badge badge-ghost">{w.paymentMethod}</span>
                                    <span>{w.accountDetails}</span>
                                </div>
                                <p className="mt-2 text-xs text-neutral-content">
                                    Requested on {new Date(w.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleStatusUpdate(w._id, "approved")}
                                    disabled={actionLoadingId === w._id}
                                    className="btn btn-success btn-sm rounded-full gap-1"
                                >
                                    <Check size={15} />
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(w._id, "rejected")}
                                    disabled={actionLoadingId === w._id}
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