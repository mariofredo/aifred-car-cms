'use client';
import {useState} from 'react';
import {
  BackButton,
  DefaultContainer,
  Table,
  TablePagination,
} from '@/components';
import '@/styles/variant.scss';

export default function page() {
  const [pagination, setPagination] = useState({
    limit: 10,
    currentPage: 1,
    totalCount: 0,
  });

  return (
    <div className='flex flex-col gap-[15px]'>
      <DefaultContainer title={'Variant List'} />
      <div className='mt-4 flex justify-between'>
        <div>
          <div className='text-[24px] text-[#3e3e3e]'>Product Essentials</div>
          <div className='text-[12px] text-[#b5b5b5]'>
            (<span className='text-[#F31D1E]'>*</span>) are mandatory
          </div>
        </div>
        <BackButton />
      </div>
      <div className='variant_container'>
        <div className='variant_table_ctrs'>
          <Table
            listTitle={[
              'Unique ID',
              'Brand',
              'Date Submitted',
              'Duration',
              'Status',
              'Name',
              'Email',
              'Action',
            ]}
            data={[
              {
                company_brand_name: 'Mitsubishi',
                category_level_1_name: 'Pajero',
                name: 'Dakkar Ultimate 4x4',
                status: 'Publish',
                image: '',
              },
            ]}
            listKey={[
              'company_brand_name',
              'category_level_1_name',
              'name',
              'status',
              'image',
            ]}
            type={'product'}
            productId={null}
          />
        </div>
        <TablePagination
          pagination={pagination}
          setPagination={setPagination}
          limit={pagination.limit}
        />
      </div>
    </div>
  );
}
