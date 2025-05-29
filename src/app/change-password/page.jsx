import React from "react";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ChangePassword = dynamic(() => import('../components/change-password'), {
  ssr: false,
  suspense: true,
});
import ChangePassword from "../components/change-password";
function page() {
  return (
    <div className="p-8 max-w-md mx-auto bg-[#f0f8ff] border border-gray-300 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
      <Suspense fallback={<p>Loading form...</p>}>
        <ChangePassword />
      </Suspense>
    </div>
  );
}

export default page;
