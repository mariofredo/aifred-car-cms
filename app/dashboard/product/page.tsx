'use client';
import {
  Button,
  DefaultContainer,
  Select,
  Table,
  TablePagination,
} from '@/components';
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {CirclePlus} from '@/public';
import {IoSearch} from 'react-icons/io5';
import {useBrand, useProduct} from '@/context';
import {Product} from '@/types';
import Link from 'next/link';
import {SingleValue} from 'react-select';
interface Payload {
  brand_unique_id: SingleValue<{
    label: string;
    value: string;
  }>;
  keyword: string;
}
export default function DashboardProduct() {
  const {getListProduct} = useProduct();
  const {getListBrand} = useBrand();
  const [brand, setBrand] = useState<{label: string; value: string}[]>([]);
  const [payload, setPayload] = useState<Payload>({
    brand_unique_id: {
      label: '',
      value: '',
    },
    keyword: '',
  });
  const [product, setProduct] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 0,
    limit: 10,
  });
  const callListProduct = useCallback(async () => {
    const {data, total_data} = await getListProduct({
      page: pagination.currentPage,
      limit: pagination.limit,
      brand_unique_id: payload.brand_unique_id?.value,
      keyword: payload.keyword,
    });
    setProduct(data);
    setPagination((prev) => ({
      ...prev,
      totalCount: total_data,
    }));
  }, [product, payload, pagination]);
  const callListBrand = useCallback(async () => {
    const {data} = await getListBrand();
    setBrand(data.map((item) => ({label: item.name, value: item.unique_id})));
  }, [brand]);

  useEffect(() => {
    callListBrand();
  }, []);
  useEffect(() => {
    callListProduct();
  }, [pagination.currentPage, payload.brand_unique_id]);
  return (
    <DefaultContainer title='Product Library'>
      <div className='dc_ctr'>
        <div className='dc_filter_ctr'>
          <div className='w-[50%]'>
            <Select
              options={brand}
              label='BRAND'
              isSearchable
              isClearable
              name='brand_unique_id'
              value={payload.brand_unique_id}
              onChange={(newValue) => {
                setPayload((prev) => ({...prev, brand_unique_id: newValue}));
              }}
            />
          </div>
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
              id={''}
            />
          </div>
          <TablePagination
            limit={pagination.limit}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </div>
    </DefaultContainer>
  );
}
