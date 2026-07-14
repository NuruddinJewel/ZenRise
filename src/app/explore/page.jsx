"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Compass, Coins, ArrowRight, Loader2, X } from "lucide-react";

function ExploreContent() {
    const searchParams = useSearchParams();
    const categoryFilter = searchParams.get("category");

    const [campaigns, setCampaigns] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch(
                    // `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/categories`
                    `/api/categories`
                );
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        async function fetchCampaigns() {
            setIsLoading(true);
            // try {
            //     const url = new URL(
            //         // `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/campaigns`
            //         `/api/campaigns`
            //     );
            //     url.searchParams.set("status", "approved");
            //     if (categoryFilter) url.searchParams.set("category", categoryFilter);

            //     const res = await fetch(url.toString());
            //     const data = await res.json();

            //     if (data.success && data.data) {
            //         setCampaigns(data.data);
            //     } else if (Array.isArray(data)) {
            //         setCampaigns(data);
            //     }
            // } catch (err) {
            //     console.error("Failed to fetch campaigns for exploration:", err);
            // } finally {
            //     setIsLoading(false);
            // }
            try {

                let fetchUrl = `/api/campaigns?status=approved`;

                if (categoryFilter) {
                    fetchUrl += `&category=${encodeURIComponent(categoryFilter)}`;
                }

                const res = await fetch(fetchUrl);
                const data = await res.json();

                if (data.success && data.data) {
                    setCampaigns(data.data);
                } else if (Array.isArray(data)) {
                    setCampaigns(data);
                }
            } catch (err) {
                console.error("Failed to fetch campaigns for exploration:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCampaigns();
    }, [categoryFilter]);

    const activeCategoryName =
        categories.find((c) => c.slug === categoryFilter)?.name || categoryFilter;

    const filteredCampaigns = campaigns.filter((campaign) => {
        const title = campaign.title || "";
        const category = campaign.category || "";
        const query = searchQuery.toLowerCase();

        return (
            title.toLowerCase().includes(query) || category.toLowerCase().includes(query)
        );
    });

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-base-100">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-sm text-base-content/60">Loading exciting campaigns...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header / Search */}
                <div className="mb-6 text-center md:text-left md:flex md:items-center md:justify-between border-b border-base-300 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl flex items-center justify-center md:justify-start gap-2">
                            <Compass className="text-primary" size={32} />
                            Explore Campaigns
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-base-content/60">
                            {categoryFilter
                                ? `Showing campaigns in "${activeCategoryName}"`
                                : "Discover innovative projects, back passionate creators, and drive real-world impact."}
                        </p>
                    </div>

                    <div className="mt-4 md:mt-0 relative w-full max-w-md mx-auto md:mx-0">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input input-bordered w-full pl-10 bg-base-200 focus:border-primary focus:outline-none rounded-full text-sm"
                        />
                    </div>
                </div>

                {/* Category filter chips */}
                <div className="mb-10 flex flex-wrap items-center gap-2">
                    <Link
                        href="/explore"
                        className={`btn btn-sm rounded-full normal-case ${!categoryFilter ? "btn-primary" : "btn-outline"
                            }`}
                    >
                        All
                    </Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat._id}
                            href={`/explore?category=${cat.slug}`}
                            className={`btn btn-sm rounded-full normal-case ${categoryFilter === cat.slug ? "btn-primary" : "btn-outline"
                                }`}
                        >
                            {cat.name}
                        </Link>
                    ))}

                    {categoryFilter && (
                        <Link
                            href="/explore"
                            className="ml-2 flex items-center gap-1 text-sm text-base-content/60 hover:text-primary"
                        >
                            <X size={14} />
                            Clear
                        </Link>
                    )}
                </div>

                {/* Grid */}
                {filteredCampaigns.length === 0 ? (
                    <div className="flex flex-col items-center justify-center border border-dashed border-base-300 rounded-box p-16 bg-base-200/30 text-center">
                        <p className="text-lg font-medium text-base-content/80">
                            No campaigns found{categoryFilter ? ` in "${activeCategoryName}"` : ""}
                        </p>
                        <p className="text-sm text-base-content/50 mt-1">
                            Try refining your search keyword or check back later.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredCampaigns.map((campaign) => {
                            const campaignId = campaign._id?.$oid || campaign._id;

                            const raised = campaign.raisedCredits || 0;
                            const goal = campaign.goalCredits || 1;
                            const progressPercentage = Math.min(Math.round((raised / goal) * 100), 100);

                            return (
                                <div
                                    key={campaignId}
                                    className="card card-compact bg-base-200 border border-base-300 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 duration-300 overflow-hidden"
                                >
                                    <figure className="relative h-48 w-full bg-base-300">
                                        {campaign.coverImage ? (
                                            <Image
                                                src={campaign.coverImage}
                                                alt={campaign.title || "Campaign image"}
                                                fill
                                                className="object-cover"
                                                sizes="(max-w-7xl) 33vw"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-base-300 text-sm text-base-content/40">
                                                No Banner Uploaded
                                            </div>
                                        )}
                                        {campaign.category && (
                                            <span className="absolute top-3 left-3 badge badge-primary font-semibold text-xs py-2 uppercase tracking-wider">
                                                {campaign.category}
                                            </span>
                                        )}
                                    </figure>

                                    <div className="card-body p-5">
                                        <h2 className="card-title text-base sm:text-lg font-bold text-base-content line-clamp-1">
                                            {campaign.title}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-base-content/60 line-clamp-2 min-h-[40px]">
                                            {campaign.description}
                                        </p>

                                        <div className="mt-4 space-y-1.5">
                                            <div className="flex justify-between text-xs font-medium">
                                                <span className="text-primary font-semibold">
                                                    {progressPercentage}% Raised
                                                </span>
                                                <span className="text-base-content/50">{goal} Goal</span>
                                            </div>
                                            <div className="w-full bg-base-300 h-2.5 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-primary h-full transition-all duration-500 rounded-full"
                                                    style={{ width: `${progressPercentage}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="card-actions justify-between items-center mt-5 pt-3 border-t border-base-300/60">
                                            <div className="flex items-center gap-1 text-sm font-bold text-secondary">
                                                <Coins size={16} />
                                                <span>{raised}</span>
                                                <span className="text-xs text-base-content/50 font-normal">Credits</span>
                                            </div>

                                            <Link
                                                href={`/explore/${campaignId}`}
                                                className="btn btn-primary btn-sm rounded-full text-xs font-semibold normal-case gap-1 group shadow-md shadow-primary/10"
                                            >
                                                View Project
                                                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ExploreCampaignsPage() {
    return (
        <Suspense fallback={null}>
            <ExploreContent />
        </Suspense>
    );
}