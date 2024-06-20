import {
  ContactIcon,
  DummyBanner,
  DummyProfileIcon,
  MailIcon,
  PencilIcon,
  UserIcon,
} from '@/public';
import Image from 'next/image';
import React, {useState} from 'react';
import '@/styles/homeHeader.scss';
export default function HomeHeader() {
  return (
    <div className='home_header_ctr'>
      <div className='home_header_title'>
        Profile{' '}
        <Image src={PencilIcon} width={15} height={15} alt='pencil_icon' />
      </div>
      <div className='home_header_profile_ctr'>
        <Image
          src={DummyBanner}
          className='header_banner'
          alt='home_header_profile_banner'
        />
        <Image
          src={DummyProfileIcon}
          className='header_profile'
          alt='home_header_profile_company'
        />
        <p className='header_company_name'>Pertamina LTD</p>
      </div>
      <div className='home_header_about'>
        <div className='header_about_title'>About</div>
        <div className='header_about_content'>
          <Image src={UserIcon} width={20} height={20} alt='profile_icon' />
          <p>PIC</p>
          <p>
            Mr. <span className='highlight'>John Doe</span>
          </p>
        </div>
        <div className='header_about_content'>
          <Image src={ContactIcon} width={20} height={20} alt='profile_icon' />
          <p>Contact</p>
          <p>
            +62 <span className='highlight'>811234124</span>
          </p>
        </div>
        <div className='header_about_content'>
          <Image src={MailIcon} width={20} height={20} alt='profile_icon' />
          <p>Email</p>
          <p>
            <span className='highlight'>johndoe@pertamina.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
