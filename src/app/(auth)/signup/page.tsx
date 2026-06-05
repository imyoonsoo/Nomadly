"use client";

import ValidationSignupForm from "@/features/signup/ValidationSignupForm/ValidationSignupForm";

const SignupPage = () => {
  return (
    <div
      className="flex items-center justify-center w-full 
      pt-10 pb-20 px-6 
    md:pt-20 md:pb-25 md:px-13
    lg:px-0    
    "
    >
      <ValidationSignupForm />
    </div>
  );
};

export default SignupPage;
