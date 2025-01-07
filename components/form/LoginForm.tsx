import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import TextInput from "@/components/form/TextInput";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  keepLoggedIn: z.boolean(),
});

const LoginForm = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      keepLoggedIn: false,
    },
  });

  const onSubmit = async (data: any) => {
    const result = await signIn("credentials", {
      redirect: true,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
    
    if (result?.error) {
      alert(result.error);
    } else if(result?.ok) {
      alert("proslo");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex mt-6 flex-col w-96">
        <TextInput label="Email" type="email" name="email" />
        <TextInput label="Password" type="password" name="password" />
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="keepLoggedIn"
            {...methods.register("keepLoggedIn")}
            className="h-4 w-4 accent-[#5AECE5] rounded focus:ring-0"
          />
          <label htmlFor="keepLoggedIn" className="ml-2 text-sm text-white underline">
            Keep me logged in
          </label>
        </div>
        <button
          type="submit"
          className="mt-12 bg-[#5AECE5] border-2 border-[#5b9e9b] text-[#1c1c1c] font-bold py-1.5 px-4 rounded"
        >
          Login
        </button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;