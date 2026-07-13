"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function CreatorWithdrawalForm({ availableBalance, onSuccess, onClose }) {
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("bKash");
    const [accountDetails, setAccountDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!amount || Number(amount) <= 0) {
            return setError("Please enter a valid amount.");
        }
        if (Number(amount) > availableBalance) {
            return setError("Insufficient balance.");
        }
        if (!accountDetails) {
            return setError("Please provide your account details.");
        }

        setLoading(true);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

            const res = await fetch(`${backendUrl}/api/withdrawals`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: Number(amount),
                    paymentMethod,
                    accountDetails,
                }),
            });

            const data = await res.json();

            if (data.success) {
                onSuccess();
                onClose();
            } else {
                setError(data.message || "Something went wrong.");
            }
        } catch (err) {
            setError("Failed to connect to backend server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-base-content mb-1">Request Withdrawal</h3>
                <p className="text-xs text-base-content/60 mb-4">
                    Available Balance: <span className="font-bold text-primary">{availableBalance} Credits</span>
                </p>

                {error && (
                    <div className="alert alert-error py-2 text-sm rounded-xl mb-4">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label py-1 text-xs font-medium text-base-content/70">Amount (Credits)</label>
                        <input
                            type="number"
                            placeholder="e.g. 500"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="input input-bordered w-full bg-base-200 focus:outline-none rounded-xl text-sm"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label py-1 text-xs font-medium text-base-content/70">Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="select select-bordered w-full bg-base-200 focus:outline-none rounded-xl text-sm"
                        >
                            <option value="bKash">bKash (Sandbox)</option>
                            <option value="Nagad">Nagad (Sandbox)</option>
                            <option value="Bank Transfer">Bank Transfer (Sandbox)</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label py-1 text-xs font-medium text-base-content/70">Account Details</label>
                        <textarea
                            placeholder="Enter number or bank details..."
                            value={accountDetails}
                            onChange={(e) => setAccountDetails(e.target.value)}
                            className="textarea textarea-bordered w-full bg-base-200 focus:outline-none rounded-xl text-sm h-20 resize-none"
                            required
                        ></textarea>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="btn btn-ghost flex-1 rounded-xl normal-case">Cancel</button>
                        <button type="submit" className="btn btn-primary flex-1 rounded-xl normal-case text-white" disabled={loading}>
                            {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Submit Request"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}