'use client';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  BackButton,
  Button,
  DefaultContainer,
  FilterModal,
  Table,
  TablePagination,
} from '@/components';
// import '@/styles/variant.scss';
import {useModal, useVariant} from '@/context';
import {Variant} from '@/types';
import {useParams} from 'next/navigation';
import {CirclePlus} from '@/public';
import Link from 'next/link';
import {IoSearch} from 'react-icons/io5';
interface Payload {
  keyword_variant: string;
  is_active_variant: number;
  order_by_name_variant: string;
  date_created_start_variant: string;
  date_created_end_variant: string;
}
export default function page() {
  const {id}: {id: string} = useParams();
  const [pagination, setPagination] = useState({
    limit: 10,
    currentPage: 1,
    totalCount: 0,
  });
  const {filterModal, setFilterModal} = useModal();

  const {getListVariant} = useVariant();
  const [variant, setVariant] = useState<Variant[]>([]);
  const [payload, setPayload] = useState<Payload>({
    keyword_variant: '',
    order_by_name_variant: '',
    is_active_variant: 1,
    date_created_start_variant: '',
    date_created_end_variant: '',
  });
  const callListVariant = useCallback(
    async (id: string, payload: any) => {
      const {data, total_data} = await getListVariant(id, payload);
      setVariant(data);
      setPagination((prev) => ({
        ...prev,
        totalCount: total_data,
      }));
    },
    [variant, pagination, payload]
  );

  const handleRenderFilter = useMemo(
    () =>
      filterModal && (
        <FilterModal
          list={[
            {
              title: 'Variant Name',
              type: 'button',
              data: [
                {
                  label: 'A to Z',
                  value: 'asc',
                  name: 'order_by_name_variant',
                },
                {
                  label: 'Z to A',
                  value: 'desc',
                  name: 'order_by_name_variant',
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
                  name: 'is_active_variant',
                },
                {
                  label: 'Unpublish',
                  value: 0,
                  name: 'is_active_variant',
                },
              ],
            },
            {
              title: 'Activity By Date',
              type: 'date',
              data: [
                {
                  label: 'from',
                  name: 'date_created_start_variant',
                },
                {
                  label: 'until',
                  name: 'date_created_end_variant',
                },
              ],
            },
          ]}
          setFilterModal={setFilterModal}
          payload={payload}
          setPayload={setPayload}
          action={() => {
            setFilterModal(false);
            callListVariant(id, {
              page: pagination.currentPage,
              limit: pagination.limit,
              ...payload,
            });
          }}
        />
      ),
    [payload, filterModal, pagination]
  );

  useEffect(() => {
    callListVariant(id, {
      page: pagination.currentPage,
      limit: pagination.limit,
      ...payload,
    });
  }, [pagination.currentPage]);

  return (
    <div className='flex flex-col gap-[15px]'>
      <DefaultContainer title={'Variant List'}>
        {handleRenderFilter}
        <div className='mt-4 flex justify-between'>
          <div>
            <div className='text-[24px] text-[#3e3e3e]'>Product Essentials</div>
            <div className='text-[12px] text-[#b5b5b5]'>
              (<span className='text-[#F31D1E]'>*</span>) are mandatory
            </div>
          </div>
          <BackButton onClick={undefined} />
        </div>
        <div className='dc_table_ctr'>
          <div className='dc_action_ctr'>
            <Link href={`/dashboard/variant/${id}/create`}>
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
                callListVariant(id, {
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
                name='keyword_variant'
                placeholder='Search name or sub-series'
                value={payload.keyword_variant}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPayload((prev) => ({
                    ...prev,
                    keyword_variant: e.target.value,
                  }))
                }
              />
            </form>
          </div>
          <div className='dc_table'>
            <Table
              listTitle={[
                'Name',
                'Status',
                'Date Created',
                'Image',
                'Detail',
                'Option',
              ]}
              data={variant}
              listKey={[
                'name',
                'is_active',
                'created_at',
                'image',
                'detail',
                'option',
              ]}
              type={'product'}
              subType='variant'
              id={id}
            />
          </div>
          <TablePagination
            pagination={pagination}
            setPagination={setPagination}
            limit={pagination.limit}
          />
        </div>
      </DefaultContainer>
    </div>
  );
}
