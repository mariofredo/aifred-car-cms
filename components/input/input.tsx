import React, {ChangeEvent} from 'react';
import '@/styles/input.scss';
interface InputProps {
  type: string;
  placeholder?: string;
  value: any;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label?: string;
  readOnly?: boolean;
}
export default function Input({
  type = 'text',
  placeholder,
  value,
  name,
  onChange,
  id,
  label,
  readOnly = false,
}: InputProps) {
  return (
    <div className='input_ctrs'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        style={{
          backgroundColor: `${readOnly ? '#DFDFDF' : '#fff'}`,
          cursor: `${readOnly ? 'not-allowed' : 'text'}`,
        }}
      />
    </div>
  );
}
