'use client';
import {ChangeEvent, useCallback, useState} from 'react';
import {useRouter} from 'next/navigation';
import Cookies from 'js-cookie';
import {DefaultContainer, Input, InputPassword} from '@/components';
import '@/styles/userManagement.scss';

export default function page() {
  const router = useRouter();
  const [payload, setPayload] = useState({
    name: '',
    phone: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    is_active: 1,
    type: 'admin',
  });
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = e.target;
      setPayload((prev) => ({...prev, [name]: value}));
    },
    [payload]
  );

  const handleAddNewUser = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user-management/store`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        const {message} = await response.json();
        throw new Error(message);
      }
      const {code} = await response.json();
      if (code === 200) {
        router.push('/dashboard/adminManagement');
      }
    } catch (error) {
      alert(error);
    }
  }, [payload]);

  return (
    <DefaultContainer title='Add New Admin'>
      <div className='mb-[30px]'>
        <p className='title mt-[30px]'>Personal Information</p>
        <div className='flex flex-col gap-[30px] mt-[50px]'>
          <div>
            <Input
              label='NAME'
              id='name'
              type='text'
              name='name'
              onChange={handleChange}
              value={payload.name}
              placeholder='Enter name'
            />
          </div>
          <div>
            <Input
              label='PHONE NUMBER'
              id='phone'
              type='text'
              name='phone'
              onChange={handleChange}
              value={payload.phone}
              placeholder='Enter phone number'
            />
          </div>
        </div>
      </div>
      <hr color='#dfdfdf' style={{height: '2px'}} />
      <div>
        <p className='title mt-[30px]'>Account Information</p>
        <div className='flex flex-col gap-[30px] mt-[50px]'>
          <div>
            <Input
              label='USERNAME'
              id='username'
              type='text'
              name='username'
              onChange={handleChange}
              value={payload.username}
              placeholder='Enter username'
            />
          </div>
          <div>
            <Input
              label='E-MAIL ADDRESS'
              id='email'
              type='text'
              name='email'
              onChange={handleChange}
              value={payload.email}
              placeholder='Enter email'
            />
          </div>
          <div>
            <ul className='password_kriteria'>
              <p>Kriteria password:</p>
              <li>Password must have at least 8 characters</li>
              <li>Have at least 1 letter (a, b, c...)</li>
              <li>Have at least 1 number (1, 2, 3...)</li>
              <li>Include both Upper case and Lower case characters</li>
            </ul>
          </div>
          <div>
            <InputPassword
              label={'NEW PASSWORD'}
              value={payload.password}
              name={'password'}
              onChange={(e) =>
                setPayload({...payload, password: e.target.value})
              }
            />
          </div>
          <div>
            <InputPassword
              label={'CONFIRM NEW PASSWORD'}
              value={payload.password_confirmation}
              name={'password_confirmation'}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  password_confirmation: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
      <div className='col-span-1 flex flex-col gap-[10px]'>
        <div className='flex gap-[20px] w-[200px] justify-between items-center'>
          <div className='text-[24px] text-[#3e3e3e]'>Active</div>
          <label className='switch'>
            <input
              type='checkbox'
              checked={payload.is_active === 1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPayload({...payload, is_active: e.target.checked ? 1 : 0})
              }
            />
            <span className='slider round'></span>
          </label>
        </div>
        <div className='flex gap-[20px] mt-[30px] w-[400px]'>
          <button
            className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf]'
            onClick={() => router.push('/dashboard/adminManagement')}
          >
            Cancel
          </button>
          <button
            className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf] bg-[#dfdfdf]'
            onClick={handleAddNewUser}
            disabled={Object.values(payload).includes('')}
            style={{
              cursor: Object.values(payload).includes('')
                ? 'not-allowed'
                : 'pointer',
            }}
          >
            Done
          </button>
        </div>
      </div>
    </DefaultContainer>
  );
}
