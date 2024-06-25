'use client';
import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {
  BackButton,
  Button,
  DefaultContainer,
  Table,
  TablePagination,
} from '@/components';
// import '@/styles/variant.scss';
import {useVariant} from '@/context';
import {Variant} from '@/types';
import {useParams} from 'next/navigation';
import {CirclePlus} from '@/public';
import Link from 'next/link';
import {IoSearch} from 'react-icons/io5';
interface Payload {
  keyword: string;
}
export default function page() {
  const {id}: {id: string} = useParams();
  const [pagination, setPagination] = useState({
    limit: 10,
    currentPage: 1,
    totalCount: 0,
  });
  const {getListVariant} = useVariant();
  const [variant, setVariant] = useState<Variant[]>([]);
  const [payload, setPayload] = useState<Payload>({
    keyword: '',
  });
  const callListVariant = useCallback(
    async (id: string) => {
      const {data, total_data} = await getListVariant(id, {
        page: pagination.currentPage,
        limit: pagination.limit,
        ...payload,
      });
      setVariant(data);
      setPagination((prev) => ({
        ...prev,
        totalCount: total_data,
      }));
    },
    [variant, pagination, payload]
  );

  useEffect(() => {
    callListVariant(id);
  }, [pagination.currentPage]);

  return (
    <div className='flex flex-col gap-[15px]'>
      <DefaultContainer title={'Variant List'}>
        <div className='mt-4 flex justify-between'>
          <div>
            <div className='text-[24px] text-[#3e3e3e]'>Product Essentials</div>
            <div className='text-[12px] text-[#b5b5b5]'>
              (<span className='text-[#F31D1E]'>*</span>) are mandatory
            </div>
          </div>
          <BackButton onClick={undefined} />
        </div>
        <div className='dc_table_ctr'>
          <div className='dc_action_ctr'>
            <Link href={`/dashboard/variant/${id}/create`}>
              <Button
                bgColor='#DFDFDF'
                text='Create New'
                borderRadius='12px'
                padding='10px 21px'
                color='#3e3e3e'
                image={CirclePlus}
              />
            </Link>
            <div className='dc_search_ctr'>
              <IoSearch
                color='#b5b5b5'
                // className='w-[20px] h-[20px] absolute top-[50%] left-[15px] transform translate-y-[-50%]'
                className='dc_search_icon'
              />
              <input
                type='text'
                name='keyword'
                placeholder='Search name or sub-series'
                value={payload.keyword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPayload((prev) => ({...prev, keyword: e.target.value}))
                }
              />
            </div>
          </div>
          <div className='dc_table'>
            <Table
              listTitle={[
                'Name',
                'Status',
                'Date Created',
                'Image',
                'Detail',
                'Option',
              ]}
              data={variant}
              listKey={[
                'name',
                'is_active',
                'created_at',
                'image',
                'detail',
                'option',
              ]}
              type={'product'}
              subType='variant'
              id={id}
            />
          </div>
          <TablePagination
            pagination={pagination}
            setPagination={setPagination}
            limit={pagination.limit}
          />
        </div>
      </DefaultContainer>
    </div>
  );
}
