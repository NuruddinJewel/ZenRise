"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Plus, Calendar } from "lucide-react";
import Image from "next/image";

const STATUS_STYLES = {
    pending: "badge-warning",
    approved: "badge-success",
    rejected: "badge-error",
};

export default function MyCampaignsPage() {
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (sessionPending || !session?.user?.id) return;

        async function fetchMyCampaigns() {
            try {
                const res = await fetch(
                    // `${process.env.NEXT_PUBLIC_API_URL}/api/campaigns?creatorId=${session.user.id}`,
                    `/api/campaigns?creatorId=${session.user.id}`,
                    { credentials: "include" }
                );
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setCampaigns(data);
            } catch (err) {
                console.error("Error fetching campaigns:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchMyCampaigns();
    }, [sessionPending, session]);

    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-base-content">
                        My Campaigns
                    </h1>
                    <p className="mt-1 text-sm text-neutral-content">
                        Track the status of campaigns {"you've"} created.
                    </p>
                </div>
                <Link href="/dashboard/creator/add-campaign" className="btn btn-primary rounded-full gap-2">
                    <Plus size={16} />
                    Add Campaign
                </Link>
            </div>

            {(loading || sessionPending) && (
                <div className="mt-10 flex flex-col gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-28 animate-pulse rounded-2xl bg-base-300" />
                    ))}
                </div>
            )}

            {!loading && error && (
                <p className="mt-10 text-center text-sm text-error">
                    Couldn&apos;t load your campaigns. Please try again later.
                </p>
            )}

            {!loading && !error && campaigns.length === 0 && (
                <div className="mt-16 flex flex-col items-center text-center">
                    <p className="text-base-content">You haven&apos;t created any campaigns yet.</p>
                    <Link href="/dashboard/creator/add-campaign" className="btn btn-primary mt-4 rounded-full">
                        Create your first campaign
                    </Link>
                </div>
            )}

            {!loading && !error && campaigns.length > 0 && (
                <div className="mt-8 flex flex-col gap-4">
                    {campaigns.map((c) => {
                        const progress = Math.min(100, Math.round((c.raisedCredits / c.goalCredits) * 100));
                        return (
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
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium text-base-content">{c.title}</h3>
                                        <span className={`badge badge-sm ${STATUS_STYLES[c.status] || "badge-neutral"}`}>
                                            {c.status}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex items-center gap-2 text-xs text-neutral-content">
                                        <Calendar size={13} />
                                        {c.deadline
                                            ? new Date(c.deadline).toLocaleDateString()
                                            : "No deadline"}
                                    </div>

                                    <div className="mt-3">
                                        <div className="flex justify-between text-xs text-neutral-content">
                                            <span>{c.raisedCredits} / {c.goalCredits} credits</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <progress
                                            className="progress progress-primary mt-1 w-full"
                                            value={c.raisedCredits}
                                            max={c.goalCredits}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
}