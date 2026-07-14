import { NextResponse } from "next/server";
import { db } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
    try {
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session) {
            return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
        }

        const creatorId = session.user.id;

        // Creator-All campaign (id)
        const campaigns = await db
            .collection("campaigns")
            .find({ creatorId })
            .toArray();

        const campaignIds = campaigns.map((c) => c._id.toString());
        const campaignMap = Object.fromEntries(campaigns.map((c) => [c._id.toString(), c.title]));

        // Campaign Contribution
        const contributions = await db
            .collection("contributions")
            .find({ campaignId: { $in: campaignIds } })
            .toArray();

        // Creator (Withdrawal Requests)
        const withdrawals = await db
            .collection("withdrawals")
            .find({ creatorId })
            .toArray();

        const contributionEntries = contributions.map((c) => ({
            type: "contribution",
            amount: c.amount,
            campaignTitle: campaignMap[c.campaignId] || "Unknown Campaign",
            date: c.createdAt,
            status: "completed",
        }));

        const withdrawalEntries = withdrawals.map((w) => ({
            type: "withdrawal",
            amount: w.amount,
            paymentMethod: w.paymentMethod,
            date: w.createdAt,
            status: w.status,
        }));

        const history = [...contributionEntries, ...withdrawalEntries].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

        return NextResponse.json({ success: true, data: history });
    } catch (err) {
        console.error("Payment history error:", err);
        return NextResponse.json({ success: false, message: "Failed to fetch payment history" }, { status: 500 });
    }
}