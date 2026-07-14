"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Coins, Calendar, ArrowUpRight, FolderOpen } from "lucide-react";

export default function SupporterContributionsPage() {
    const { data: session, isPending: isAuthLoading } = authClient.useSession();

    const [contributions, setContributions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchHistory() {
            if (!session?.user?.id && !session?.user?._id) return;

            const supporterId = session.user.id || session.user._id;
            // try {
            //     const res = await fetch(
            //         `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contributions?supporterId=${supporterId}`
            //     );
            //     const data = await res.json();
            //     if (data.success) {
            //         setContributions(data.data);
            //     }
            // } catch (err) {
            //     console.error("Failed to fetch contribution history:", err);
            // } finally {
            //     setIsLoading(false);
            // }
            try {
                const res = await fetch(`/api/contributions?supporterId=${supporterId}`);

                const data = await res.json();
                if (data.success) {
                    setContributions(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch contribution history:", err);
            } finally {
                setIsLoading(false);
            }
        }

        if (!isAuthLoading) {
            fetchHistory();
        }
    }, [session, isAuthLoading]);

    if (isAuthLoading || isLoading) {
        return (
            <div className="p-6 max-w-5xl mx-auto space-y-4">
                <div className="h-8 w-48 bg-base-300 animate-pulse rounded" />
                <div className="h-64 w-full bg-base-200 animate-pulse rounded-box" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto bg-base-100 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-base-content tracking-tight">Contribution History</h1>
                    <p className="text-sm text-base-content/60 mt-1">Track all your funded campaigns and credit usage.</p>
                </div>
                <div className="stats bg-base-200 border border-base-300 shadow-sm rounded-box px-4 py-2">
                    <div className="stat p-0 flex items-center gap-3">
                        <div className="p-2 rounded-full bg-secondary/10 text-secondary">
                            <Coins size={20} />
                        </div>
                        <div>
                            <div className="stat-title text-xs text-base-content/60">Total Funded</div>
                            <div className="stat-value text-base text-base-content font-bold">
                                {contributions.reduce((acc, curr) => acc + curr.amount, 0)} Credits
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {contributions.length === 0 ? (
                <div className="flex flex-col items-center justify-center border border-dashed border-base-300 rounded-box p-12 bg-base-200/40 text-center">
                    <div className="p-4 rounded-full bg-base-300 text-base-content/40 mb-4">
                        <FolderOpen size={40} />
                    </div>
                    <h3 className="text-lg font-semibold text-base-content">No Contributions Yet</h3>
                    <p className="text-sm text-base-content/60 mt-1 max-w-xs">
                        You haven&apos;t backed any campaigns yet. Explore ongoing campaigns to make your first contribution.
                    </p>
                    <Link href="/explore" className="btn btn-primary btn-sm rounded-full mt-5 font-semibold px-6">
                        Explore Campaigns
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto w-full rounded-box border border-base-300 bg-base-200 shadow-xl">
                    <table className="table table-zebra w-full text-left">
                        <thead className="bg-base-300/60 text-base-content/80 text-sm">
                            <tr>
                                <th className="py-4">Campaign</th>
                                <th className="py-4">Amount</th>
                                <th className="py-4">Date</th>
                                <th className="py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-base-content/90">
                            {contributions.map((item) => {
                                const campaign = item.campaignDetails;
                                return (
                                    <tr key={item._id} className="hover:bg-base-100/40 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar relative w-12 h-12 rounded-lg overflow-hidden border border-base-300 bg-base-300 flex-shrink-0">
                                                    {campaign?.coverImage ? (
                                                        <Image
                                                            src={campaign.coverImage}
                                                            alt={campaign.title || "Campaign"}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-base-content/40">
                                                            No Pic
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="max-w-[180px] sm:max-w-xs md:max-w-sm truncate">
                                                    <div className="font-bold text-sm sm:text-base truncate">
                                                        {campaign?.title || "Deleted Campaign"}
                                                    </div>
                                                    <div className="text-xs text-base-content/50 truncate capitalize">
                                                        Goal: {campaign?.goalCredits || 0} Credits
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 font-semibold">
                                            <span className="text-primary font-bold">+{item.amount}</span>
                                            <span className="text-xs text-base-content/50 ml-1">Credits</span>
                                        </td>

                                        <td className="py-4 text-xs sm:text-sm text-base-content/70">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-base-content/40" />
                                                {new Date(item.createdAt).toLocaleDateString(undefined, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </td>

                                        <td className="py-4 text-right">
                                            <Link
                                                href={`/explore/${item.campaignId}`}
                                                className="btn btn-ghost btn-xs sm:btn-sm rounded-full text-secondary hover:bg-secondary/10 gap-1 font-medium normal-case"
                                            >
                                                View
                                                <ArrowUpRight size={14} />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}