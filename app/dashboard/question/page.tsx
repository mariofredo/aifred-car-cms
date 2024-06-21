'use client';

import {Button, DefaultContainer, Table} from '@/components';
import {CirclePlus} from '@/public';
import Link from 'next/link';
import {IoSearch} from 'react-icons/io5';

export default function DashboardQuestion() {
  return (
    <DefaultContainer title='Question List'>
      <div className='dc_ctr'>
        <div className='dc_table_ctr'>
          <div className='dc_action_ctr'>
            <Link href={`/dashboard/question/create`}>
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
                name='search'
                placeholder='Search name or sub-series'
              />
            </div>
          </div>
          <div className='dc_table'>
            <Table
              listTitle={[
                'Brand',
                'Name',
                'Sub-series name',
                'Status',
                // 'Created by and date',
                'Image',
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
              type={'question'}
              productId={null}
            />
          </div>
        </div>
      </div>
    </DefaultContainer>
  );
}
