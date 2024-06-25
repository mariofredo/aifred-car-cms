import {NoImage, PencilIcon, TrashIcon} from '@/public';
import {formatDate} from '@/utils';
import {Button} from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import React, {useCallback} from 'react';

export default function TableItem({
  obj,
  listKey,
  idx,
}: {
  obj: {[key: string]: any};
  listKey: string[];
  idx: number;
}) {
  const handleView = useCallback((key: string) => {
    switch (key) {
      case 'is_active':
        return (
          <td>
            <span
              className={`table_status ${obj[key] === 1 ? 'publish' : 'draft'}`}
            >
              {obj[key] === 1 ? 'Publish' : 'Draft'}
            </span>
          </td>
        );
      case 'image':
        return (
          <td className='flex items-center justify-center'>
            <Image
              src={obj?.image || NoImage}
              height={200}
              width={300}
              alt={`gambar`}
              className='rounded-md'
            />
          </td>
        );
      default:
        return <td>{obj[key]}</td>;
    }
  }, []);
  return (
    <tr key={`cat_${idx}`}>
      {listKey.map((key) => (
        <>
          {key === 'is_active' ? (
            <td>
              <span
                className={`table_status ${
                  obj[key] === 1 ? 'publish' : 'draft'
                }`}
              >
                {obj[key] === 1 ? 'Publish' : 'Draft'}
              </span>
            </td>
          ) : key === 'image' ? (
            <td className='flex items-center justify-center'>
              <Image
                src={obj?.image || NoImage}
                height={200}
                width={300}
                alt={`gambar`}
                className='rounded-md'
              />
            </td>
          ) : key === 'created_at' ? (
            <td>{formatDate(obj[key])}</td>
          ) : key === 'object_id' ? (
            <td>
              <div className='flex flex-col gap-[10px]'>
                <Link
                  href={`/dashboard/variant/${obj[key]}`}
                  className='w-full'
                >
                  <Button
                    borderRadius='5px'
                    bgColor='rgba(101, 57, 228, 0.58)'
                    color='#fff'
                    text='Variant List'
                    width='100%'
                    padding='3.5px'
                  />
                </Link>
                <Link href={`/dashboard/comparison/${obj[key]}`}>
                  <Button
                    borderRadius='5px'
                    bgColor='rgba(228, 57, 57, 0.58)'
                    color='#fff'
                    text='Comparison List'
                    width='100%'
                    padding='3.5px'
                  />
                </Link>
              </div>
            </td>
          ) : key === 'detail' ? (
            <td className='table_pencil'>
              <Image
                src={PencilIcon}
                className='w-[20px] h-[20px]'
                alt='return_icon'
                onClick={() => {}}
              />
            </td>
          ) : key === 'option' ? (
            <td className='table_dots'>
              <Image
                src={TrashIcon}
                alt='trash_icon'
                className='w-[20px] h-[20px]'
                onClick={() => {}}
              />
            </td>
          ) : (
            <td>{obj[key]}</td>
          )}
        </>
      ))}
    </tr>
  );
}
