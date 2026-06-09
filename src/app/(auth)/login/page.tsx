"use client";

import ValidationLoginForm from "@/features/login/components/ValidationLoginForm";

const LoginPage = () => {
  return (
    <div
      className="flex items-center justify-center w-full 
      pt-10 pb-20 px-6 
    md:pt-20 md:pb-25 md:px-13
    lg:px-0    
    "
    >
      <ValidationLoginForm />
    </div>
  );
};

export default LoginPage;
