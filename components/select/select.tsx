'use client';
import React from 'react';
import ReactSelect from 'react-select';
import '@/styles/select.scss';
interface SelectProps {
  options?: {label: string; value: string}[];
  isClearable?: boolean;
  isSearchable?: boolean;
  label?: string;
}
export default function Select({
  options = [],
  isClearable = false,
  isSearchable = false,
  label = '',
}: SelectProps) {
  return (
    <div className='select_ctr'>
      <div className='select_label'>{label}</div>
      <ReactSelect
        isClearable={isClearable}
        options={options}
        isSearchable={isSearchable}
        styles={{
          control: (styles) => {
            return {
              ...styles,
              borderRadius: '10px',
              fontSize: '24px',
              color: '#3e3e3e',
              fontWeight: '600',
              letterSpacing: '-1.2px',
            };
          },
          container: (styles) => {
            return {...styles};
          },
        }}
      />
    </div>
  );
}
