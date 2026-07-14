"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaHeart, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const FOOTER_LINKS = {
    Platform: [
        { href: "/explore", label: "Explore Campaigns" },
        { href: "#", label: "How It Works" },
    ],
    Company: [
        { href: "#", label: "About Us" },
        { href: "#", label: "Contact" },
        { href: "#", label: "FAQ" },
    ],
    Legal: [
        { href: "#", label: "Terms of Service" },
        { href: "#", label: "Privacy Policy" },
    ],
};

const SOCIALS = [
    { href: "https://twitter.com", icon: FaTwitter, label: "Twitter" },
    { href: "https://facebook.com", icon: FaFacebook, label: "Facebook" },
    { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
    { href: "https://linkedin.com", icon: FaLinkedin, label: "LinkedIn" },
];

export default function Footer() {
    const year = new Date().getFullYear();
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    function handleStartCampaignClick(e) {
        e.preventDefault();

        if (isPending) return;

        if (!session) {
            toast.info("Please sign up or log in as a creator to start a campaign.");
            router.push("/register");
            return;
        }

        if (session.user.role !== "creator") {
            toast.error("Only creator accounts can start a campaign.");
            return;
        }

        router.push("/dashboard/creator/add-campaign");
    }

    return (
        <footer className="border-t border-base-300 bg-base-200 text-base-content">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/" className="text-xl font-bold tracking-tight text-base-content">
                            Fund<span className="text-primary">Rise</span>
                        </Link>
                        <p className="mt-3 max-w-xs text-sm text-base-content/70">
                            Empowering creators and supporters to fund ideas, causes, and
                            products that matter.
                        </p>
                        <div className="mt-5 flex gap-3">
                            {SOCIALS.map(({ href, icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-base-300 text-base-content/70 transition-all duration-200 hover:border-primary hover:text-primary hover:bg-base-300"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(FOOTER_LINKS).map(([section, links]) => (
                        <div key={section}>
                            <h3 className="text-sm font-semibold tracking-wider text-base-content/90 uppercase">
                                {section}
                            </h3>
                            <ul className="mt-4 flex flex-col gap-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-base-content/70 transition-colors hover:text-primary"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}

                                {/* Start a Campaign  */}
                                {section === "Platform" && (
                                    <li>
                                        <button
                                            onClick={handleStartCampaignClick}
                                            className="text-sm text-base-content/70 transition-colors hover:text-primary text-left"
                                        >
                                            Start a Campaign
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-base-300 pt-6 sm:flex-row">
                    <p className="text-xs text-base-content/60">
                        © {year} FundRise. All rights reserved.
                    </p>
                    <p className="flex items-center gap-1 text-xs text-base-content/60">
                        Made with <FaHeart size={12} className="fill-secondary text-secondary" /> for creators everywhere
                    </p>
                </div>
            </div>
        </footer>
    );
}