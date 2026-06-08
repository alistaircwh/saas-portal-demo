import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, devices, message } = body;

    if (!name || !email || !company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Log the enquiry server-side (replace with email/CRM integration)
    console.log("New MTD enquiry:", { name, email, company, devices, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
