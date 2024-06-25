'use client';
import {Button, DefaultContainer, Table, TablePagination} from '@/components';
import {useComparison} from '@/context/comparisonContext';
import {CirclePlus} from '@/public';
import {Comparison} from '@/types';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {IoSearch} from 'react-icons/io5';

interface Payload {
  keyword: string;
}
export default function DashboardComparisonList() {
  const {id}: {id: string} = useParams();
  const {getListComparison} = useComparison();
  const [comparison, setComparison] = useState<Comparison[]>([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    currentPage: 1,
    totalCount: 0,
  });
  const [payload, setPayload] = useState<Payload>({
    keyword: '',
  });
  const callListVariant = useCallback(
    async (id: string) => {
      const {data, total_data} = await getListComparison(id, {
        page: pagination.currentPage,
        limit: pagination.limit,
        ...payload,
      });
      setComparison(data);
      setPagination((prev) => ({
        ...prev,
        totalCount: total_data,
      }));
    },
    [comparison, pagination, payload]
  );

  useEffect(() => {
    callListVariant(id);
  }, [pagination.currentPage]);
  return (
    <DefaultContainer title='Comparison List'>
      <div className='dc_ctr'>
        <div className='dc_table_ctr'>
          <div className='dc_action_ctr'>
            <Link href={`/dashboard/comparison/${id}/create`}>
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
                'Brand',
                'Name',
                'Status',
                'Date Created',
                'Image',
                'Detail',
                'Option',
              ]}
              data={comparison}
              listKey={[
                'brand',
                'name',
                'is_active',
                'created_at',
                'image',
                'detail',
                'option',
              ]}
              type={'product'}
              subType={'comparison'}
              id={id}
            />
          </div>
          <TablePagination
            pagination={pagination}
            setPagination={setPagination}
            limit={pagination.limit}
          />
        </div>
      </div>
    </DefaultContainer>
  );
}
