// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { toast } from "react-toastify";
// import { ArrowLeft, Calendar, Tag, Users } from "lucide-react";

// export default function CampaignDetailsPage() {
//     const { id } = useParams();
//     const router = useRouter();

//     const [campaign, setCampaign] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         async function fetchCampaign() {
//             try {
//                 const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/campaigns/${id}`);
//                 if (!res.ok) throw new Error("Campaign not found");
//                 const data = await res.json();
//                 setCampaign(data);
//             } catch (err) {
//                 console.error("Error fetching campaign:", err);
//                 setError(true);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchCampaign();
//     }, [id]);

//     function handleContribute() {
//         toast.info("Contribution feature is coming soon!");
//     }

//     if (loading) {
//         return (
//             <main className="mx-auto w-full max-w-5xl px-6 py-12">
//                 <div className="h-72 w-full animate-pulse rounded-2xl bg-base-300" />
//                 <div className="mt-6 h-8 w-2/3 animate-pulse rounded bg-base-300" />
//                 <div className="mt-3 h-4 w-full animate-pulse rounded bg-base-300" />
//             </main>
//         );
//     }

//     if (error || !campaign) {
//         return (
//             <main className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-24 text-center">
//                 <p className="text-lg text-base-content">Campaign not found.</p>
//                 <Link href="/explore" className="btn btn-primary mt-4 rounded-full">
//                     Back to Explore
//                 </Link>
//             </main>
//         );
//     }

//     const progress = Math.min(
//         100,
//         Math.round((campaign.raisedCredits / campaign.goalCredits) * 100)
//     );

//     return (
//         <main className="mx-auto w-full max-w-5xl px-6 py-12">
//             <button
//                 onClick={() => router.back()}
//                 className="flex items-center gap-1 text-sm text-neutral-content hover:text-primary"
//             >
//                 <ArrowLeft size={15} />
//                 Back
//             </button>

//             <div className="relative mt-6 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
//                 {campaign.coverImage ? (
//                     <Image
//                         src={campaign.coverImage}
//                         alt={campaign.title}
//                         fill
//                         className="object-cover"
//                         priority
//                     />
//                 ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-base-300 text-neutral-content">
//                         No image available
//                     </div>
//                 )}
//                 <span className="absolute top-4 left-4 badge badge-primary capitalize">
//                     {campaign.category}
//                 </span>
//             </div>

//             <div className="mt-8 grid gap-10 lg:grid-cols-3">
//                 {/* Left: main content */}
//                 <div className="lg:col-span-2">
//                     <h1 className="text-3xl font-semibold tracking-tight text-base-content">
//                         {campaign.title}
//                     </h1>

//                     <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-content">
//                         <span className="flex items-center gap-1">
//                             <Tag size={14} />
//                             {campaign.category}
//                         </span>
//                         {campaign.deadline && (
//                             <span className="flex items-center gap-1">
//                                 <Calendar size={14} />
//                                 Ends {new Date(campaign.deadline).toLocaleDateString()}
//                             </span>
//                         )}
//                     </div>

//                     <p className="mt-6 whitespace-pre-line leading-relaxed text-base-content/90">
//                         {campaign.description}
//                     </p>

//                     {/* Campaign updates */}
//                     <div className="mt-10">
//                         <h2 className="text-lg font-semibold text-base-content">
//                             Campaign Updates
//                         </h2>
//                         {campaign.updates?.length > 0 ? (
//                             <div className="mt-4 flex flex-col gap-4">
//                                 {campaign.updates.map((u, i) => (
//                                     <div
//                                         key={i}
//                                         className="rounded-xl border border-base-300 bg-base-200 p-4"
//                                     >
//                                         <p className="text-sm font-medium text-base-content">
//                                             {u.title}
//                                         </p>
//                                         <p className="mt-1 text-sm text-neutral-content">
//                                             {u.content}
//                                         </p>
//                                         <p className="mt-2 text-xs text-neutral-content">
//                                             {new Date(u.postedAt).toLocaleDateString()}
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <p className="mt-3 text-sm text-neutral-content">
//                                 No updates posted yet.
//                             </p>
//                         )}
//                     </div>
//                 </div>

//                 {/* Right: funding sidebar */}
//                 <div className="h-fit rounded-2xl border border-base-300 bg-base-200 p-6 lg:sticky lg:top-24">
//                     <p className="text-2xl font-semibold text-primary">
//                         {campaign.raisedCredits}{" "}
//                         <span className="text-sm font-normal text-neutral-content">
//                             credits raised
//                         </span>
//                     </p>
//                     <progress
//                         className="progress progress-primary mt-3 w-full"
//                         value={campaign.raisedCredits}
//                         max={campaign.goalCredits}
//                     />
//                     <div className="mt-2 flex justify-between text-xs text-neutral-content">
//                         <span>Goal: {campaign.goalCredits} credits</span>
//                         <span>{progress}%</span>
//                     </div>

//                     <div className="mt-4 flex items-center gap-2 text-sm text-neutral-content">
//                         <Users size={15} />
//                         {Math.round(campaign.raisedCredits / 20) || 0} supporters (est.)
//                     </div>

