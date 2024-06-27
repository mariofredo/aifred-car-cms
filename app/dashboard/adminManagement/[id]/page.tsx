'use client';
import {ChangeEvent, useCallback, useMemo, useState} from 'react';
import {useRouter} from 'next/navigation';
import {
  Button,
  DefaultContainer,
  Input,
  ModalChangePassword,
} from '@/components';
import '@/styles/userManagement.scss';

export default function page() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [payload, setPayload] = useState({
    name: '',
    phone_number: '',
    username: '',
    email: '',
    is_active: 1,
  });
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = e.target;
      setPayload((prev) => ({...prev, [name]: value}));
    },
    [payload]
  );

  const handleRenderModal = useMemo(
    () =>
      modal && (
        <ModalChangePassword
          currentPassword={''}
          newPassword={''}
          confirmNewPassword={''}
          onChangeCurrentPassword={() => {}}
          onChangeNewPassword={() => {}}
          onChangeConfirmNewPassword={() => {}}
          onCancel={() => setModal(false)}
          onDone={() => {}}
        />
      ),
    [modal]
  );

  return (
    <DefaultContainer title='Edit Admin Details'>
      {handleRenderModal}
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
              id='phone_number'
              type='text'
              name='phone_number'
              onChange={handleChange}
              value={payload.phone_number}
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
              label='E-MAIL ADDRESS'
              id='email'
              type='text'
              name='email'
              onChange={handleChange}
              value={payload.email}
              placeholder='Enter email'
            />
          </div>
        </div>
      </div>
      <div>
        <Button
          text='Change Password'
          bgColor='#DFDFDF'
          padding='10px 21px'
          borderRadius='12px'
          onClick={() => setModal(true)}
        />
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
            onClick={() => router.push('/dashboard/userManagement')}
          >
            Cancel
          </button>
          <button
            className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf] bg-[#dfdfdf]'
            onClick={() => {}}
          >
            Done
          </button>
        </div>
      </div>
    </DefaultContainer>
  );
}
