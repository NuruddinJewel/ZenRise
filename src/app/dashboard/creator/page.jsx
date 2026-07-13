"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
    PlusCircle,
    FolderKanban,
    Wallet,
    Receipt,
    Loader2,
    Flag,
} from "lucide-react";

const STATUS_STYLES = {
    pending: "badge-warning",
    approved: "badge-success",
    rejected: "badge-error",
};

export default function CreatorDashboardHome() {
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sessionPending || !session?.user?.id) return;

        async function fetchCampaigns() {
            try {
                const res = await fetch(
                    `${backendUrl}/api/campaigns?creatorId=${session.user.id}`,
                    { credentials: "include" }
                );
                const data = await res.json();
                setCampaigns(data);
            } catch (err) {
                console.error("Error fetching campaigns:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchCampaigns();
    }, [sessionPending, session, backendUrl]);

    if (sessionPending || loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    const totalCampaigns = campaigns.length;
    const approvedCampaigns = campaigns.filter((c) => c.status === "approved").length;
    const pendingCampaigns = campaigns.filter((c) => c.status === "pending").length;
    const totalRaised = campaigns.reduce((sum, c) => sum + (c.raisedCredits || 0), 0);

    const recentCampaigns = [...campaigns]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);

    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-base-content">
                        Welcome back, {session?.user?.name?.split(" ")[0] || "Creator"}!
                    </h1>
                    <p className="mt-1 text-sm text-neutral-content">
                        Here&apos;s how your campaigns are performing.
                    </p>
                </div>
                <Link
                    href="/dashboard/creator/add-campaign"
                    className="btn btn-primary rounded-full gap-2"
                >
                    <PlusCircle size={16} />
                    Add Campaign
                </Link>
            </div>

            {/* Stats */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
                    <span className="text-xs font-semibold uppercase text-primary">
                        Total Raised
                    </span>
                    <p className="mt-2 text-2xl font-bold text-base-content">
                        {totalRaised} <span className="text-xs font-normal text-neutral-content">credits</span>
                    </p>
                </div>
                <div className="rounded-2xl border border-base-300 bg-base-200 p-5">
                    <span className="text-xs font-semibold uppercase text-neutral-content">
                        Total Campaigns
                    </span>
                    <p className="mt-2 text-2xl font-bold text-base-content">{totalCampaigns}</p>
                </div>
                <div className="rounded-2xl border border-base-300 bg-base-200 p-5">
                    <span className="text-xs font-semibold uppercase text-neutral-content">
                        Approved
                    </span>
                    <p className="mt-2 text-2xl font-bold text-base-content">{approvedCampaigns}</p>
                </div>
                <div className="rounded-2xl border border-base-300 bg-base-200 p-5">
                    <span className="text-xs font-semibold uppercase text-neutral-content">
                        Pending Approval
                    </span>
                    <p className="mt-2 text-2xl font-bold text-base-content">{pendingCampaigns}</p>
                </div>
            </div>

            {/* Quick links */}
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
                <Link
                    href="/dashboard/creator/my-campaigns"
                    className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 p-5 transition-colors hover:border-primary"
                >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <FolderKanban size={20} />
                    </span>
                    <div>
                        <p className="font-medium text-base-content">My Campaigns</p>
                        <p className="text-xs text-neutral-content">View and manage</p>
                    </div>
                </Link>

                <Link
                    href="/dashboard/creator/withdrawals"
                    className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 p-5 transition-colors hover:border-primary"
                >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <Wallet size={20} />
                    </span>
                    <div>
                        <p className="font-medium text-base-content">Withdrawals</p>
                        <p className="text-xs text-neutral-content">Request a payout</p>
                    </div>
                </Link>

                <Link
                    href="/dashboard/creator/payment-history"
                    className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 p-5 transition-colors hover:border-primary"
                >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Receipt size={20} />
                    </span>
                    <div>
                        <p className="font-medium text-base-content">Payment History</p>
                        <p className="text-xs text-neutral-content">Track all transactions</p>
                    </div>
                </Link>
                {/* Report */}
                <Link
                    href="/dashboard/creator/report-issue"
                    className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 p-5 transition-colors hover:border-primary"
                >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-error/10 text-error">
                        <Flag size={20} />
                    </span>
                    <div>
                        <p className="font-medium text-base-content">Report an Issue</p>
                        <p className="text-xs text-neutral-content">Get help from admin</p>
                    </div>
                </Link>
            </div>

            {/* Recent campaigns */}
            <div className="mt-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-base-content">Recent Campaigns</h2>
                    <Link href="/dashboard/creator/my-campaigns" className="text-sm text-primary hover:underline">
                        View all
                    </Link>
                </div>

                {recentCampaigns.length === 0 ? (
                    <div className="mt-4 flex flex-col items-center rounded-2xl border border-base-300 bg-base-200 py-12 text-center">
                        <p className="text-sm text-neutral-content">You haven&apos;t created any campaigns yet.</p>
                        <Link href="/dashboard/creator/add-campaign" className="btn btn-primary btn-sm mt-4 rounded-full">
                            Create your first campaign
                        </Link>
                    </div>
                ) : (
                    <div className="mt-4 flex flex-col gap-3">
                        {recentCampaigns.map((c) => {
                            const progress = Math.min(100, Math.round((c.raisedCredits / c.goalCredits) * 100));
                            return (
                                <div
                                    key={c._id}
                                    className="flex items-center justify-between rounded-2xl border border-base-300 bg-base-200 p-5"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-base-content">{c.title}</p>
                                            <span className={`badge badge-sm ${STATUS_STYLES[c.status] || "badge-neutral"}`}>
                                                {c.status}
                                            </span>
                                        </div>
                                        <div className="mt-2 max-w-xs">
                                            <progress
                                                className="progress progress-primary w-full"
                                                value={c.raisedCredits}
                                                max={c.goalCredits}
                                            />
                                        </div>
                                    </div>
                                    <p className="ml-4 shrink-0 text-sm font-medium text-neutral-content">
                                        {progress}%
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}