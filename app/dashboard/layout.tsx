'use client';
import React from 'react';
import {SideBar} from '@/components';
import {useSidebar} from '@/context/sideBarContext';

export default function Layout({children}: {children: React.ReactNode}) {
  const {open} = useSidebar();
  return (
    <div className={`w-full flex pl-[20%]`}>
      <div className={`w-[20%] h-screen flex bg-[#fff] fixed top-0 left-0`}>
        <SideBar />
      </div>
      <div className={`${'w-[100%]'} flex flex-col items-center`}>
        <div className='flex  flex-col p-[20px] w-full'>{children}</div>
      </div>
    </div>
  );
}
