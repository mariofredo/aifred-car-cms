'use client';
import Image from 'next/image';
import {ReturnIcon, SliderIcon, PencilIcon, NoImage, TrashIcon} from '@/public';
import {HiDotsVertical} from 'react-icons/hi';
import {useRouter} from 'next/navigation';
import {Button} from '@/components';
import Link from 'next/link';
import {useCallback} from 'react';
import {formatDate} from '@/utils';
import '@/styles/table.scss';
import {useProduct} from '@/context';
import {useComparison} from '@/context/comparisonContext';
export default function Table({
  listTitle = [],
  data = [],
  type = '',
  subType = '',
  listKey = [],
  id,
  onClickOption,
}: {
  listTitle?: string[];
  data?: {[key: string]: any}[];
  type?: string;
  subType?: string;
  listKey?: string[];
  id: string;
  onClickOption?: () => {};
}) {
  const router = useRouter();
  const {deleteComparison, getListComparison} = useComparison();
  const {deleteProduct, getListProduct} = useProduct();
  const handleOnClick = useCallback(
    async (obj: {[key: string]: any}, subType: string) => {
      switch (subType) {
        case 'comparison':
          const resDeleteComparison = await deleteComparison(id, obj.object_id);
          if (resDeleteComparison.code === 200) await getListComparison(id);
          return;
        case '':
          return;
        default:
          const resDeleteProduct = await deleteProduct(obj.object_id);
          if (resDeleteProduct.code === 200) await getListProduct();
          return;
      }
    },
    [subType]
  );
  const handleNavigation = useCallback(
    (subType: string, obj: {[key: string]: any}) => {
      switch (subType) {
        case 'question':
          return router.push(`/dashboard/question/${obj.unique_id}`);
        case 'comparison':
          return router.push(
            `/dashboard/comparison/${id}/edit/${obj.object_id}`
          );
        case 'variant':
          return router.push(`/dashboard/variant/${id}/edit/${obj.object_id}`);
        default:
          return router.push(`/dashboard/product/${id}`);
      }
    },
    [subType]
  );

  const handleViewBody = useCallback(
    (
      type: string,
      subType: string,
      data: {[key: string]: any}[],
      listKey: string[],
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
                    <td>{formatDate(el[key])}</td>
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
              <tr key={`cat_${i}`}>
                {listKey.map((key) => (
                  <>
                    {key === 'is_active' ? (
                      <td>
                        <span
                          className={`table_status ${
                            el[key] === 1 ? 'publish' : 'draft'
                          }`}
                        >
                          {el[key] === 1 ? 'Publish' : 'Draft'}
                        </span>
                      </td>
                    ) : key === 'image' ? (
                      <td className='flex items-center justify-center'>
                        <Image
                          src={el?.image || NoImage}
                          height={200}
                          width={300}
                          alt={`gambar`}
                          className='rounded-md'
                        />
                      </td>
                    ) : key === 'created_at' ? (
                      <td>{formatDate(el[key])}</td>
                    ) : key === 'object_id' ? (
                      <td>
                        <div className='flex flex-col gap-[10px]'>
                          <Link
                            href={`/dashboard/variant/${el[key]}`}
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
                          <Link href={`/dashboard/comparison/${el[key]}`}>
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
                          onClick={() => handleNavigation(subType, el)}
                        />
                      </td>
                    ) : key === 'option' ? (
                      <td className='table_dots'>
                        <Image
                          src={TrashIcon}
                          alt='trash_icon'
                          className='w-[20px] h-[20px]'
                          onClick={() => {
                            handleOnClick(el, subType);
                          }}
                        />
                      </td>
                    ) : (
                      <td>{el[key]}</td>
                    )}
                  </>
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
          {listTitle.map((title, i) =>
            title === 'Detail' ? (
              <th key={title + i} className='table_pencil'>
                <Image
                  src={ReturnIcon}
                  className='w-[20px] h-[15px]'
                  alt='return_icon'
                />
              </th>
            ) : title === 'Option' ? (
              <th key={title + i} className='table_dots'>
                <Image
                  src={SliderIcon}
                  className='w-[20px] h-[20px]'
                  alt='slider_icon'
                />
              </th>
            ) : (
              <th key={title + i}>{title}</th>
            )
          )}
        </tr>
      </thead>
      <tbody>{handleViewBody(type, subType, data, listKey)}</tbody>
    </table>
  );
}
