"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, FolderKanban, Wallet, Flag, Loader2 } from "lucide-react";

export default function AdminDashboardHome() {
    // const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const [stats, setStats] = useState({ users: 0, pendingCampaigns: 0, pendingWithdrawals: 0, pendingReports: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [usersRes, campaignsRes, withdrawalsRes, reportsRes] = await Promise.all([
                    // fetch(`${backendUrl}/api/users`, { credentials: "include" }),
                    fetch(`/api/users`),
                    fetch(`/api/campaigns?status=pending`),
                    fetch(`/api/withdrawals?status=pending`,),
                    fetch(`/api/reports?status=pending`,),
                ]);

                const users = await usersRes.json();
                const campaigns = await campaignsRes.json();
                const withdrawals = await withdrawalsRes.json();
                const reports = await reportsRes.json();

                setStats({
                    users: users.data?.length || 0,
                    pendingCampaigns: campaigns.length || 0,
                    pendingWithdrawals: withdrawals.data?.length || 0,
                    pendingReports: reports.data?.length || 0,
                });
            } catch (err) {
                console.error("Error fetching admin stats:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
        // }, [backendUrl]);
    },);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    const cards = [
        {
            label: "Total Users",
            value: stats.users,
            icon: Users,
            href: "/dashboard/admin/manage-users",
            color: "primary",
        },
        {
            label: "Pending Campaigns",
            value: stats.pendingCampaigns,
            icon: FolderKanban,
            href: "/dashboard/admin/manage-campaigns",
            color: "secondary",
        },
        {
            label: "Pending Withdrawals",
            value: stats.pendingWithdrawals,
            icon: Wallet,
            href: "/dashboard/admin/withdrawal-requests",
            color: "accent",
        },
        {
            label: "Pending Reports",
            value: stats.pendingReports,
            icon: Flag,
            href: "/dashboard/admin/reports",
            color: "error",
        },
    ];

    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-12">
            <h1 className="text-2xl font-semibold text-base-content">Admin Overview</h1>
            <p className="mt-1 text-sm text-neutral-content">
                Monitor and manage platform activity from here.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map(({ label, value, icon: Icon, href, color }) => (
                    <Link
                        key={label}
                        href={href}
                        className="rounded-2xl border border-base-300 bg-base-200 p-6 transition-colors hover:border-primary"
                    >
                        <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-${color}/10 text-${color}`}>
                            <Icon size={20} />
                        </span>
                        <p className="mt-4 text-2xl font-bold text-base-content">{value}</p>
                        <p className="text-sm text-neutral-content">{label}</p>
                    </Link>
                ))}
            </div>
        </main>
    );
}