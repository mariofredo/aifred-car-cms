'use client';
import Image from 'next/image';
import {ReturnIcon, SliderIcon, PencilIcon, NoImage, TrashIcon} from '@/public';
import {HiDotsVertical} from 'react-icons/hi';
import {useRouter} from 'next/navigation';
import {Button} from '@/components';
import Link from 'next/link';
import {ReactNode, useCallback} from 'react';
import {formatDateUI} from '@/utils';
import '@/styles/table.scss';
import {useModal, useProduct} from '@/context';
import {useComparison} from '@/context/comparisonContext';
export default function Table({
  listTitle = [],
  data = [],
  type = '',
  subType = '',
  listKey = [],
}: {
  listTitle?: ReactNode[];
  data?: {[key: string]: any}[];
  type?: string;
  subType?: string;
  listKey?: string[];
  onClickOption?: () => {};
}) {
  const router = useRouter();
  const handleViewBody = useCallback(
    (
      type: string,
      subType: string,
      data: {[key: string]: any}[],
      listKey: string[]
    ) => {
      switch (type) {
        case 'question':
          return data.map((el, i) => {
            return (
              <tr key={`question_${i}`}>
                {listKey.map((key) =>
                  key === 'detail' ? (
                    <td className='table_pencil'>
                      <Image
                        src={PencilIcon}
                        className='w-[20px] h-[20px]'
                        alt='return_icon'
                        onClick={() => {
                          router.push(`/dashboard/question/${el.unique_id}`);
                        }}
                      />
                    </td>
                  ) : key === 'option' ? (
                    <td className='table_dots'>
                      <HiDotsVertical className='w-[20px] h-[20px]' />
                    </td>
                  ) : key === 'created_at' ? (
                    <td>{formatDateUI(el[key])}</td>
                  ) : key === 'is_active' ? (
                    <td>
                      <span
                        className={`table_status ${
                          el[key] === 1 ? 'publish' : 'draft'
                        }`}
                      >
                        {el[key] === 1 ? 'Publish' : 'Draft'}
                      </span>
                    </td>
                  ) : (
                    <td>{el[key]}</td>
                  )
                )}
              </tr>
            );
          });
        default:
          return data.map((el, i) => {
            return (
              <tr key={`td_${i}`}>
                {listKey.map((key) => (
                  <td>{el[key]}</td>
                ))}
              </tr>
            );
          });
      }
    },
    [type, subType, data]
  );
  return (
    <table>
      <thead>
        <tr key={'title_table'}>
          {listTitle.map((title, i) => (
            <th key={i}>{title}</th>
          ))}
        </tr>
      </thead>
      {data.length === 0 ? (
        <tbody className='ml-4'>
          <tr>
            <td colSpan={listTitle.length}>No Data Found</td>
          </tr>
        </tbody>
      ) : (
        <tbody>{handleViewBody(type, subType, data, listKey)}</tbody>
      )}
    </table>
  );
}
