'use client';
import React from 'react';
import ReactSelect, {ActionMeta, SingleValue, GroupBase} from 'react-select';
import '@/styles/select.scss';

interface SelectProps {
  options?: {
    label: string;
    value: string;
  }[];
  isClearable?: boolean;
  isSearchable?: boolean;
  label?: string;
  name?: string;
  value: {
    label: string;
    value: string;
  } | null;
  onChange?: (
    newValue: SingleValue<{
      label: string;
      value: string;
    }>,
    actionMeta: ActionMeta<{
      label: string;
      value: string;
    }>
  ) => void;
  isDisabled?: boolean;
}
export default function Select({
  options = [],
  isClearable = false,
  isSearchable = false,
  label = '',
  name = '',
  value,
  onChange,
  isDisabled = false,
}: SelectProps) {
  return (
    <div className='select_ctr'>
      {label && <div className='select_label'>{label}</div>}
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
        name={name}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
      />
    </div>
  );
}
