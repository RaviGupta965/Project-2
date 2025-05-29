"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useRouter } from "next/navigation";
const schema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

function page() {
  const router=useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [status, setStatus] = useState("");
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: values.newPassword }),
      });
      console.log(res);
      const result = await res.json();
      if (res.ok) {
        setStatus("Password changed successfully!");
        alert('Password changed Succesfully')
        form.reset();
        router.push('/')
      } else {
        setStatus(result.error || "Password change failed");
      }
    } catch (error) {
      console.log(error);
      setStatus("Server error. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-[#f0f8ff] border border-gray-300 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="New password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm new password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Reset Password</Button>
          {status && <p className="text-sm text-red-500">{status}</p>}
        </form>
      </Form>
    </div>
  );
}

export default page;