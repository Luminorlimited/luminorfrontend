import React from "react";
import { cn } from "@/lib/utils"; // Ensure you have this utility or replace it with a className merge utility like clsx or classnames
import { Input } from "@/components/ui/input"; // Path to shadcn input component
import { Label } from "@/components/ui/label"; // Path to shadcn label component

type TInputProps = {
  type: string;
  name: string;
  label?: string; // Optional label
  error?: string; // Error message
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  className?: string; // Custom className for input
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // onChange event handler
};

const MyInput = ({
  type,
  name,
  label,
  error,
  disabled,
  required,
  placeholder,
  defaultValue,
  className,
  onChange, // Added onChange prop
}: TInputProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        className={cn(error && "border-red-500 focus:ring-red-500", className)}
        onChange={onChange} // Pass the onChange handler
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default MyInput;
