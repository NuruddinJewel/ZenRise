// // "use client";

// // import { useEffect, useState } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { ArrowRight } from "lucide-react";

// // export default function TopFundedCampaigns() {
// //     const [campaigns, setCampaigns] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(false);

// //     useEffect(() => {
// //         async function fetchTopCampaigns() {
// //             try {
// //                 const res = await fetch(
// //                     `${process.env.NEXT_PUBLIC_API_URL}/api/campaigns?status=approved&limit=3`
// //                 );
// //                 if (!res.ok) throw new Error("Failed to fetch");
// //                 const data = await res.json();
// //                 setCampaigns(data);
// //             } catch (err) {
// //                 console.error("Error fetching top campaigns:", err);
// //                 setError(true);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         }

// //         fetchTopCampaigns();
// //     }, []);

// //     return (
// //         <section className="mx-auto w-full max-w-7xl px-6 py-20">
// //             <div className="flex items-end justify-between">
// //                 <div>
// //                     <span className="badge badge-outline badge-primary mb-3">
// //                         Trending Now
// //                     </span>
// //                     <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
// //                         Top Funded Campaigns
// //                     </h2>
// //                     <p className="mt-3 text-base text-neutral-content">
// //                         Campaigns making the biggest impact right now.
// //                     </p>
// //                 </div>
// //                 <Link
// //                     href="/explore"
// //                     className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
// //                 >
// //                     View all
// //                     <ArrowRight size={15} />
// //                 </Link>
// //             </div>

// //             {loading && (
// //                 <div className="mt-12 grid gap-6 md:grid-cols-3">
// //                     {Array.from({ length: 3 }).map((_, i) => (
// //                         <div key={i} className="h-80 animate-pulse rounded-2xl bg-base-300" />
// //                     ))}
// //                 </div>
// //             )}

// //             {!loading && error && (
// //                 <p className="mt-12 text-center text-sm text-error">
// //                     Couldn&apos;t load campaigns. Please try again later.
// //                 </p>
// //             )}

// //             {!loading && !error && campaigns.length === 0 && (
// //                 <p className="mt-12 text-center text-sm text-neutral-content">
// //                     No campaigns available yet. Be the first to start one!
// //                 </p>
// //             )}

// //             {!loading && !error && campaigns.length > 0 && (
// //                 <div className="mt-12 grid gap-6 md:grid-cols-3">
// //                     {campaigns.map((c) => {
// //                         const progress = Math.min(
// //                             100,
// //                             Math.round((c.raisedCredits / c.goalCredits) * 100)
// //                         );

// //                         return (
// //                             <Link
// //                                 key={c._id}
// //                                 href={`/explore/${c._id}`}
// //                                 className="group overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition-colors hover:border-primary"
// //                             >
// //                                 <div className="relative h-44 w-full overflow-hidden">
// //                                     {c.coverImage ? (
// //                                         <Image
// //                                             src={c.coverImage}
// //                                             alt={c.title}
// //                                             fill
// //                                             className="object-cover transition-transform duration-300 group-hover:scale-105"
// //                                         />
// //                                     ) : (
// //                                         <div className="flex h-full w-full items-center justify-center bg-base-300 text-sm text-neutral-content">
// //                                             No image
// //                                         </div>
// //                                     )}
// //                                     <span className="absolute top-3 left-3 badge badge-primary badge-sm capitalize">
// //                                         {c.category}
// //                                     </span>
// //                                 </div>

// //                                 <div className="p-5">
// //                                     <h3 className="line-clamp-1 font-medium text-base-content">
// //                                         {c.title}
// //                                     </h3>
// //                                     <p className="mt-2 line-clamp-2 text-sm text-neutral-content">
// //                                         {c.description}
// //                                     </p>

// //                                     <div className="mt-4">
// //                                         <div className="flex justify-between text-xs text-neutral-content">
// //                                             <span className="font-medium text-primary">
// //                                                 {c.raisedCredits} credits raised
// //                                             </span>
// //                                             <span>{progress}%</span>
// //                                         </div>
// //                                         <progress
// //                                             className="progress progress-primary mt-1 w-full"
// //                                             value={c.raisedCredits}
// //                                             max={c.goalCredits}
// //                                         />
// //                                         <p className="mt-1 text-xs text-neutral-content">
// //                                             Goal: {c.goalCredits} credits
// //                                         </p>
// //                                     </div>
// //                                 </div>
// //                             </Link>
// //                         );
// //                     })}
// //                 </div>
// //             )}

