"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { CreditCard, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentHistoryPage() {
    const { data: session, isPending: isAuthLoading } = authClient.useSession();
    const [payments, setPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPaymentHistory() {
            if (!session?.user?.id && !session?.user?._id) return;
            const userId = session.user.id || session.user._id;

            try {
                const res = await fetch(`/api/payment-history?userId=${userId}`);
                const data = await res.json();
                if (data.success) {
                    setPayments(data.data);
                }
            } catch (err) {
                console.error("Error fetching payment history:", err);
            } finally {
                setIsLoading(false);
            }
        }

        if (!isAuthLoading) {
            fetchPaymentHistory();
        }
    }, [session, isAuthLoading]);

    if (isAuthLoading || isLoading) {
        return (
            <div className="p-6 max-w-5xl mx-auto space-y-4">
                <div className="h-8 w-48 bg-base-300 animate-pulse rounded" />
                <div className="h-48 w-full bg-base-200 animate-pulse rounded-box" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto bg-base-100 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-base-content tracking-tight">Payment History</h1>
                <p className="text-sm text-base-content/60 mt-1">Review all your credit bundle purchases securely via Stripe.</p>
            </div>

            {payments.length === 0 ? (
                <div className="flex flex-col items-center justify-center border border-dashed border-base-300 rounded-box p-12 bg-base-200/40 text-center">
                    <div className="p-4 rounded-full bg-base-300 text-base-content/40 mb-4">
                        <CreditCard size={40} />
                    </div>
                    <h3 className="text-lg font-semibold text-base-content">No Payments Found</h3>
                    <p className="text-sm text-base-content/60 mt-1">You haven&apos;t purchased any credits yet.</p>
                    <Link href="/dashboard/supporter/purchase-credit" className="btn btn-primary btn-sm rounded-full mt-5">
                        Buy Credits Now
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto w-full rounded-box border border-base-300 bg-base-200 shadow-xl">
                    <table className="table table-zebra w-full text-left">
                        <thead className="bg-base-300/60 text-base-content/80 text-sm">
                            <tr>
                                <th className="py-4">Session / ID</th>
                                <th className="py-4">Amount Paid</th>
                                <th className="py-4">Credits Added</th>
                                <th className="py-4">Date</th>
                                <th className="py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-base-content/90 text-sm sm:text-base">
                            {payments.map((pay) => (
                                <tr key={pay._id} className="hover:bg-base-100/40 transition-colors">
                                    <td className="font-mono text-xs text-base-content/60 max-w-[150px] truncate py-4">
                                        {pay.stripeSessionId}
                                    </td>
                                    <td className="font-semibold py-4">
                                        ${pay.amountUsd?.toFixed(2)} <span className="uppercase text-xs">USD</span>
                                    </td>
                                    <td className="text-secondary font-bold py-4">
                                        +{pay.credits} Credits
                                    </td>
                                    <td className="text-base-content/70 py-4">
                                        <span className="flex items-center gap-1 text-xs sm:text-sm">
                                            <Calendar size={14} className="opacity-50" />
                                            {new Date(pay.createdAt).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <span className="badge badge-success badge-sm sm:badge-md gap-1 py-3 text-success-content font-medium capitalize">
                                            <CheckCircle size={12} />
                                            {pay.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}