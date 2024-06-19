'use client';
import React from 'react';
import ReactSelect from 'react-select';
import '@/styles/select.scss';
interface SelectProps {
  options?: {label: string; value: string}[];
  isClearable?: boolean;
  isSearchable?: boolean;
}
export default function Select({
  options = [],
  isClearable = false,
  isSearchable = false,
}: SelectProps) {
  return (
    <div className='select_ctr'>
      <ReactSelect
        isClearable={isClearable}
        options={options}
        isSearchable={isSearchable}
      />
    </div>
  );
}
