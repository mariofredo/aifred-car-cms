'use client';
import {DefaultContainer, Input} from '@/components';
import React, {ChangeEvent, useCallback, useState} from 'react';
import '@/styles/account.scss';
export default function DashboardAccount() {
  const [payload, setPayload] = useState({
    firstname: '',
    lastname: '',
    dob: '',
  });
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = e.target;
      setPayload((prev) => ({...prev, [name]: value}));
    },
    [payload]
  );
  return (
    <DefaultContainer title='My Account'>
      <div className='da_pi_ctr'>
        <p className='da_pi'>Personal Information</p>
        <div className='da_pi_name_input'>
          <Input
            id='da_pi_firstname'
            type='text'
            name='firstname'
            onChange={handleChange}
            value={payload.firstname}
            placeholder='Enter firstname'
          />
          <Input
            id='da_pi_lastname'
            type='text'
            name='lastname'
            onChange={handleChange}
            value={payload.lastname}
            placeholder='Enter lastname'
          />
        </div>
      </div>
    </DefaultContainer>
  );
}
