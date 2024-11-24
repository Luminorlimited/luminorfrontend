import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"; // Adjust the import path to match your project structure
import { cn } from "@/lib/utils";

type Option = {
  label: string; // Displayed in the dropdown
  value: string | number; // Value associated with the option
};

type MySelectDropdownProps = {
  placeholder?: string; // Placeholder text for the dropdown
  label?: string; // Optional group label
  options: Option[]; // Dropdown options
  className?: string; // Additional custom className for styling
  defaultValue?: string | number; // Default selected value
  onValueChange?: (value: string | number) => void; // Callback for value changes
};

const Dropdown = ({
  placeholder,
  label,
  options,
  className,
  defaultValue, // Default selected value
  onValueChange, // Callback for value changes
}: MySelectDropdownProps) => {
  const handleSelect = (value: string) => {
    const parsedValue = isNaN(Number(value)) ? value : Number(value); // Handle numeric values
    if (onValueChange) onValueChange(parsedValue); // Trigger callback
  };

  return (
    <div className="space-y-2">
      {label && (
        <SelectLabel className="text-sm font-medium">{label}</SelectLabel>
      )}
      <Select
        onValueChange={handleSelect}
        defaultValue={defaultValue?.toString()}
      >
        <SelectTrigger className={cn(className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dropdown;
