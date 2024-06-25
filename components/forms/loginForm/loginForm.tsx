'use client';
import {useCallback, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {SPFK} from '@/public';
import {IoMdEye, IoMdEyeOff} from 'react-icons/io';
import {useRouter} from 'next/navigation';
import Cookie from 'js-cookie';
export default function LoginForm() {
  const router = useRouter();
  const [payload, setPayload] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const {code, data} = await response.json();
        if (code === 200) {
          Cookie.set('token', data.token, {
            expires: new Date(data.expired_at),
          });
          Cookie.set('username', data.username, {
            expires: new Date(data.expired_at),
          });
          router.push('/dashboard');
        }
      }
    },
    [payload, setPayload]
  );
  return (
    <div className='login_form'>
      <div className='login_img_ctr'>
        <Image src={SPFK} alt='spfk_logo' />
      </div>
      <input
        type='text'
        name='username'
        placeholder='Email ID'
        className='email_style'
        value={payload.username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPayload({...payload, [e.target.name]: e.target.value})
        }
      />
      <div className='login_pass_ctr'>
        <input
          type={showPassword ? 'text' : 'password'}
          name='password'
          placeholder='Password'
          className='password_style'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPayload({...payload, [e.target.name]: e.target.value})
          }
          value={payload.password}
        />
        {showPassword ? (
          <IoMdEye
            className='w-[25px] h-[25px] absolute right-[20px] top-[50%] transform translate-y-[-50%]'
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <IoMdEyeOff
            className='w-[25px] h-[25px] absolute right-[20px] top-[50%] transform translate-y-[-50%]'
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>
      <div className='flex justify-between items-center px-2'>
        <div className='login_rm'>
          <input type='checkbox' name='rememberMe' id='rememberMe' />
          <label htmlFor='rememberMe'>Remember Me</label>
        </div>
        <Link className='login_fp' href={'/forgotPassword'}>
          Forgot Password?
        </Link>
      </div>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleLogin(e)}
      >
        Login
      </button>
    </div>
  );
}
