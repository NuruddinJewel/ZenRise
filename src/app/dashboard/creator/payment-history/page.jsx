"use client";

import { useEffect, useState } from "react";
import { Receipt, ArrowDownCircle, ArrowUpCircle, Loader2 } from "lucide-react";

const STATUS_STYLES = {
    completed: "badge-success",
    pending: "badge-warning",
    approved: "badge-success",
    rejected: "badge-error",
};

export default function PaymentHistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const res = await fetch("/api/creator/payment-history");
                const data = await res.json();

                if (!data.success) throw new Error(data.message);

                setHistory(data.data);
            } catch (err) {
                console.error("Error fetching payment history:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <main className="mx-auto w-full max-w-4xl px-6 py-12">
            <h1 className="flex items-center gap-2 text-2xl font-semibold text-base-content">
                <Receipt className="text-primary" size={26} />
                Payment History
            </h1>
            <p className="mt-1 text-sm text-neutral-content">
                A record of credits received and withdrawals made.
            </p>

            {error && (
                <p className="mt-12 text-center text-sm text-error">
                    Couldn&apos;t load payment history. Please try again later.
                </p>
            )}

            {!error && history.length === 0 && (
                <p className="mt-16 text-center text-sm text-neutral-content">
                    No transactions yet.
                </p>
            )}

            {!error && history.length > 0 && (
                <div className="mt-8 flex flex-col gap-3">
                    {history.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between rounded-2xl border border-base-300 bg-base-200 p-5"
                        >
                            <div className="flex items-center gap-4">
                                <span
                                    className={`flex h-10 w-10 items-center justify-center rounded-full ${item.type === "contribution"
                                            ? "bg-success/10 text-success"
                                            : "bg-secondary/10 text-secondary"
                                        }`}
                                >
                                    {item.type === "contribution" ? (
                                        <ArrowDownCircle size={20} />
                                    ) : (
                                        <ArrowUpCircle size={20} />
                                    )}
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-base-content">
                                        {item.type === "contribution"
                                            ? `Contribution received — ${item.campaignTitle}`
                                            : `Withdrawal via ${item.paymentMethod}`}
                                    </p>
                                    <p className="text-xs text-neutral-content">
                                        {new Date(item.date).toLocaleDateString(undefined, {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p
                                    className={`text-sm font-semibold ${item.type === "contribution" ? "text-success" : "text-secondary"
                                        }`}
                                >
                                    {item.type === "contribution" ? "+" : "-"}
                                    {item.amount} credits
                                </p>
                                <span className={`badge badge-sm mt-1 ${STATUS_STYLES[item.status] || "badge-neutral"}`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}