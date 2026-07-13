import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const CREDIT_PACKAGES = {
    small: { credits: 100, priceUsd: 10 },
    medium: { credits: 500, priceUsd: 50 },
    large: { credits: 1000, priceUsd: 100 },
};

export async function POST(req) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        const { packageId } = await req.json();
        const pkg = CREDIT_PACKAGES[packageId];

        if (!pkg) {
            return NextResponse.json({ message: "Invalid package" }, { status: 400 });
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `${pkg.credits} Credits`,
                            description: "FundRise platform credits",
                        },
                        unit_amount: pkg.priceUsd * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId: session.user.id,
                credits: pkg.credits.toString(),
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/supporter/purchase-credit`,
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (err) {
        console.error("Checkout session error:", err);
        return NextResponse.json({ message: "Failed to create session" }, { status: 500 });
    }
}