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
    if (userExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}