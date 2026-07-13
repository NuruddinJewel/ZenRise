import { Search, HeartHandshake, TrendingUp } from "lucide-react";

const STEPS = [
    {
        icon: Search,
        title: "Discover a Campaign",
        description:
            "Browse through hundreds of campaigns across categories and find causes, products, or ideas you care about.",
        accent: "primary",
    },
    {
        icon: HeartHandshake,
        title: "Contribute Credits",
        description:
            "Purchase credits and contribute any amount toward campaigns you want to support — every bit helps.",
        accent: "secondary",
    },
    {
        icon: TrendingUp,
        title: "Watch Ideas Grow",
        description:
            "Track campaign progress, get updates from creators, and see your contribution bring real projects to life.",
        accent: "accent",
    },
];

const ACCENT_STYLES = {
    primary: "bg-primary/10 text-primary border-primary/30",
    secondary: "bg-secondary/10 text-secondary border-secondary/30",
    accent: "bg-accent/10 text-accent border-accent/30",
};

export default function HowItWorks() {
    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-20">
            <div className="text-center">
                <span className="badge badge-outline badge-primary mb-3">
                    Simple Process
                </span>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    How It Works
                </h2>
                <p className="mt-3 text-base text-neutral-content">
                    Three simple steps to start supporting causes you believe in.
                </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
                {STEPS.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <div
                            key={step.title}
                            className="relative rounded-2xl border border-base-300 bg-base-200 p-8"
                        >
                            <span className="absolute -top-4 -left-2 text-6xl font-bold text-base-300 select-none">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <div
                                className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border ${ACCENT_STYLES[step.accent]}`}
                            >
                                <Icon size={26} />
                            </div>

                            <h3 className="relative mt-6 text-lg font-semibold text-base-content">
                                {step.title}
                            </h3>
                            <p className="relative mt-3 text-sm leading-relaxed text-neutral-content">
                                {step.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}