'use client';
import {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import Cookies from 'js-cookie';
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
  const id = Cookies.get('unique_id_aifred_neo_cms');
  const [modal, setModal] = useState(false);
  const [payload, setPayload] = useState({
    name: '',
    phone: '',
    username: '',
    email: '',
    is_active: 1,
  });
  const [changePassword, setChangePassword] = useState({
    old: '',
    new: '',
    confirm: '',
  });
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = e.target;
      setPayload((prev) => ({...prev, [name]: value}));
    },
    [payload]
  );

  const getUserData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user-management/${id}?type=admin`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Error');
      }
      const {data} = await response.json();
      setPayload(data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleEditUser = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user-management/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
          },
          body: JSON.stringify({
            type: 'admin',
            unique_id: id,
            ...payload,
          }),
        }
      );
      if (!response.ok) {
        const {message} = await response.json();
        throw new Error(message);
      }
      const {code} = await response.json();
      if (code === 200) {
        alert('Your account updated successfully');
        router.refresh();
      }
    } catch (error) {
      alert(error);
    }
  }, [id, payload]);

  const handleChangePassword = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user-management/change-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
          },
          body: JSON.stringify({
            type: 'admin',
            unique_id: id,
            password_old: changePassword.old,
            password: changePassword.new,
            password_confirmation: changePassword.confirm,
          }),
        }
      );
      if (!response.ok) {
        const {message} = await response.json();
        throw new Error(message);
      }
      const {code} = await response.json();
      if (code === 200) {
        setModal(false);
      }
    } catch (error) {
      alert(error);
    }
  }, [id, changePassword]);

  const handleRenderModal = useMemo(
    () =>
      modal && (
        <ModalChangePassword
          currentPassword={changePassword.old}
          newPassword={changePassword.new}
          confirmNewPassword={changePassword.confirm}
          onChangeCurrentPassword={(e) =>
            setChangePassword({...changePassword, old: e.target.value})
          }
          onChangeNewPassword={(e) =>
            setChangePassword({...changePassword, new: e.target.value})
          }
          onChangeConfirmNewPassword={(e) =>
            setChangePassword({...changePassword, confirm: e.target.value})
          }
          onCancel={() => setModal(false)}
          onDone={handleChangePassword}
        />
      ),
    [modal, changePassword]
  );

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <DefaultContainer title='My Account'>
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
              onChange={() => {}}
              value={payload.username}
              placeholder='Enter username'
              readOnly
            />
          </div>
          <div>
            <Input
              label='E-MAIL ADDRESS'
              id='email'
              type='text'
              name='email'
              onChange={() => {}}
              value={payload.email}
              placeholder='Enter email'
              readOnly
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
        />
      </div>
      <div className='col-span-1 flex flex-col gap-[10px]'>
        <div className='flex gap-[20px] mt-[30px] w-[400px]'>
          <button
            className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf]'
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf] bg-[#dfdfdf]'
            onClick={handleEditUser}
          >
            Done
          </button>
        </div>
      </div>
    </DefaultContainer>
  );
}
