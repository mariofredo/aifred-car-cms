'use client';
import {
  Button,
  DefaultContainer,
  FilterModal,
  Select,
  Table,
  TablePagination,
} from '@/components';
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {CirclePlus} from '@/public';
import {IoSearch} from 'react-icons/io5';
import {useBrand, useModal, useProduct} from '@/context';
import {Product} from '@/types';
import Link from 'next/link';
import {SingleValue} from 'react-select';
interface Payload {
  brand_unique_id: SingleValue<{
    label: string;
    value: string;
  }>;
  keyword: string;
  order_by_brand: string;
  order_by_series: string;
  date_created_start: string;
  date_created_end: string;
  is_active: number;
}
export default function DashboardProduct() {
  const {getListProduct} = useProduct();
  const {getListBrand} = useBrand();
  const [brand, setBrand] = useState<{label: string; value: string}[]>([]);
  const {filterModal, setFilterModal} = useModal();
  const [payload, setPayload] = useState<Payload>({
    brand_unique_id: {
      label: '',
      value: '',
    },
    keyword: '',
    order_by_brand: '',
    order_by_series: '',
    date_created_start: '',
    date_created_end: '',
    is_active: 1,
  });
  const [product, setProduct] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 0,
    limit: 10,
  });
  const callListProduct = useCallback(
    async (payload: any) => {
      const {data, total_data} = await getListProduct(payload);
      setProduct(data);
      setPagination((prev) => ({
        ...prev,
        totalCount: total_data,
      }));
    },
    [product, payload, pagination]
  );
  const callListBrand = useCallback(async () => {
    const {data} = await getListBrand();
    setBrand(data.map((item) => ({label: item.name, value: item.unique_id})));
  }, [brand]);
  const handleRenderFilter = useMemo(
    () =>
      filterModal && (
        <FilterModal
          list={[
            {
              title: 'Brand',
              type: 'button',
              data: [
                {
                  label: 'A to Z',
                  value: 'asc',
                  name: 'order_by_brand',
                },
                {
                  label: 'Z to A',
                  value: 'desc',
                  name: 'order_by_brand',
                },
              ],
            },
            {
              title: 'Series Name',
              type: 'button',
              data: [
                {
                  label: 'A to Z',
                  value: 'asc',
                  name: 'order_by_series',
                },
                {
                  label: 'Z to A',
                  value: 'desc',
                  name: 'order_by_series',
                },
              ],
            },
            {
              title: 'Activity By Date',
              type: 'date',
              data: [
                {
                  label: 'from',
                  name: 'date_created_start',
                },
                {
                  label: 'until',
                  name: 'date_created_end',
                },
              ],
            },
            {
              title: 'Status',
              type: 'status_single',
              data: [
                {
                  label: 'Publish',
                  value: 1,
                  name: 'is_active',
                },
                {
                  label: 'Unpublish',
                  value: 0,
                  name: 'is_active',
                },
              ],
            },
          ]}
          setFilterModal={setFilterModal}
          payload={payload}
          setPayload={setPayload}
          action={() => {
            setFilterModal(false);
            callListProduct({
              page: pagination.currentPage,
              limit: pagination.limit,
              brand_unique_id: payload.brand_unique_id?.value,
              keyword: payload.keyword,
              order_by_brand: payload.order_by_brand,
              order_by_series: payload.order_by_series,
              date_created_start: payload.date_created_start,
              date_created_end: payload.date_created_end,
              is_active: payload.is_active,
            });
          }}
        />
      ),
    [payload, filterModal, pagination]
  );
  useEffect(() => {
    callListBrand();
  }, []);
  useEffect(() => {
    callListProduct({
      page: pagination.currentPage,
      limit: pagination.limit,
      brand_unique_id: payload.brand_unique_id?.value,
      keyword: payload.keyword,
      order_by_brand: payload.order_by_brand,
      order_by_series: payload.order_by_series,
      date_created_start: payload.date_created_start,
      date_created_end: payload.date_created_end,
      is_active: payload.is_active,
    });
  }, [pagination.currentPage, payload.brand_unique_id]);

  return (
    <DefaultContainer title='Product Library'>
      {handleRenderFilter}
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
                if (newValue)
                  setPayload((prev) => ({...prev, brand_unique_id: newValue}));
                else
                  setPayload((prev) => ({
                    ...prev,
                    brand_unique_id: {label: '', value: ''},
                  }));
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
            <form
              className='dc_search_ctr'
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                callListProduct({
                  page: pagination.currentPage,
                  limit: pagination.limit,
                  brand_unique_id: payload.brand_unique_id?.value,
                  keyword: payload.keyword,
                  order_by_brand: payload.order_by_brand,
                  order_by_series: payload.order_by_series,
                  date_created_start: payload.date_created_start,
                  date_created_end: payload.date_created_end,
                  is_active: payload.is_active,
                });
              }}
            >
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
            </form>
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
              subType='product'
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
