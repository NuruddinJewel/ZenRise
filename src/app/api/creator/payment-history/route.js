import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";

export async function GET(req) {
    try {
        const db = await connectDB();

        const { searchParams } = new URL(req.url);
        const creatorId = searchParams.get("creatorId");

        if (!creatorId) {
            return NextResponse.json({ success: false, message: "Creator ID is required" }, { status: 400 });
        }

        // "campaigns" (Data Filter)
        const earningsLog = await db
            .collection("campaigns")
            .find(
                { creatorId: creatorId, raisedCredits: { $gt: 0 } },
                { projection: { title: 1, category: 1, raisedCredits: 1, updatedAt: 1 } }
            )
            .sort({ updatedAt: -1 })
            .toArray();

        return NextResponse.json({ success: true, data: earningsLog });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}