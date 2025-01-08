"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/form/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative h-auto flex items-center justify-center w-full py-48 px-4 md:px-20">
      <div className="flex flex-col z-10 -mt-20">
        <Link href="/" className="text-sm text-white">
          Go Home
        </Link>
        <div className="flex flex-col bg-[#212121] px-6 md:px-12 py-8 md:py-10 pb-16 rounded shadow-md">
          <div className="flex flex-col text-white items-center">
            <h1 className="text-3xl md:text-5xl font-medium">
              Duo<span className="font-black text-[#5AECE5]">Grind</span>
            </h1>
            <h2 className="text-xl md:text-3xl">Welcome back!</h2>
            <p className="text-center text-sm mt-1 md:mt-2">
              Don&apos;t have an a account?{" "}
              <Link
                className="underline font-bold text-[#5AECE5]"
                href="/register"
              >
                Create an account
              </Link>
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="absolute inset-0 -top-32 overflow-hidden">
        <Image
          src="/assets/background.png"
          alt="Bg"
          quality={100}
          fill
          className="md:h-auto md:w-full w-full h-1/2 object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
