"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Coins, X } from "lucide-react";

export default function ContributeModal({ isOpen, onClose, campaignId, supporterId, currentCredits, onSuccess }) {
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const creditAmount = Number(amount);

        if (!creditAmount || creditAmount <= 0) {
            toast.error("Please enter a valid amount.");
            return;
        }

        if (creditAmount > currentCredits) {
            toast.error("Insufficient credits in your wallet!");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/contributions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    campaignId,
                    supporterId,
                    amount: creditAmount,
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Something went wrong");

            toast.success(`Successfully contributed ${creditAmount} credits!`);
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error(err instanceof Error ? err.message : "Contribution failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-base-100/60 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-md p-6 rounded-box bg-base-200 border border-base-300 shadow-2xl text-center">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-base-content/60 hover:text-base-content transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center mt-2">
                    <div className="p-3 rounded-full bg-primary/10 text-primary border border-primary/20">
                        <Coins size={32} className="drop-shadow-[0_0_8px_rgba(92,255,224,0.4)]" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-base-content">Contribute to Campaign</h3>
                    <p className="mt-1 text-xs text-base-content/60">
                        Your Balance: <span className="text-secondary font-semibold">{currentCredits} Credits</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 text-left">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium text-base-content/85">Amount of Credits</span>
                        </label>
                        <input
                            type="number"
                            min="1"
                            placeholder="Enter credits (e.g. 10)"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={isLoading}
                            className="input input-bordered w-full bg-base-100 border-base-300 text-base-content focus:border-primary focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="btn btn-outline flex-1 rounded-full border-base-300 hover:bg-base-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary flex-1 rounded-full text-primary-content shadow-lg shadow-primary/20"
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                "Confirm"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}