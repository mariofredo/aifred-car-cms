'use client';
import {
  Button,
  DefaultContainer,
  FilterModal,
  ModalDeleteConfirmation,
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
import {
  CirclePlus,
  PencilIcon,
  ReturnIcon,
  SliderIcon,
  TrashIcon,
} from '@/public';
import {IoSearch} from 'react-icons/io5';
import {useBrand, useModal, useProduct} from '@/context';
import {Product} from '@/types';
import Link from 'next/link';
import {SingleValue} from 'react-select';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {formatDateUI} from '@/utils';
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
  const router = useRouter();
  const {getListProduct, deleteProduct} = useProduct();
  const {getListBrand} = useBrand();
  const [modal, setModal] = useState(false);
  const [objectId, setObjectId] = useState('');
  const [objectName, setObjectName] = useState('');
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
      const {data, total_data} = await getListProduct(payload);
      setProduct(data);
      setPagination((prev) => ({
        ...prev,
        totalCount: total_data,
      }));
      setLoading(false);
    },
    [product, payload, pagination]
  );
  const callDeleteProduct = useCallback(
    async (id: string) => {
      const {code} = await deleteProduct(id);
      if (code === 200) {
        setModal(false);
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
      }
      setModal(false);
    },
    [pagination, payload]
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
          onReset={() => {
            setPayload({
              brand_unique_id: {label: '', value: ''},
              keyword: '',
              order_by_brand: '',
              order_by_series: '',
              date_created_start: '',
              date_created_end: '',
              is_active: 1,
            });
            callListProduct({
              page: pagination.currentPage,
              limit: pagination.limit,
              brand_unique_id: '',
              keyword: '',
              order_by_brand: '',
              order_by_series: '',
              date_created_start: '',
              date_created_end: '',
              is_active: 1,
            });
          }}
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

  const handleDeleteModal = useMemo(
    () =>
      modal && (
        <ModalDeleteConfirmation
          label={`Are you sure to delete the product ${objectName}?`}
          onCancel={() => setModal(false)}
          onDone={() => callDeleteProduct(objectId)}
        />
      ),
    [modal, objectName, objectId]
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
      {handleDeleteModal}
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
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Table
                listTitle={[
                  'Brand',
                  'Series',
                  'Total Variant',
                  'Status',
                  'Date created',
                  '',
                  <div className='flex justify-center' key='return'>
                    <Image
                      src={ReturnIcon}
                      className='w-[20px] h-[15px]'
                      alt='return_icon'
                    />
                  </div>,
                  <div className='flex justify-center' key='delete'>
                    <Image
                      src={SliderIcon}
                      alt='trash_icon'
                      className='w-[20px] h-[20px]'
                      onClick={() => setFilterModal((prev) => !prev)}
                    />
                  </div>,
                ]}
                data={product.map((item) => ({
                  ...item,
                  is_active: (
                    <span
                      className={`table_status ${
                        item.is_active === 1 ? 'publish' : 'draft'
                      }`}
                    >
                      {item.is_active ? 'Publish' : 'Draft'}
                    </span>
                  ),
                  created_at: formatDateUI(item.created_at),
                  action: (
                    <div className='flex flex-col gap-[10px]'>
                      <Link
                        href={`/dashboard/variant/${item.object_id}`}
                        className='w-full'
                      >
                        <Button
                          borderRadius='5px'
                          bgColor='rgba(101, 57, 228, 0.58)'
                          color='#fff'
                          text='Variant List'
                          width='100%'
                          padding='3.5px'
                        />
                      </Link>
                      <Link href={`/dashboard/comparison/${item.object_id}`}>
                        <Button
                          borderRadius='5px'
                          bgColor='rgba(228, 57, 57, 0.58)'
                          color='#fff'
                          text='Comparison List'
                          width='100%'
                          padding='3.5px'
                        />
                      </Link>
                    </div>
                  ),
                  detail: (
                    <div className='flex justify-center'>
                      <Image
                        src={PencilIcon}
                        className='w-[20px] h-[20px] cursor-pointer'
                        alt='return_icon'
                        onClick={() =>
                          router.push(`/dashboard/product/${item.object_id}`)
                        }
                      />
                    </div>
                  ),
                  delete: (
                    <div className='flex justify-center'>
                      <Image
                        src={TrashIcon}
                        className='w-[20px] h-[20px] cursor-pointer'
                        alt='trash_icon'
                        onClick={() => {
                          setModal(true);
                          setObjectId(item.object_id);
                          setObjectName(
                            item.brand_name + ' ' + item.series_name
                          );
                        }}
                      />
                    </div>
                  ),
                }))}
                listKey={[
                  'brand_name',
                  'series_name',
                  'total_variant',
                  'is_active',
                  'created_at',
                  'action',
                  'detail',
                  'delete',
                ]}
                type={'product'}
                subType='product'
              />
            )}
          </div>
          {!loading && (
            <TablePagination
              limit={pagination.limit}
              pagination={pagination}
              setPagination={setPagination}
            />
          )}
        </div>
      </div>
    </DefaultContainer>
  );
}
