"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TextInput from "@/components/form/TextInput";
import Link from "next/link";
import { Loader } from "lucide-react";

const schema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    terms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const [registering, setRegistering] = useState<boolean>(false);
  const [existingUser, setExistingUser] = useState<boolean>(false);
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      setRegistering(true);
      const response = await fetch("/api/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 409) {
        setRegistering(false);
        setExistingUser(true);
        return;
      }

      window.location.replace("/login");
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex mt-6 flex-col w-full md:w-96"
      >
        {existingUser && (
          <p className="text-red-500 text-sm mb-1">
            User with the same email or username already exists.
          </p>
        )}
        <TextInput label="Email" type="email" name="email" />
        <TextInput label="Username" type="text" name="username" />
        <TextInput label="Password" type="password" name="password" />
        <TextInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            {...methods.register("terms", {
              required: "You must accept the terms and conditions",
            })}
            className="h-4 w-4 accent-[#5AECE5] rounded focus:ring-0"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-white underline">
            <Link href={"/terms"}>
              I have read and accept terms & conditions
            </Link>
          </label>
        </div>
        {methods.formState.errors.terms && (
          <p className="text-red-500 text-sm mt-1">
            {methods.formState.errors.terms.message}
          </p>
        )}
        <button
          type="submit"
          disabled={registering}
          className="mt-12 bg-[#5AECE5] border-2 justify-center flex items-center border-[#5b9e9b] text-[#1c1c1c] font-bold py-1.5 px-4 rounded"
        >
          Create an account
          {registering && <Loader size={16} className="animate-spin ml-2" />}
        </button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
