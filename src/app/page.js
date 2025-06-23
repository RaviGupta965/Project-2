"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 shadow-md">
        <h1 className="text-xl font-bold">NextAuth App</h1>
        <div className="space-x-4">
          <Link
            href="/sign-in"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Register
          </Link>
          <Link
            href="/contact-us"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Contact us
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to the Next.js Auth App</h2>
        <p className="text-lg text-gray-600 max-w-xl">
          This is a secure authentication boilerplate using Next.js, NextAuth, and MongoDB.
          Get started by logging in or creating an account.
        </p>
      </main>

      <footer className="text-center p-4 text-sm text-gray-500">
        &copy; 2025 To-Let Globe App. All rights reserved.
      </footer>
    </div>
  );
}

