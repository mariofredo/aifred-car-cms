import {useSidebar} from '@/context/sideBarContext';
import {FaChevronDown} from 'react-icons/fa6';
import Link from 'next/link';
import {useState} from 'react';
import Image, {StaticImageData} from 'next/image';
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';
interface MenuLinkProps {
  title: string;
  path: string;
  icon: StaticImageData | string;
  type: string;
  subMenu: {
    subMenuTitle: string;
    path: string;
  }[];
}
interface FlagSubMenu {
  product: boolean;
}
export default function MenuLink({
  title,
  path,
  icon,
  type,
  subMenu,
}: MenuLinkProps) {
  const router = useRouter();
  const [flagSubMenu, setFlagSubMenu] = useState<FlagSubMenu>({product: false});
  return (
    <>
      {type === 'normal' ? (
        <div
          className={`flex items-center gap-4 px-4 justify-between  m-2  hover:bg-[#F6F6F6] hover:rounded-md text-[#B5B5B5]`}
          onClick={async () => {
            if (title === 'Logout') {
              await Cookies.remove('token');
              router.push(path);
            }
          }}
        >
          <div
            className={`flex items-center justify-center
              flex-row  py-[20px] text-base gap-4`}
          >
            {icon && (
              <Image src={icon} alt={`${title}_Icon`} width={22} height={22} />
            )}
            {title}
          </div>
        </div>
      ) : (
        <div className='relative'>
          <div
            className={`flex items-center text-base gap-4 px-4 py-[20px] justify-between m-2  hover:bg-[#F6F6F6] hover:rounded-md text-[#B5B5B5]`}
            onClick={() =>
              setFlagSubMenu({...flagSubMenu, product: !flagSubMenu['product']})
            }
          >
            {title}
            <FaChevronDown color='#B5B5B5' />
          </div>
          {flagSubMenu.product &&
            subMenu.map((el) => (
              <Link
                href={el.path}
                className={`flex items-center text-base gap-4 px-4 py-[20px] justify-between m-2  hover:bg-[#F6F6F6] hover:rounded-md text-[#B5B5B5] border-[2px] rounded-md`}
              >
                {el.subMenuTitle}
              </Link>
            ))}
        </div>
      )}
    </>
  );
}
