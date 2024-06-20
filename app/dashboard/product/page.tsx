'use client';
import {Button, DefaultContainer, Select, Table} from '@/components';
import React from 'react';

import '@/styles/product.scss';
import {CirclePlus} from '@/public';
export default function DashboardProduct() {
  return (
    <DefaultContainer title='Product Library'>
      <div className='dp_ctr'>
        <div className='dp_filter_ctr'>
          <Select options={[{label: 'Pajero', value: '123'}]} label='SERIES' />
          <Select options={[]} label='VARIANT' />
        </div>
        <div className='dp_table_ctr'>
          <div className='dp_action_ctr'>
            <Button
              bgColor='#DFDFDF'
              text='Create Product'
              borderRadius='12px'
              padding='10px 21px'
              color='#3e3e3e'
              image={CirclePlus}
            />
          </div>
          <div className='dp_table'>
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
              type={'product'}
              productId={null}
            />
          </div>
        </div>
      </div>
    </DefaultContainer>
  );
}
