'use client';
import Image from 'next/image';
import {ReturnIcon, SliderIcon, PencilIcon, NoImage} from '@/public';
import {HiDotsVertical} from 'react-icons/hi';
import {useRouter} from 'next/navigation';
import {Button} from '@/components';
import '@/styles/table.scss';
export default function Table({
  listTitle,
  data,
  type,
  listKey,
  productId,
}: {
  listTitle: string[];
  data: {[key: string]: any}[];
  type: string;
  listKey: string[];
  productId: number | null;
}) {
  const router = useRouter();
  return (
    <table>
      <thead>
        <tr>
          {listTitle.map((title) => (
            <th>{title}</th>
          ))}
          <th className='table_action'></th>
          <th className='table_pencil'>
            <Image
              src={ReturnIcon}
              className='w-[20px] h-[15px]'
              alt='return_icon'
            />
          </th>
          <th className='table_dots'>
            <Image
              src={SliderIcon}
              className='w-[20px] h-[20px]'
              alt='slider_icon'
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((el, i) =>
          type === 'question' ? (
            <tr key={`question_${i}`}>
              {listKey.map((key) => (
                <td>{el[key]}</td>
              ))}
              <td className='table_pencil'>
                <Image
                  src={PencilIcon}
                  className='w-[20px] h-[20px]'
                  alt='return_icon'
                  onClick={() => {
                    router.push(`/dashboard/question/${el.batch}`);
                  }}
                />
              </td>
              <td className='table_dots'>
                <HiDotsVertical className='w-[20px] h-[20px]' />
              </td>
            </tr>
          ) : (
            <tr key={`cat_${i}`}>
              {listKey.map((key) => (
                <>
                  {key === 'status' ? (
                    <td>
                      <span
                        className={`table_status ${
                          el[key] ? 'publish' : 'draft'
                        }`}
                      >
                        {el[key] ? 'Publish' : 'Draft'}
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
                  ) : (
                    <td>{el[key]}</td>
                  )}
                </>
              ))}
              {/* <td>
                <div>John Doe</div>
                <div className='table_date'>18 January 2024</div>
              </td> */}
              <td>
                <div className='flex flex-col gap-[10px]'>
                  <Button
                    borderRadius='5px'
                    bgColor='rgba(101, 57, 228, 0.58)'
                    color='#fff'
                    text='Variant List'
                  />
                  <Button
                    borderRadius='5px'
                    bgColor='rgba(228, 57, 57, 0.58)'
                    color='#fff'
                    text='Comparison List'
                  />
                </div>
              </td>
              <td className='table_pencil'>
                <Image
                  src={PencilIcon}
                  className='w-[20px] h-[20px]'
                  alt='return_icon'
                  onClick={() =>
                    type === 'comparison'
                      ? router.push(
                          `/dashboard/comparisonProduct/${el.object_id}?category_level_1_product_id=${productId}`
                        )
                      : router.push(`/dashboard/product/${el.object_id}`)
                  }
                />
              </td>
              <td className='table_dots'>
                <HiDotsVertical className='w-[20px] h-[20px]' />
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
