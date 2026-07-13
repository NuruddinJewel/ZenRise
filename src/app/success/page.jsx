"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const [status, setStatus] = useState("verifying");
    const [credits, setCredits] = useState(0);
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (!sessionId) {
            setStatus("error");
            return;
        }

        async function verify() {
            try {
                const res = await fetch("/api/verify-session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sessionId }),
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.message);

                setCredits(data.credits);
                setStatus("success");
                toast.success(`${data.credits} credits added to your account!`);
            } catch (err) {
                console.error(err);
                setStatus("error");
                toast.error("Failed to verify payment.");
            }
        }

        verify();
    }, [sessionId]);

    const handleGoToDashboard = () => {
        setIsRedirecting(true);
        window.location.assign("/dashboard/supporter");
    };

    return (
        <main className="flex flex-1 flex-col items-center justify-center min-h-[75vh] px-6 py-12 text-center bg-base-100">
            <div className="w-full max-w-md p-8 rounded-box bg-base-200 border border-base-300 shadow-xl backdrop-blur-sm">
                {status === "verifying" && (
                    <div className="flex flex-col items-center py-6">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-16 h-16 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
                            <span className="loading loading-spinner loading-lg text-primary relative z-10" />
                        </div>
                        <p className="mt-6 text-sm font-medium text-base-content/80 tracking-wide flex items-center gap-2">
                            <RefreshCw size={14} className="animate-spin text-primary/70" />
                            Verifying your payment...
                        </p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center">
                        <div className="p-3 rounded-full bg-success/10 text-success border border-success/20">
                            <CheckCircle2 size={48} className="drop-shadow-[0_0_8px_rgba(47,211,160,0.4)]" />
                        </div>
                        <h1 className="mt-5 text-2xl font-bold tracking-tight text-base-content">
                            Payment Successful!
                        </h1>
                        <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
                            <span className="text-secondary font-bold text-lg">{credits}</span> credits have been successfully credited to your wallet.
                        </p>

                        <button
                            onClick={handleGoToDashboard}
                            disabled={isRedirecting}
                            className="btn btn-primary mt-8 rounded-full min-w-[180px] font-semibold tracking-wide shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02]"
                        >
                            {isRedirecting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <span className="loading loading-spinner loading-sm" />
                                    Loading...
                                </div>
                            ) : (
                                "Go to Dashboard"
                            )}
                        </button>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center">
                        <div className="p-3 rounded-full bg-error/10 text-error border border-error/20">
                            <XCircle size={48} className="drop-shadow-[0_0_8px_rgba(255,92,122,0.4)]" />
                        </div>
                        <h1 className="mt-5 text-xl font-bold tracking-tight text-base-content">
                            Verification Failed
                        </h1>
                        <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
                            We couldn&apos;t validate this session. The payment might already be processed or canceled.
                        </p>

                        <button
                            onClick={() => window.location.assign("/dashboard/supporter/purchase-credit")}
                            className="btn btn-outline border-base-300 hover:border-error hover:bg-error/10 hover:text-error mt-8 rounded-full min-w-[180px] font-semibold tracking-wide transition-all"
                        >
                            Back to Purchase
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}