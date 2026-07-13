"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Book,
    HeartPulse,
    Leaf,
    Cpu,
    Palette,
    Users,
    LifeBuoy,
    PawPrint,
    Sparkles,
} from "lucide-react";

const ICON_MAP = {
    book: Book,
    "heart-pulse": HeartPulse,
    leaf: Leaf,
    cpu: Cpu,
    palette: Palette,
    users: Users,
    "life-buoy": LifeBuoy,
    "paw-print": PawPrint,
};

export default function ExploreByCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-20">
            <div className="text-center">
                <span className="badge badge-outline badge-accent mb-3">
                    Browse Campaigns
                </span>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Explore by Category
                </h2>
                <p className="mt-3 text-base text-neutral-content">
                    Find campaigns that match causes you care about.
                </p>
            </div>

            {loading && (
                <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-28 animate-pulse rounded-2xl bg-base-300"
                        />
                    ))}
                </div>
            )}

            {!loading && error && (
                <p className="mt-14 text-center text-sm text-error">
                    Couldn&apos;t load categories. Please try again later.
                </p>
            )}

            {!loading && !error && (
                <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {categories.map((cat) => {
                        const Icon = ICON_MAP[cat.icon] || Sparkles;
                        return (
                            <Link
                                key={cat._id}
                                href={`/explore?category=${cat.slug}`}
                                className="group flex flex-col items-center gap-3 rounded-2xl border border-base-300 bg-base-200 p-6 text-center transition-colors hover:border-primary"
                            >
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-content">
                                    <Icon size={22} />
                                </span>
                                <span className="text-sm font-medium text-base-content">
                                    {cat.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </section>
    );
}