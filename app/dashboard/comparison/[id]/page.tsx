'use client';
import {
  Button,
  DefaultContainer,
  FilterModal,
  Table,
  TablePagination,
} from '@/components';
import {useModal} from '@/context';
import {useComparison} from '@/context/comparisonContext';
import {CirclePlus} from '@/public';
import {Comparison} from '@/types';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {IoSearch} from 'react-icons/io5';

interface Payload {
  keyword: string;
  order_by_brand: string;
  order_by_series: string;
  date_created_start: string;
  date_created_end: string;
  is_active: number;
}
export default function DashboardComparisonList() {
  const {id}: {id: string} = useParams();
  const {getListComparison, deleteComparison} = useComparison();
  const {filterModal, setFilterModal} = useModal();
  const [comparison, setComparison] = useState<Comparison[]>([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    currentPage: 1,
    totalCount: 0,
  });
  const [payload, setPayload] = useState<Payload>({
    keyword: '',
    order_by_brand: '',
    order_by_series: '',
    date_created_start: '',
    date_created_end: '',
    is_active: 1,
  });

  const callListComparison = useCallback(
    async (id: string, payload: any) => {
      const {data, total_data} = await getListComparison(id, payload);
      setComparison(data);
      setPagination((prev) => ({
        ...prev,
        totalCount: total_data,
      }));
    },
    [comparison, pagination, payload]
  );
  const callDeleteComparison = useCallback(
    async (productId: string, comparisonId: string) => {
      const {code} = await deleteComparison(productId, comparisonId);
      if (code === 200)
        callListComparison(productId, {
          page: pagination.currentPage,
          limit: pagination.limit,
          ...payload,
        });
    },
    [payload, id, pagination]
  );
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
            callListComparison(id, {
              page: pagination.currentPage,
              limit: pagination.limit,
              ...payload,
            });
          }}
        />
      ),
    [payload, filterModal, pagination, id]
  );
  useEffect(() => {
    callListComparison(id, {
      page: pagination.currentPage,
      limit: pagination.limit,
      ...payload,
    });
  }, [pagination.currentPage]);
  return (
    <DefaultContainer title='Comparison List'>
      {handleRenderFilter}
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
            <form
              className='dc_search_ctr'
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                callListComparison(id, {
                  page: pagination.currentPage,
                  limit: pagination.limit,
                  ...payload,
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
