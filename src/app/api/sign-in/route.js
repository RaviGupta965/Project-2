// pages/api/register.js
import connectToDB from "../../../utils/DB_CONNECT";
import User from "../../../models/User.schema.js";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    await connectToDB();

    const userExists = await User.findOne({ username });
    if (!userExists) {
      return NextResponse.json({ message: "User Not exists" }, { status: 400 });
    }

    const isPassvalid=bcrypt.compare(password,userExists.password);

    if(!isPassvalid){
        return NextResponse.json({ message: "Password Not Matched" }, { status: 400 });
    }
    return NextResponse.json({ message: "User Loggedin successfully" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}