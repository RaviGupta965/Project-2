"use client";

import React, { useEffect } from "react";
import { useState } from "react";
function page() {
  const [captcha, setcaptcha] = useState("");
  const [formData, setformData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    captcha: "",
  });
  const GenerateCaptcha = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newCaptcha += characters[randomIndex];
    }
    console.log(newCaptcha);
    setcaptcha(newCaptcha);
  };

  useEffect(() => {
    GenerateCaptcha();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.email == "" ||
        formData.message == "" ||
        formData.name == ""
      ) {
        alert("Please fill all the required Details");
        return;
      }
      if (formData.captcha != captcha) {
        alert("Captcha Don't match ");
        GenerateCaptcha();
        formData.captcha = "";
      }
      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          captcha: formData.captcha,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      GenerateCaptcha();
      setformData({
        name: "",
        email: "",
        phone: "",
        message: "",
        captcha: "",
      });
      alert("Query submitted successfully");
    } catch (error) {
      console.log("ERROR OCCURED :: ", res.message);
    }
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 text-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 text-gray-300">
              Name*
            </label>
            <input
              id="username"
              name="name"
              type="text"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-300">
              Email*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 text-gray-300">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Phone no."
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 text-gray-300">
              Message*
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          <div>
            <div className="inline-block">
              <label htmlFor="" className="m-1 p-1 text-black bg-white">
                {captcha}
              </label>
            </div>
            <button
              type="button"
              onClick={() => GenerateCaptcha()}
              className="p-1 bg-white text-blue-700 rounded m-2"
            >
              Refresh
            </button>
          </div>
          <input
            className="bg-white text-black"
            placeholder="Enter the captcha"
            type="text"
            onChange={handleChange}
            name="captcha"
            value={formData.captcha}
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
