import React, {ChangeEvent} from 'react';
interface InputProps {
  type: string;
  placeholder?: string;
  value: any;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({
  type = 'text',
  placeholder,
  value,
  name,
  onChange,
}: InputProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
