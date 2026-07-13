"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Coins, Heart, Receipt } from "lucide-react";

export default function SupporterDashboardHome() {
    const { data: session } = authClient.useSession();

    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-12">
            <h1 className="text-2xl font-semibold text-base-content">
                Welcome back, {session?.user?.name?.split(" ")[0] || "Supporter"}!
            </h1>
            <p className="mt-2 text-sm text-neutral-content">
                Here&apos;s a quick overview of your account.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-base-300 bg-base-200 p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Coins size={20} />
                    </span>
                    <p className="mt-4 text-2xl font-semibold text-base-content">
                        {session?.user?.credits ?? 0}
                    </p>
                    <p className="text-sm text-neutral-content">Available Credits</p>
                </div>

                <Link
                    href="/dashboard/supporter/contributions"
                    className="rounded-2xl border border-base-300 bg-base-200 p-6 transition-colors hover:border-primary"
                >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <Heart size={20} />
                    </span>
                    <p className="mt-4 text-lg font-medium text-base-content">
                        My Contributions
                    </p>
                    <p className="text-sm text-neutral-content">
                        See campaigns {"you've"} supported
                    </p>
                </Link>

                <Link
                    href="/dashboard/supporter/purchase-credit"
                    className="rounded-2xl border border-base-300 bg-base-200 p-6 transition-colors hover:border-primary"
                >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Receipt size={20} />
                    </span>
                    <p className="mt-4 text-lg font-medium text-base-content">
                        Purchase Credits
                    </p>
                    <p className="text-sm text-neutral-content">
                        Top up your balance
                    </p>
                </Link>
            </div>
        </main>
    );
}