"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

function Forgot_password() {
  const router=useRouter()
  const [generatedotp,setgeneratedotp]=useState("");
  const [Status,setStatus]=useState('');
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      otp:""
    },
  });

  const sendotp = async () => {
    try {
      const email=form.getValues('email');
      if (!email) {
        setStatus("Please enter your email.");
        return;
      }
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      const result = await res.json();
      if (res.ok) {
        setgeneratedotp(result.otp);
        alert("OTP sent successfully!");
      } else {
        alert(result.error || "Failed to send OTP");
      }
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    }
  };

  const verifyOTP =()=>{
    const email=form.getValues('email')
    const enteredOtp = form.getValues("otp");
    if (enteredOtp === generatedotp) {
      alert("OTP verified successfully!");
      router.push(`/change-password?email=${email}`);
    } else {
      console.log("Incorrect OTP. Please try again.");
    }
  }
  return (
    <div>
      <div className="flex flex-col px-8 py-4 bg-[#8edeba] rounded-3xl border-2 border-black">
        <div className="m-5 text-blue-800 font-bold text-xl">
          OTP will be sent to the given mail
        </div>
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl className="border-black">
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={sendotp}>Send OTP</Button>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl className="border-black">
                    <Input placeholder="Enter the OTP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='button' onClick={verifyOTP} >verify</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Forgot_password;
