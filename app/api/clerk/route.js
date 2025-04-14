// app/api/webhooks/route.js
import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const wh = new Webhook(process.env.SIGNIN_SECRET);

    // ✅ Get headers (no await needed)
    const headerPayload = headers();
    const svixHeaders = {
        "svix-id": headerPayload.get("svix-id"),
        "svix-timestamp": headerPayload.get("svix-timestamp"),
        "svix-signature": headerPayload.get("svix-signature"),
    };

    const payload = await req.json();
    const body = JSON.stringify(payload);

    let data, type;
    try {
        const verified = wh.verify(body, svixHeaders);
        data = verified.data;
        type = verified.type;
    } catch (err) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    console.log(`✅ Webhook received: ${type}`);

    // Safely structure user data
    const userData = {
        _id: data.id,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.email_addresses?.[0]?.email_address || "",
        image: data.image_url || "",
    };

    try {
        await connectDB();

        switch (type) {
            case "user.created":
                await User.create(userData);
                break;
            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData, { new: true });
                break;
            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                break;
            default:
                return NextResponse.json({ message: `Unhandled event type: ${type}` }, { status: 200 });
        }
    } catch (dbError) {
        console.error("❌ Database error:", dbError);
        return NextResponse.json({ error: "Database operation failed", details: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "✅ Event processed successfully" });
}
