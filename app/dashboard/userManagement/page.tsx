'use client';
import {ChangeEvent, FormEvent, useMemo, useState} from 'react';
import {IoSearch} from 'react-icons/io5';
import Link from 'next/link';
import {
  Button,
  DefaultContainer,
  FilterModal,
  Table,
  TablePagination,
} from '@/components';
import {CirclePlus} from '@/public';
import {useModal} from '@/context';

export default function page() {
  const [product, setProduct] = useState<[]>([]);
  const [payload, setPayload] = useState<string>('');
  const {filterModal, setFilterModal} = useModal();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 0,
    limit: 10,
  });
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
          }}
        />
      ),
    [payload, pagination]
  );
  return (
    <DefaultContainer title='User Management'>
      {handleRenderFilter}
      <div>
        <div className='dc_table_ctr'>
          <div className='dc_action_ctr'>
            <Link href={'/dashboard/userManagement/add'}>
              <Button
                bgColor='#DFDFDF'
                text='Add New'
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
                placeholder='Search username, name, email or phone'
                value={payload}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPayload(e.target.value)
                }
              />
            </form>
          </div>
          <div className='dc_table'>
            <Table
              listTitle={[
                'User Name',
                'Name',
                'Email',
                'Phone',
                'Status',
                'Data Created',
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