// //             <div className="mt-8 flex justify-center sm:hidden">
// //                 <Link href="/explore" className="btn btn-outline btn-primary rounded-full">
// //                     View all campaigns
// //                 </Link>
// //             </div>
// //         </section>
// //     );
// // }

// // 2

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// export default function TopFundedCampaigns() {
//     const [campaigns, setCampaigns] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         async function fetchTopCampaigns() {
//             try {
//                 const res = await fetch(
//                     `${process.env.NEXT_PUBLIC_API_URL}/api/campaigns?status=approved&limit=6`
//                 );
//                 if (!res.ok) throw new Error("Failed to fetch");
//                 const data = await res.json();
//                 setCampaigns(data);
//             } catch (err) {
//                 console.error("Error fetching top campaigns:", err);
//                 setError(true);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchTopCampaigns();
//     }, []);

//     // Duplicate list so the loop feels seamless
//     const loopCampaigns = [...campaigns, ...campaigns];

//     return (
//         <section className="mx-auto w-full max-w-7xl px-6 py-20">
//             <motion.div
//                 initial={{ opacity: 0, y: 16 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5 }}
//                 className="flex items-end justify-between px-6"
//             >
//                 <div>
//                     <span className="badge badge-outline badge-primary mb-3">
//                         Trending Now
//                     </span>
//                     <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
//                         Top Funded Campaigns
//                     </h2>
//                     <p className="mt-3 text-base text-neutral-content">
//                         Campaigns making the biggest impact right now.
//                     </p>
//                 </div>
//                 <Link
//                     href="/explore"
//                     className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
//                 >
//                     View all
//                     <ArrowRight size={15} />
//                 </Link>
//             </motion.div>

//             {loading && (
//                 <div className="mt-12 grid gap-6 px-6 md:grid-cols-3">
//                     {Array.from({ length: 3 }).map((_, i) => (
//                         <div key={i} className="h-80 animate-pulse rounded-2xl bg-base-300" />
//                     ))}
//                 </div>
//             )}

//             {!loading && error && (
//                 <p className="mt-12 text-center text-sm text-error">
//                     Couldn&apos;t load campaigns. Please try again later.
//                 </p>
//             )}

//             {!loading && !error && campaigns.length === 0 && (
//                 <p className="mt-12 text-center text-sm text-neutral-content">
//                     No campaigns available yet. Be the first to start one!
//                 </p>
//             )}

//             {!loading && !error && campaigns.length > 0 && (
//                 <div className="relative mt-12 overflow-hidden">
//                     {/* Fade edges */}
//                     <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-base-100 to-transparent" />
//                     <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-base-100 to-transparent" />

//                     <motion.div
//                         className="flex gap-6"
//                         animate={{ x: ["0%", "-50%"] }}
//                         transition={{
//                             duration: campaigns.length * 6,
//                             ease: "linear",
//                             repeat: Infinity,
//                         }}
//                     >
//                         {loopCampaigns.map((c, i) => {
//                             const progress = Math.min(
//                                 100,
//                                 Math.round((c.raisedCredits / c.goalCredits) * 100)
//                             );

//                             return (
//                                 <Link
//                                     key={`${c._id}-${i}`}
//                                     href={`/explore/${c._id}`}
//                                     className="group block w-72 shrink-0 overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition-colors hover:border-primary"
//                                 >
//                                     <div className="relative h-40 w-full overflow-hidden">
//                                         {c.coverImage ? (
//                                             <Image
//                                                 src={c.coverImage}
//                                                 alt={c.title}
//                                                 fill
//                                                 className="object-cover transition-transform duration-300 group-hover:scale-105"
//                                             />
//                                         ) : (
//                                             <div className="flex h-full w-full items-center justify-center bg-base-300 text-sm text-neutral-content">
//                                                 No image
//                                             </div>
//                                         )}
//                                         <span className="absolute top-3 left-3 badge badge-primary badge-sm capitalize">
//                                             {c.category}
//                                         </span>
//                                     </div>

