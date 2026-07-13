import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { ObjectId } from "mongodb";


export async function GET(req) {
    try {

        const db = await connectDB();

        const { searchParams } = new URL(req.url);
        const creatorId = searchParams.get("creatorId");

        if (!creatorId) {
            return NextResponse.json({ success: false, message: "Creator ID is required" }, { status: 400 });
        }

        const withdrawals = await db
            .collection("withdrawals")
            .find({ creatorId: creatorId })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ success: true, data: withdrawals });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}


export async function POST(req) {
    try {
        const db = await connectDB();
        const body = await req.json();
        const { creatorId, amount, paymentMethod, accountDetails } = body;

        if (!creatorId || !amount || !paymentMethod || !accountDetails) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
        }

        const withdrawAmount = Number(amount);

        const campaigns = await db
            .collection("campaigns")
            .find({ creatorId: creatorId })
            .toArray();

        const totalEarned = campaigns.reduce((sum, camp) => sum + (camp.raisedCredits || 0), 0);

        const existingWithdrawals = await db
            .collection("withdrawals")
            .find({
                creatorId: creatorId,
                status: { $in: ["pending", "approved"] }
            })
            .toArray();

        const totalWithdrawnOrPending = existingWithdrawals.reduce((sum, w) => sum + w.amount, 0);

        const availableBalance = totalEarned - totalWithdrawnOrPending;

        if (withdrawAmount > availableBalance) {
            return NextResponse.json({
                success: false,
                message: `Insufficient balance. Available: ${availableBalance} credits.`
            }, { status: 400 });
        }

        const newWithdrawal = {
            creatorId,
            amount: withdrawAmount,
            paymentMethod,
            accountDetails,
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection("withdrawals").insertOne(newWithdrawal);

        return NextResponse.json({
            success: true,
            message: "Withdrawal request submitted successfully",
            data: { _id: result.insertedId, ...newWithdrawal }
        });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}