'use client';
import {ReactNode} from 'react';
import '@/styles/defaultContainer.scss';
export default function DefaultContainer({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className='dc_ctr'>
      <div className='dc_title'>{title}</div>
      {children}
    </div>
  );
}
