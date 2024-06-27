'use client';
import {useState} from 'react';
import {IoMdEye, IoMdEyeOff} from 'react-icons/io';
import '@/styles/inputPassword.scss';

interface InputPasswordProps {
  label: string;
  value: string;
  name: string;
  onChange: (e: any) => void;
}

export default function InputPassword({
  label,
  value,
  name,
  onChange,
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='input_ctr'>
      <label>{label}</label>
      <div className='w-[400px] relative'>
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          name={name}
          onChange={onChange}
        />
        <span className='password-toggle' onClick={togglePasswordVisibility}>
          {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
        </span>
      </div>
    </div>
  );
}
