import connectToDB from "../../../utils/DB_CONNECT";
import Query from "@/models/Query.schema";
import { NextResponse } from "next/server";
import { sendmail } from "@/utils/query_confirmation_mail";
export async function POST(request) {
  try {
    const { username, email, phone, message } = await request.json();
    await connectToDB();
    const newQuery = new Query({ username, email, Phone:phone, query:message });
    await newQuery.save();
    sendmail(email);
    return NextResponse.json({ message: "Query Sent Successfully" });
  } catch (error) {
    console.log("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}