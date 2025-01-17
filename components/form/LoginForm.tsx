import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import TextInput from "@/components/form/TextInput";
import { Loader } from "lucide-react";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  keepLoggedIn: z.boolean(),
});

const LoginForm = () => {
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      keepLoggedIn: false,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoggingIn(true);
    const result = await signIn("credentials", {
      redirect: true,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
    if (result?.error) {
      console.error(result.error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex mt-6 flex-col w-full md:w-96"
      >
        <TextInput label="Email" type="email" name="email" />
        <TextInput label="Password" type="password" name="password" />
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="keepLoggedIn"
            {...methods.register("keepLoggedIn")}
            className="h-4 w-4 accent-[#5AECE5] rounded focus:ring-0"
          />
          <label
            htmlFor="keepLoggedIn"
            className="ml-2 text-sm text-white underline"
          >
            Keep me logged in
          </label>
        </div>
        <button
          type="submit"
          disabled={loggingIn}
          className="mt-12 bg-[#5AECE5] border-2 justify-center flex items-center border-[#5b9e9b] text-[#1c1c1c] font-bold py-1.5 px-4 rounded"
        >
          Login
          {loggingIn && <Loader size={16} className="animate-spin ml-2" />}
        </button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
