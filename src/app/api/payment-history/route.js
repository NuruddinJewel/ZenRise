import { db } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
        }

        // Fetch payment logs matching the user ID and sort by newest first
        const history = await db.collection("creditPurchases")
            .find({ userId: userId })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ success: true, data: history });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}