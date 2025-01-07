import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface TextInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  placeholder,
  type,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex text-white text-sm flex-col space-y-2 my-2">
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            placeholder={placeholder ? placeholder : label}
            className="bg-[#303030] placeholder-[#626262] focus:outline-none placeholder:font-medium rounded border border-[#1c1c1c] px-4 text-white py-2"
            type={type}
            {...field}
          />
        )}
      />
      {errors[name] && <p>{errors[name]?.message?.toString()}</p>}
    </div>
  );
};

export default TextInput;
