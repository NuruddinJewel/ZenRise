"use client";

import { useEffect, useState } from "react";
import { Wallet, Plus, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import CreatorWithdrawalForm from "@/components/dashboard/CreatorWithdrawalForm";
import { authClient } from "@/lib/auth-client";

export default function CreatorWithdrawalsPage() {
    const { data: session, isPending: sessionPending } = authClient.useSession();
    // const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const [withdrawals, setWithdrawals] = useState([]);
    const [stats, setStats] = useState({ earned: 0, pending: 0, withdrawn: 0, available: 0 });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchWithdrawalData = async () => {
        if (!session?.user?.id) return;
        const creatorId = session.user.id;

        try {
            const historyRes = await fetch(
                `/api/withdrawals?creatorId=${creatorId}`,
                { credentials: "include" }
            );
            const historyData = await historyRes.json();

            const campaignsRes = await fetch(
                `/api/campaigns?creatorId=${creatorId}&status=approved`
            );
            const campaigns = await campaignsRes.json();

            if (historyData.success) {
                const historyList = historyData.data || [];

                const totalEarned = campaigns.reduce((sum, c) => sum + (c.raisedCredits || 0), 0);
                const totalPending = historyList
                    .filter((w) => w.status === "pending")
                    .reduce((sum, w) => sum + w.amount, 0);
                const totalWithdrawn = historyList
                    .filter((w) => w.status === "approved")
                    .reduce((sum, w) => sum + w.amount, 0);
                const availableBalance = totalEarned - (totalPending + totalWithdrawn);

                setWithdrawals(historyList);
                setStats({
                    earned: totalEarned,
                    pending: totalPending,
                    withdrawn: totalWithdrawn,
                    available: Math.max(0, availableBalance),
                });
            }
        } catch (err) {
            console.error("Error connecting to backend API:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!sessionPending) {
            fetchWithdrawalData();
        }
    }, [sessionPending, session]);

    if (loading || sessionPending) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-base-100 min-h-screen">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-base-300 pb-6 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-base-content sm:text-3xl flex items-center gap-2">
                        <Wallet className="text-primary" size={28} />
                        Withdrawals Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-base-content/60">Manage your payout requests securely.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary rounded-xl normal-case gap-2 text-black">
                    <Plus size={18} /> Withdraw Funds
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                <div className="card bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-5 rounded-2xl shadow-sm">
                    <span className="text-xs font-semibold uppercase text-primary">Available Balance</span>
                    <p className="text-2xl font-black mt-2">{stats.available} <span className="text-xs font-normal opacity-60">Credits</span></p>
                </div>
                <div className="card bg-base-200 border border-base-300 p-5 rounded-2xl shadow-sm">
                    <span className="text-xs font-semibold uppercase opacity-60">Total Earnings</span>
                    <p className="text-2xl font-black mt-2">{stats.earned} <span className="text-xs font-normal opacity-60">Credits</span></p>
                </div>
                <div className="card bg-base-200 border border-base-300 p-5 rounded-2xl shadow-sm">
                    <span className="text-xs font-semibold uppercase opacity-60">Pending Payouts</span>
                    <p className="text-2xl font-black mt-2">{stats.pending} <span className="text-xs font-normal opacity-60">Credits</span></p>
                </div>
                <div className="card bg-base-200 border border-base-300 p-5 rounded-2xl shadow-sm">
                    <span className="text-xs font-semibold uppercase opacity-60">Successfully Withdrawn</span>
                    <p className="text-2xl font-black mt-2">{stats.withdrawn} <span className="text-xs font-normal opacity-60">Credits</span></p>
                </div>
            </div>

            <div className="border border-base-300 rounded-2xl overflow-hidden bg-base-200/40">
                <div className="px-6 py-4 border-b border-base-300 bg-base-200/80">
                    <h2 className="text-lg font-bold">Payout Request History</h2>
                </div>

                {withdrawals.length === 0 ? (
                    <div className="p-12 text-center text-sm opacity-50">No withdrawal history available.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-sm">
                            <thead>
                                <tr>
                                    <th>Requested Date</th>
                                    <th>Method</th>
                                    <th>Account Details</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawals.map((w) => (
                                    <tr key={w._id}>
                                        <td>{new Date(w.createdAt).toLocaleDateString("en-US")}</td>
                                        <td><span className="badge badge-ghost rounded-lg">{w.paymentMethod}</span></td>
                                        <td className="max-w-xs truncate">{w.accountDetails}</td>
                                        <td className="font-bold">{w.amount} Credits</td>
                                        <td>
                                            {w.status === "pending" && <span className="badge badge-warning gap-1 py-3 px-3 rounded-full"><Clock size={12} /> Pending</span>}
                                            {w.status === "approved" && <span className="badge badge-success gap-1 py-3 px-3 rounded-full"><CheckCircle2 size={12} /> Approved</span>}
                                            {w.status === "rejected" && <span className="badge badge-error gap-1 py-3 px-3 rounded-full"><XCircle size={12} /> Rejected</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <CreatorWithdrawalForm
                    creatorId={session.user.id}
                    availableBalance={stats.available}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={fetchWithdrawalData}
                />
            )}
        </div>
    );
}