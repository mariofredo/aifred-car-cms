'use client';
import Image from 'next/image';
import {FaChevronCircleLeft, FaChevronCircleRight} from 'react-icons/fa';
import {SPFK} from '@/public';
import {useSidebar} from '@/context';
import {MENU_ITEMS} from '@/consts';
import {MenuLink} from './menuLink';
import '@/styles/sideBar.scss';

export default function SideBar({}) {
  const {open, setOpen} = useSidebar();

  return (
    <div className='sb_ctr'>
      <div className='sb_img_ctr'>
        <Image
          src={SPFK}
          alt='Logo'
          className={`w-[140px] h-[120px] mt-[40px] mb-[20px]`}
        />
        {/* <div className='sb_toggle' onClick={() => setOpen(!open)}>
          {open ? (
            <FaChevronCircleLeft color='#fff' />
          ) : (
            <FaChevronCircleRight color='#fff' />
          )}
        </div> */}
      </div>
      <div
        className={`sb_ml_ctr ${
          open ? 'h-[calc(100%-180px)]' : 'h-[calc(100%-140px)]'
        }`}
      >
        {MENU_ITEMS.map((item) => (
          <MenuLink
            key={item.title}
            title={item.title}
            path={item.path}
            icon={item.icon}
            subMenu={item.subMenu}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
}
