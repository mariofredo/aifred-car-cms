'use client';
import React, {ChangeEvent, useCallback, useState} from 'react';
import Image from 'next/image';
import {SPFK} from '@/public';
import {IoMdEye, IoMdEyeOff} from 'react-icons/io';
import Link from 'next/link';

export default function RegisterForm() {
  const [payload, setPayload] = useState({
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setPayload((prev) => ({...prev, [name]: value}));
    },
    [payload]
  );
  return (
    <div className='register_form'>
      <div className='register_title'>Sign Up</div>
      <input
        type='email'
        name='email'
        placeholder='Enter email'
        className='register_input_style'
        value={payload.email}
      />
      <input
        type='text'
        name='firstname'
        placeholder='First name'
        className='register_input_style'
        value={payload.firstname}
      />
      <input
        type='text'
        name='lastname'
        placeholder='Last name'
        className='register_input_style'
        value={payload.lastname}
      />
      <input
        type='text'
        name='phone'
        placeholder='Phone number'
        className='register_input_style'
        value={payload.phone}
      />
      <div className='register_pass_ctr'>
        <input
          type={showPassword.password ? 'text' : 'password'}
          name='password'
          placeholder='Password'
          className='register_password_style'
          onChange={handleOnChange}
          value={payload.password}
        />
        {showPassword.password ? (
          <IoMdEye
            className='w-[25px] h-[25px] absolute right-[20px] top-[50%] transform translate-y-[-50%]'
            onClick={() =>
              setShowPassword((prev) => ({...prev, password: false}))
            }
          />
        ) : (
          <IoMdEyeOff
            className='w-[25px] h-[25px] absolute right-[20px] top-[50%] transform translate-y-[-50%]'
            onClick={() =>
              setShowPassword((prev) => ({...prev, password: true}))
            }
          />
        )}
      </div>
      <div className='register_pass_ctr'>
        <input
          type={showPassword.confirmPassword ? 'text' : 'password'}
          name='confirmPassword'
          placeholder='Confirm password'
          className='register_password_style'
          onChange={handleOnChange}
          value={payload.confirmPassword}
        />
        {showPassword.confirmPassword ? (
          <IoMdEye
            className='w-[25px] h-[25px] absolute right-[20px] top-[50%] transform translate-y-[-50%]'
            onClick={() =>
              setShowPassword((prev) => ({...prev, confirmPassword: false}))
            }
          />
        ) : (
          <IoMdEyeOff
            className='w-[25px] h-[25px] absolute right-[20px] top-[50%] transform translate-y-[-50%]'
            onClick={() =>
              setShowPassword((prev) => ({...prev, confirmPassword: true}))
            }
          />
        )}
      </div>
      <div className='register_tc_ctr'>
        <div className='register_tc_wrapper'>
          <input type='checkbox' name='rememberMe' id='rememberMe' />
          <label htmlFor='rememberMe'>I accept all terms and conditions</label>
        </div>
      </div>
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {}}>
        Register
      </button>
      <div className='register_already_have_account'>
        Already have an account?{' '}
        <Link href={'/login'} className='register_login_link'>
          Log in
        </Link>
      </div>
    </div>
  );
}