//                     <button
//                         onClick={handleContribute}
//                         className="btn btn-primary mt-6 w-full rounded-full"
//                     >
//                         Contribute Now
//                     </button>

//                     <p className="mt-3 text-center text-xs text-neutral-content">
//                         10 credits = $1 · Every contribution counts
//                     </p>
//                 </div>
//             </div>
//         </main>
//     );
// }

//2
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Users } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import ContributeModal from "@/components/campaign/ContributeModal";

export default function CampaignDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchCampaign() {
            try {
                // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/campaigns/${id}`);
                const res = await fetch(`/api/campaigns/${id}`);
                if (!res.ok) throw new Error("Campaign not found");
                const data = await res.json();
                setCampaign(data);
            } catch (err) {
                console.error("Error fetching campaign:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchCampaign();
    }, [id]);


    function handleContribute() {
        setIsModalOpen(true);
    }

    if (loading) {
        return (
            <main className="mx-auto w-full max-w-5xl px-6 py-12">
                <div className="h-72 w-full animate-pulse rounded-2xl bg-base-300" />
                <div className="mt-6 h-8 w-2/3 animate-pulse rounded bg-base-300" />
                <div className="mt-3 h-4 w-full animate-pulse rounded bg-base-300" />
            </main>
        );
    }

    if (error || !campaign) {
        return (
            <main className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-24 text-center">
                <p className="text-lg text-base-content">Campaign not found.</p>
                <Link href="/explore" className="btn btn-primary mt-4 rounded-full">
                    Back to Explore
                </Link>
            </main>
        );
    }

    const progress = Math.min(
        100,
        Math.round((campaign.raisedCredits / campaign.goalCredits) * 100)
    );

    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-12">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-1 text-sm text-neutral-content hover:text-primary"
            >
                <ArrowLeft size={15} />
                Back
            </button>

            <div className="relative mt-6 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
                {campaign.coverImage ? (
                    <Image
                        src={campaign.coverImage}
                        alt={campaign.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-base-300 text-neutral-content">
                        No image available
                    </div>
                )}
                <span className="absolute top-4 left-4 badge badge-primary capitalize">
                    {campaign.category}
                </span>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-3">
                {/* Left: main content */}
                <div className="lg:col-span-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-base-content">
                        {campaign.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-content">
                        <span className="flex items-center gap-1">
                            <Tag size={14} />
                            {campaign.category}
                        </span>
                        {campaign.deadline && (
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                Ends {new Date(campaign.deadline).toLocaleDateString()}
                            </span>
                        )}
                    </div>

                    <p className="mt-6 whitespace-pre-line leading-relaxed text-base-content/90">
                        {campaign.description}
                    </p>

                    {/* Campaign updates */}
                    <div className="mt-10">
                        <h2 className="text-lg font-semibold text-base-content">
                            Campaign Updates
                        </h2>
                        {campaign.updates?.length > 0 ? (
                            <div className="mt-4 flex flex-col gap-4">
                                {campaign.updates.map((u, i) => (
                                    <div
                                        key={i}
                                        className="rounded-xl border border-base-300 bg-base-200 p-4"
                                    >
                                        <p className="text-sm font-medium text-base-content">
                                            {u.title}
                                        </p>
                                        <p className="mt-1 text-sm text-neutral-content">
                                            {u.content}
                                        </p>
                                        <p className="mt-2 text-xs text-neutral-content">
                                            {new Date(u.postedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-3 text-sm text-neutral-content">
                                No updates posted yet.
                            </p>
                        )}
                    </div>
                </div>

                {/* Right: funding sidebar */}
                <div className="h-fit rounded-2xl border border-base-300 bg-base-200 p-6 lg:sticky lg:top-24">
                    <p className="text-2xl font-semibold text-primary">
                        {campaign.raisedCredits || 0}{" "}
                        <span className="text-sm font-normal text-neutral-content">
                            credits raised
                        </span>
                    </p>
                    <progress
                        className="progress progress-primary mt-3 w-full bg-base-300/50"
                        value={campaign.raisedCredits || 0}
                        max={campaign.goalCredits}
                    />
                    <div className="mt-2 flex justify-between text-xs text-neutral-content">
                        <span>Goal: {campaign.goalCredits} credits</span>
                        <span>{progress}%</span>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm text-neutral-content">
                        <Users size={15} />
                        {Math.round((campaign.raisedCredits || 0) / 20) || 0} supporters (est.)
                    </div>

                    {session?.user ? (
                        <button
                            onClick={handleContribute}
                            className="btn btn-primary mt-6 w-full rounded-full font-semibold transition-transform hover:scale-[1.01] shadow-lg shadow-primary/10"
                        >
                            Contribute Now
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="btn btn-outline border-base-300 mt-6 w-full rounded-full"
                        >
                            Login to Contribute
                        </Link>
                    )}

                    <p className="mt-3 text-center text-xs text-neutral-content">
                        10 credits = $1 · Every contribution counts
                    </p>
                </div>
            </div>

            <ContributeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                campaignId={id}
                supporterId={session?.user?.id || session?.user?._id}
                currentCredits={session?.user?.credits || 0}
                onSuccess={() => {
                    window.location.reload();
                }}
            />
        </main>
    );
}