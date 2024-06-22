'use client';
import {Button, DefaultContainer, Select, Table} from '@/components';
import React, {useCallback, useEffect, useState} from 'react';
import {CirclePlus} from '@/public';
import {IoSearch} from 'react-icons/io5';
import {useProduct} from '@/context';
import {Product} from '@/types';
import Link from 'next/link';
export default function DashboardProduct() {
  const {getListProduct} = useProduct();
  const [product, setProduct] = useState<Product[]>([]);

  const callListProduct = useCallback(async () => {
    const {data} = await getListProduct();
    setProduct(data);
  }, [product]);

  useEffect(() => {
    callListProduct();
  }, []);
  return (
    <DefaultContainer title='Product Library'>
      <div className='dc_ctr'>
        <div className='dc_filter_ctr'>
          <Select options={[{label: 'Pajero', value: '123'}]} label='SERIES' />
          <Select options={[]} label='VARIANT' />
        </div>
        <div className='dc_table_ctr'>
          <div className='dc_action_ctr'>
            <Link href={'/dashboard/product/create'}>
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
                'SeriesName',
                'Total Variant',
                'Status',
                'Date created',
                '',
                'Detail',
                'Option',
              ]}
              data={product}
              listKey={[
                'brand_name',
                'series_name',
                'total_variant',
                'is_active',
                'created_at',
                'object_id',
                'detail',
                'option',
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