//                                     <div className="p-5">
//                                         <h3 className="line-clamp-1 font-medium text-base-content">
//                                             {c.title}
//                                         </h3>
//                                         <p className="mt-2 line-clamp-2 text-sm text-neutral-content">
//                                             {c.description}
//                                         </p>

//                                         <div className="mt-4">
//                                             <div className="flex justify-between text-xs text-neutral-content">
//                                                 <span className="font-medium text-primary">
//                                                     {c.raisedCredits} credits
//                                                 </span>
//                                                 <span>{progress}%</span>
//                                             </div>
//                                             <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-base-300">
//                                                 <div
//                                                     className="h-full rounded-full bg-primary"
//                                                     style={{ width: `${progress}%` }}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             );
//                         })}
//                     </motion.div>
//                 </div>
//             )}

//             <div className="mt-8 flex justify-center sm:hidden">
//                 <Link href="/explore" className="btn btn-outline btn-primary rounded-full">
//                     View all campaigns
//                 </Link>
//             </div>
//         </section>
//     );
// }

//2

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { ArrowRight } from "lucide-react";

// export default function TopFundedCampaigns() {
//     const [campaigns, setCampaigns] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         async function fetchTopCampaigns() {
//             try {
//                 const res = await fetch(
//                     `${process.env.NEXT_PUBLIC_API_URL}/api/campaigns?status=approved&limit=3`
//                 );
//                 if (!res.ok) throw new Error("Failed to fetch");
//                 const data = await res.json();
//                 setCampaigns(data);
//             } catch (err) {
//                 console.error("Error fetching top campaigns:", err);
//                 setError(true);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchTopCampaigns();
//     }, []);

//     return (
//         <section className="mx-auto w-full max-w-7xl px-6 py-20">
//             <div className="flex items-end justify-between">
//                 <div>
//                     <span className="badge badge-outline badge-primary mb-3">
//                         Trending Now
//                     </span>
//                     <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
//                         Top Funded Campaigns
//                     </h2>
//                     <p className="mt-3 text-base text-neutral-content">
//                         Campaigns making the biggest impact right now.
//                     </p>
//                 </div>
//                 <Link
//                     href="/explore"
//                     className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
//                 >
//                     View all
//                     <ArrowRight size={15} />
//                 </Link>
//             </div>

//             {loading && (
//                 <div className="mt-12 grid gap-6 md:grid-cols-3">
//                     {Array.from({ length: 3 }).map((_, i) => (
//                         <div key={i} className="h-80 animate-pulse rounded-2xl bg-base-300" />
//                     ))}
//                 </div>
//             )}

//             {!loading && error && (
//                 <p className="mt-12 text-center text-sm text-error">
//                     Couldn&apos;t load campaigns. Please try again later.
//                 </p>
//             )}

//             {!loading && !error && campaigns.length === 0 && (
//                 <p className="mt-12 text-center text-sm text-neutral-content">
//                     No campaigns available yet. Be the first to start one!
//                 </p>
//             )}

//             {!loading && !error && campaigns.length > 0 && (
//                 <div className="mt-12 grid gap-6 md:grid-cols-3">
//                     {campaigns.map((c) => {
//                         const progress = Math.min(
//                             100,
//                             Math.round((c.raisedCredits / c.goalCredits) * 100)
//                         );

//                         return (
//                             <Link
//                                 key={c._id}
//                                 href={`/explore/${c._id}`}
//                                 className="group overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition-colors hover:border-primary"
//                             >
//                                 <div className="relative h-44 w-full overflow-hidden">
//                                     {c.coverImage ? (
//                                         <Image
//                                             src={c.coverImage}
//                                             alt={c.title}
//                                             fill
//                                             className="object-cover transition-transform duration-300 group-hover:scale-105"
//                                         />
//                                     ) : (
//                                         <div className="flex h-full w-full items-center justify-center bg-base-300 text-sm text-neutral-content">
//                                             No image
//                                         </div>
//                                     )}
//                                     <span className="absolute top-3 left-3 badge badge-primary badge-sm capitalize">
//                                         {c.category}
//                                     </span>
//                                 </div>

//                                 <div className="p-5">
//                                     <h3 className="line-clamp-1 font-medium text-base-content">
//                                         {c.title}
//                                     </h3>
//                                     <p className="mt-2 line-clamp-2 text-sm text-neutral-content">
//                                         {c.description}
//                                     </p>

