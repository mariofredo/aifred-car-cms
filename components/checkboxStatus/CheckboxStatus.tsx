'use client';
import {useEffect, useState} from 'react';
import './CheckboxStatus.scss';

export default function CheckboxStatus({
  containerClass,
  label,
  onChange,
  isActive,
  type = 'multiple',
}: {
  [key: string]: any;
}) {
  const [active, setActive] = useState(isActive);

  const handleOnClick = (e: any) => {
    if (type !== 'single') setActive((prev: any) => !prev);

    console.log(isActive, 'isActive', label);
    onChange && onChange(e, 'status');
  };

  useEffect(() => {
    if (type !== 'multiple') setActive(isActive);
  }, [isActive]);

  return (
    <button
      className={`${containerClass} ${active ? 'active' : ''}`}
      onClick={handleOnClick}
    >
      <p>{label}</p>
    </button>
  );
}
