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
import {
  CirclePlus,
  NoImage,
  PencilIcon,
  ReturnIcon,
  SliderIcon,
  TrashIcon,
} from '@/public';
import {Comparison} from '@/types';
import {formatDate} from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/navigation';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {FaRegStar, FaStar} from 'react-icons/fa6';
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
  const router = useRouter();
  const {getListComparison, deleteComparison, updateMainComparison} =
    useComparison();
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
  const callUpdateMainComparison = useCallback(
    async (productId: string, comparisonId: string) => {
      const {code} = await updateMainComparison(productId, comparisonId);
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
                'Main Comparison',
                'Brand',
                'Name',
                'Status',
                'Date Created',
                'Image',
                <div className='flex justify-center'>
                  <Image
                    src={ReturnIcon}
                    className='w-[20px] h-[15px]'
                    alt='return_icon'
                  />
                </div>,
                <div className='flex justify-center'>
                  <Image
                    src={SliderIcon}
                    alt='trash_icon'
                    className='w-[20px] h-[20px]'
                    onClick={() => setFilterModal((prev) => !prev)}
                  />
                </div>,
              ]}
              data={comparison.map((item) => ({
                ...item,
                is_primary: (
                  <div className='flex justify-center'>
                    {item.is_primary ? (
                      <FaStar
                        fill='#FFD101'
                        color='#FFD101'
                        className='w-[20px] h-[20px]'
                      />
                    ) : (
                      <FaRegStar
                        fill='#FFD101'
                        className='w-[20px] h-[20px]'
                        onClick={() =>
                          callUpdateMainComparison(id, item.object_id)
                        }
                      />
                    )}
                  </div>
                ),
                image: (
                  <Image
                    src={item.image || NoImage}
                    width={150}
                    height={100}
                    alt={`gambar`}
                    className='rounded-md'
                  />
                ),
                is_active: (
                  <span
                    className={`table_status ${
                      item.is_active === 1 ? 'publish' : 'draft'
                    }`}
                  >
                    {item.is_active ? 'Publish' : 'Draft'}
                  </span>
                ),
                created_at: formatDate(item.created_at),
                action: (
                  <div className='flex flex-col gap-[10px]'>
                    <Link
                      href={`/dashboard/comparison/${item.object_id}`}
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
                      className='w-[20px] h-[20px]'
                      alt='return_icon'
                      onClick={() =>
                        router.push(
                          `/dashboard/comparison/${id}/edit/${item.object_id}`
                        )
                      }
                    />
                  </div>
                ),
                delete: (
                  <div className='flex justify-center'>
                    <Image
                      src={TrashIcon}
                      className='w-[20px] h-[20px]'
                      alt='trash_icon'
                      onClick={() => callDeleteComparison(id, item.object_id)}
                    />
                  </div>
                ),
              }))}
              listKey={[
                'is_primary',
                'brand',
                'name',
                'is_active',
                'created_at',
                'image',
                'detail',
                'delete',
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
