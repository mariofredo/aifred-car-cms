'use client';
import {useState} from 'react';
import {Select, DefaultContainer, Table, TablePagination} from '@/components';
import '@/styles/submission.scss';

export default function page() {
  const [pagination, setPagination] = useState({
    limit: 10,
    currentPage: 1,
    totalCount: 0,
  });

  return (
    <div className='flex flex-col gap-[15px]'>
      <DefaultContainer title={'Submission'} />
      <div className='flex gap-[23px]'>
        <Select label={'SERIES'} />
        <Select label={'VARIANT'} />
      </div>
      <div className='submission_container'>
        <p>Submission List</p>
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
        <TablePagination
          pagination={pagination}
          setPagination={setPagination}
          limit={pagination.limit}
        />
      </div>
    </div>
  );
}
