"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Coins, Check } from "lucide-react";

const PACKAGES = [
    {
        id: "small",
        credits: 100,
        priceUsd: 10,
        tagline: "Perfect for trying it out",
    },
    {
        id: "medium",
        credits: 500,
        priceUsd: 50,
        tagline: "Most popular choice",
        highlight: true,
    },
    {
        id: "large",
        credits: 1000,
        priceUsd: 100,
        tagline: "For dedicated supporters",
    },
];

export default function PurchaseCreditPage() {
    const [loadingId, setLoadingId] = useState(null);

    async function handlePurchase(packageId) {
        setLoadingId(packageId);

        try {
            const res = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ packageId }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to start checkout");
            }

            window.location.assign(data.url);
        } catch (err) {
            toast.error(err.message || "Something went wrong.");
            setLoadingId(null);
        }
    }

    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-12">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-base-content">
                    Purchase Credits
                </h1>
                <p className="mt-2 text-sm text-neutral-content">
                    10 credits = $1 · Use credits to support any campaign
                </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
                {PACKAGES.map((pkg) => (
                    <div
                        key={pkg.id}
                        className={`relative flex flex-col rounded-2xl border p-8 ${pkg.highlight
                            ? "border-primary bg-primary/5"
                            : "border-base-300 bg-base-200"
                            }`}
                    >
                        {pkg.highlight && (
                            <span className="badge badge-primary absolute -top-3 left-1/2 -translate-x-1/2">
                                Most Popular
                            </span>
                        )}

                        <div className="flex justify-center">
                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Coins size={26} />
                            </span>
                        </div>

                        <h3 className="mt-5 text-center text-3xl font-semibold text-base-content">
                            {pkg.credits}
                            <span className="text-sm font-normal text-neutral-content"> credits</span>
                        </h3>
                        <p className="mt-1 text-center text-sm text-neutral-content">
                            {pkg.tagline}
                        </p>

                        <p className="mt-4 text-center text-2xl font-semibold text-primary">
                            ${pkg.priceUsd}
                        </p>

                        <ul className="mt-6 flex flex-col gap-2 text-sm text-neutral-content">
                            <li className="flex items-center gap-2">
                                <Check size={15} className="text-success" />
                                Support any campaign
                            </li>
                            <li className="flex items-center gap-2">
                                <Check size={15} className="text-success" />
                                Credits never expire
                            </li>
                            <li className="flex items-center gap-2">
                                <Check size={15} className="text-success" />
                                Secure payment via Stripe
                            </li>
                        </ul>

                        <button
                            onClick={() => handlePurchase(pkg.id)}
                            disabled={loadingId === pkg.id}
                            className={`btn mt-8 rounded-full ${pkg.highlight ? "btn-primary" : "btn-outline btn-primary"
                                }`}
                        >
                            {loadingId === pkg.id ? "Redirecting..." : "Buy Now"}
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}