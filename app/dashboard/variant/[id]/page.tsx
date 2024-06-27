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
import {useParams, useRouter} from 'next/navigation';
import {
  CirclePlus,
  NoImage,
  PencilIcon,
  ReturnIcon,
  SliderIcon,
  TrashIcon,
} from '@/public';
import Link from 'next/link';
import {IoSearch} from 'react-icons/io5';
import {formatDate} from '@/utils';
import Image from 'next/image';
interface Payload {
  keyword_variant: string;
  is_active_variant: number;
  order_by_name_variant: string;
  date_created_start_variant: string;
  date_created_end_variant: string;
}
export default function page() {
  const {id}: {id: string} = useParams();
  const router = useRouter();
  const [pagination, setPagination] = useState({
    limit: 10,
    currentPage: 1,
    totalCount: 0,
  });
  const {filterModal, setFilterModal} = useModal();

  const {getListVariant, deleteVariant} = useVariant();
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
  const callDeleteVariant = useCallback(
    async (productId: string, variantId: string) => {
      const {code} = await deleteVariant(productId, variantId);
      if (code === 200)
        callListVariant(id, {
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
          onReset={() => {
            setPayload({
              keyword_variant: '',
              order_by_name_variant: '',
              is_active_variant: 1,
              date_created_start_variant: '',
              date_created_end_variant: '',
            });
            callListVariant(id, {
              page: pagination.currentPage,
              limit: pagination.limit,
              keyword_variant: '',
              order_by_name_variant: '',
              is_active_variant: 1,
              date_created_start_variant: '',
              date_created_end_variant: '',
            });
          }}
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
              data={variant.map((item) => ({
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
                image: (
                  <Image
                    src={item.image || NoImage}
                    width={150}
                    height={100}
                    alt={`gambar`}
                    className='rounded-md'
                  />
                ),
                created_at: formatDate(item.created_at),
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
                        router.push(
                          `/dashboard/variant/${id}/edit/${item.object_id}`
                        )
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
                      onClick={() => callDeleteVariant(id, item.object_id)}
                    />
                  </div>
                ),
              }))}
              listKey={[
                'name',
                'is_active',
                'created_at',
                'image',
                'detail',
                'delete',
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
