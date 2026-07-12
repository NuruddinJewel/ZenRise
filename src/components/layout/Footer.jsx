import Link from "next/link";
import { FaHeart, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const FOOTER_LINKS = {
    Platform: [
        { href: "/explore", label: "Explore Campaigns" },
        { href: "/register", label: "Start a Campaign" },
        { href: "/how-it-works", label: "How It Works" },
    ],
    Company: [
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
        { href: "/faq", label: "FAQ" },
    ],
    Legal: [
        { href: "/terms", label: "Terms of Service" },
        { href: "/privacy", label: "Privacy Policy" },
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
                        {/* Social Icons */}
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
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-base-content/70 transition-colors hover:text-primary"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
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