//                                     <div className="mt-4">
//                                         <div className="flex justify-between text-xs text-neutral-content">
//                                             <span className="font-medium text-primary">
//                                                 {c.raisedCredits} credits raised
//                                             </span>
//                                             <span>{progress}%</span>
//                                         </div>
//                                         <progress
//                                             className="progress progress-primary mt-1 w-full"
//                                             value={c.raisedCredits}
//                                             max={c.goalCredits}
//                                         />
//                                         <p className="mt-1 text-xs text-neutral-content">
//                                             Goal: {c.goalCredits} credits
//                                         </p>
//                                     </div>
//                                 </div>
//                             </Link>
//                         );
//                     })}
//                 </div>
//             )}

//             <div className="mt-8 flex justify-center sm:hidden">
//                 <Link href="/explore" className="btn btn-outline btn-primary rounded-full">
//                     View all campaigns
//                 </Link>
//             </div>
//         </section>
//     );
// }

// 2

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function TopFundedCampaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchTopCampaigns() {
            try {
                const res = await fetch(
                    `/api/campaigns?status=approved&limit=6`
                );
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setCampaigns(data);
            } catch (err) {
                console.error("Error fetching top campaigns:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchTopCampaigns();
    }, []);

    // Duplicate list so the loop feels seamless
    const loopCampaigns = [...campaigns, ...campaigns];

    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-end justify-between px-6"
            >
                <div>
                    <span className="badge badge-outline badge-primary mb-3">
                        Trending Now
                    </span>
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        Top Funded Campaigns
                    </h2>
                    <p className="mt-3 text-base text-neutral-content">
                        Campaigns making the biggest impact right now.
                    </p>
                </div>
                <Link
                    href="/explore"
                    className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
                >
                    View all
                    <ArrowRight size={15} />
                </Link>
            </motion.div>

            {loading && (
                <div className="mt-12 grid gap-6 px-6 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-80 animate-pulse rounded-2xl bg-base-300" />
                    ))}
                </div>
            )}

            {!loading && error && (
                <p className="mt-12 text-center text-sm text-error">
                    Couldn&apos;t load campaigns. Please try again later.
                </p>
            )}

            {!loading && !error && campaigns.length === 0 && (
                <p className="mt-12 text-center text-sm text-neutral-content">
                    No campaigns available yet. Be the first to start one!
                </p>
            )}

            {!loading && !error && campaigns.length > 0 && (
                <div className="relative mt-12 overflow-hidden">
                    {/* Fade edges */}
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-base-100 to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-base-100 to-transparent" />

                    <motion.div
                        className="flex gap-6"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: campaigns.length * 6,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {loopCampaigns.map((c, i) => {
                            const progress = Math.min(
                                100,
                                Math.round((c.raisedCredits / c.goalCredits) * 100)
                            );

                            return (
                                <Link
                                    key={`${c._id}-${i}`}
                                    href={`/explore/${c._id}`}
                                    className="group block w-72 shrink-0 overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition-colors hover:border-primary"
                                >
                                    <div className="relative h-40 w-full overflow-hidden">
                                        {c.coverImage ? (
                                            <Image
                                                src={c.coverImage}
                                                alt={c.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-base-300 text-sm text-neutral-content">
                                                No image
                                            </div>
                                        )}
                                        <span className="absolute top-3 left-3 badge badge-primary badge-sm capitalize">
                                            {c.category}
                                        </span>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="line-clamp-1 font-medium text-base-content">
                                            {c.title}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm text-neutral-content">
                                            {c.description}
                                        </p>

                                        <div className="mt-4">
                                            <div className="flex justify-between text-xs text-neutral-content">
                                                <span className="font-medium text-primary">
                                                    {c.raisedCredits} credits
                                                </span>
                                                <span>{progress}%</span>
                                            </div>
                                            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-base-300">
                                                <div
                                                    className="h-full rounded-full bg-primary"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </motion.div>
                </div>
            )}

            <div className="mt-8 flex justify-center sm:hidden">
                <Link href="/explore" className="btn btn-outline btn-primary rounded-full">
                    View all campaigns
                </Link>
            </div>
        </section>
    );
}