// import { NextResponse } from "next/server";
// import { stripe } from "@/lib/stripe";
// import { db } from "@/lib/auth";
// import { ObjectId } from "mongodb";

// export async function POST(req) {
//     try {
//         const { sessionId } = await req.json();

//         if (!sessionId) {
//             return NextResponse.json({ message: "Missing session ID" }, { status: 400 });
//         }

//         const session = await stripe.checkout.sessions.retrieve(sessionId);

//         if (session.payment_status !== "paid") {
//             return NextResponse.json({ message: "Payment not completed" }, { status: 400 });
//         }

//         // Duplicate check — same session
//         const existing = await db.collection("creditPurchases").findOne({
//             stripeSessionId: session.id,
//         });

//         if (existing) {
//             return NextResponse.json({
//                 message: "Already processed",
//                 credits: existing.credits,
//             });
//         }

//         const { userId, credits } = session.metadata;

//         await db.collection("user").updateOne(
//             { _id: new ObjectId(userId) },
//             { $inc: { credits: Number(credits) } }
//         );

//         await db.collection("creditPurchases").insertOne({
//             userId,
//             credits: Number(credits),
//             amountUsd: session.amount_total / 100,
//             stripeSessionId: session.id,
//             status: "completed",
//             createdAt: new Date(),
//         });

//         return NextResponse.json({
//             message: "Credits added successfully",
//             credits: Number(credits),
//         });
//     } catch (err) {
//         console.error("Verify session error:", err);
//         return NextResponse.json({ message: "Failed to verify session" }, { status: 500 });
//     }
// }

//2

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function POST(req) {
    try {
        const { sessionId } = await req.json();

        if (!sessionId) {
            return NextResponse.json({ message: "Missing session ID" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
            return NextResponse.json({ message: "Payment not completed" }, { status: 400 });
        }

        // Duplicate check — prevent processing the same session multiple times
        const existing = await db.collection("creditPurchases").findOne({
            stripeSessionId: session.id,
        });

        if (existing) {
            return NextResponse.json({
                message: "Already processed",
                credits: existing.credits,
            });
        }

        const { userId, credits } = session.metadata;

        // Update the user's total credit balance
        await db.collection("user").updateOne(
            { _id: new ObjectId(userId) },
            { $inc: { credits: Number(credits) } }
        );

        // Record the transaction history into the creditPurchases collection
        await db.collection("creditPurchases").insertOne({
            userId,
            credits: Number(credits),
            amountUsd: session.amount_total / 100,
            stripeSessionId: session.id,
            status: "completed",
            createdAt: new Date(),
        });

        return NextResponse.json({
            message: "Credits added successfully",
            credits: Number(credits),
        });
    } catch (err) {
        console.error("Verify session error:", err);
        return NextResponse.json({ message: "Failed to verify session" }, { status: 500 });
    }
}