"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/form/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative min-h-[900px] w-full flex items-center justify-center overflow-hidden">
      <div className="flex flex-col z-10 my-24">
        <Link href="/" className="text-sm text-white">
          Go Home
        </Link>
        <div className="flex flex-col bg-[#212121] px-12 py-10 pb-16 rounded shadow-md">
          <div className="flex flex-col text-white items-center">
            <h1 className="text-5xl font-medium">
              Arena.<span className="font-black text-[#5AECE5]">GG</span>
            </h1>
            <h2 className="text-3xl ">Welcome back!</h2>
            <p className="text-sm mt-2">
              Don&apos;t have an a account?
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
          width={1920}
          height={1080}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
};

export default LoginPage;
