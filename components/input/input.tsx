import React, {ChangeEvent} from 'react';
interface InputProps {
  type: string;
  placeholder?: string;
  value: any;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}
export default function Input({
  type = 'text',
  placeholder,
  value,
  name,
  onChange,
  id,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id}></label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
