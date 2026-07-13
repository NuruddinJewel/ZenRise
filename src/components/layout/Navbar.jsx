"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Menu, X, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { toast } from "react-toastify";

const NAV_LINKS = {
    supporter: [
        { href: "/dashboard/supporter", label: "Home" },
        { href: "/explore", label: "Explore Campaigns" },
        { href: "/dashboard/supporter/contributions", label: "My Contributions" },
        { href: "/dashboard/supporter/purchase-credit", label: "Purchase Credit" },
        { href: "/dashboard/supporter/payments", label: "Payment History" },
    ],
    creator: [
        { href: "/dashboard/creator", label: "Home" },
        { href: "/dashboard/creator/add-campaign", label: "Add New Campaign" },
        { href: "/dashboard/creator/my-campaigns", label: "My Campaigns" },
        { href: "/dashboard/creator/withdrawals", label: "Withdrawals" },
        { href: "/dashboard/creator/payment-history", label: "Payment History" },
    ],
    admin: [
        { href: "/dashboard/admin", label: "Home" },
        { href: "/dashboard/admin/manage-users", label: "Manage Users" },
        { href: "/dashboard/admin/manage-campaigns", label: "Manage Campaigns" },
        { href: "/dashboard/admin/withdrawal-requests", label: "Withdrawal Requests" },
        { href: "/dashboard/admin/reports", label: "Reports" },
    ],
};

export default function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();

    const role = session?.user?.role || null;
    const links = role ? NAV_LINKS[role] || [] : [];

    async function handleLogout() {
        await authClient.signOut();
        toast.success("Logged out successfully!");
        router.push("/");
        router.refresh();
    }

    return (
        <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur-sm">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-base-content">
                        Fund<span className="text-primary">Rise</span>
                    </span>
                </Link>

                {/* Desktop nav links */}
                <div className="hidden items-center gap-6 md:flex">
                    {!isPending && role
                        ? links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-neutral-content transition-colors hover:text-primary"
                            >
                                {link.label}
                            </Link>
                        ))
                        : (
                            <Link
                                href="/explore"
                                className="text-sm text-neutral-content transition-colors hover:text-primary"
                            >
                                Explore Campaigns
                            </Link>
                        )}
                </div>

                {/* Right side: auth area */}
                <div className="hidden items-center gap-3 md:flex">
                    {isPending ? (
                        <div className="h-9 w-24 animate-pulse rounded-full bg-base-300" />
                    ) : session ? (
                        <div className="dropdown dropdown-end">
                            <button
                                tabIndex={0}
                                className="flex items-center gap-2 rounded-full border border-base-300 px-3 py-1.5 text-sm text-base-content hover:border-primary"
                            >
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-content">
                                    {session.user.name?.[0]?.toUpperCase() || "U"}
                                </span>
                                {session.user.name?.split(" ")[0]}
                                <ChevronDown size={14} />
                            </button>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu z-50 mt-2 w-52 rounded-xl border border-base-300 bg-base-200 p-2 shadow-lg"
                            >
                                <li>
                                    <Link href={`/dashboard/${role}`} className="text-sm">
                                        <LayoutDashboard size={15} />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="text-sm text-error">
                                        <LogOut size={15} />
                                        Log out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="btn btn-ghost btn-sm rounded-full">
                                Login
                            </Link>
                            <Link href="/register" className="btn btn-primary btn-sm rounded-full">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="border-t border-base-300 bg-base-100 px-4 py-4 md:hidden">
                    <div className="flex flex-col gap-3">
                        {!isPending && role
                            ? links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-sm text-neutral-content hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            ))
                            : (
                                <Link
                                    href="/explore"
                                    onClick={() => setMobileOpen(false)}
                                    className="text-sm text-neutral-content hover:text-primary"
                                >
                                    Explore Campaigns
                                </Link>
                            )}

                        <div className="mt-2 border-t border-base-300 pt-3">
                            {session ? (
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline btn-error btn-sm w-full rounded-full"
                                >
                                    Log out
                                </button>
                            ) : (
                                <div className="flex gap-3">
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="btn btn-ghost btn-sm flex-1 rounded-full"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setMobileOpen(false)}
                                        className="btn btn-primary btn-sm flex-1 rounded-full"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}