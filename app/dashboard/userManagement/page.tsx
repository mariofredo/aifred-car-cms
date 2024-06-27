'use client';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {IoSearch} from 'react-icons/io5';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import {
  Button,
  DefaultContainer,
  FilterModal,
  Table,
  TablePagination,
} from '@/components';
import {
  CirclePlus,
  PencilIcon,
  ReturnIcon,
  SliderIcon,
  TrashIcon,
} from '@/public';
import {useModal} from '@/context';
import {formatDate} from '@/utils';

export default function page() {
  const router = useRouter();
  const [user, setUser] = useState<[]>([]);
  const [payload, setPayload] = useState<any>({
    order_by_name: '',
    order_by_username: '',
    order_by_email: '',
    keyword: '',
    is_active: 1,
    date_created_start: '',
    date_created_end: '',
  });
  const {filterModal, setFilterModal} = useModal();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 0,
    limit: 10,
  });

  const getUserData = useCallback(
    async (page: number, limit: number, payload: any = {}) => {
      try {
        let query = ``;
        if (Object.keys(payload).length > 0)
          for (const key in payload) {
            if (Object.hasOwnProperty.call(payload, key)) {
              query += `${key}=${payload[key]}&`;
            }
          }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user-management?page=${page}&${query}limit=${limit}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Error');
        }
        const {data} = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const deleteUser = async (object_id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user-management/delete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
          },
          body: JSON.stringify({
            unique_id: object_id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Error');
      }
      const {code} = await response.json();
      if (code === 200) {
        getUserData(pagination.currentPage, pagination.limit, {
          keyword: payload.keyword,
          order_by_name: payload.order_by_name,
          order_by_username: payload.order_by_username,
          order_by_email: payload.order_by_email,
          is_active: payload.is_active,
          date_created_start: payload.date_created_start,
          date_created_end: payload.date_created_end,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData(pagination.currentPage, pagination.limit, {
      keyword: payload.keyword,
      order_by_name: payload.order_by_name,
      order_by_username: payload.order_by_username,
      order_by_email: payload.order_by_email,
      is_active: payload.is_active,
      date_created_start: payload.date_created_start,
      date_created_end: payload.date_created_end,
    });
  }, [pagination]);

  const handleRenderFilter = useMemo(
    () =>
      filterModal && (
        <FilterModal
          list={[
            {
              title: 'Username',
              type: 'button',
              data: [
                {
                  label: 'A to Z',
                  value: 'asc',
                  name: 'order_by_username',
                },
                {
                  label: 'Z to A',
                  value: 'desc',
                  name: 'order_by_username',
                },
              ],
            },
            {
              title: 'Name',
              type: 'button',
              data: [
                {
                  label: 'A to Z',
                  value: 'asc',
                  name: 'order_by_name',
                },
                {
                  label: 'Z to A',
                  value: 'desc',
                  name: 'order_by_name',
                },
              ],
            },
            {
              title: 'Status',
              type: 'status_single',
              data: [
                {
                  label: 'Active',
                  value: 1,
                  name: 'is_active',
                },
                {
                  label: 'Inactive',
                  value: 0,
                  name: 'is_active',
                },
              ],
            },
            {
              title: 'Date Created',
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
          ]}
          setFilterModal={setFilterModal}
          payload={payload}
          setPayload={setPayload}
          onReset={() => {
            setPayload({
              order_by_name: '',
              order_by_username: '',
              order_by_email: '',
              keyword: '',
              is_active: 1,
              date_created_start: '',
              date_created_end: '',
            });
            getUserData(pagination.currentPage, pagination.limit, {
              keyword: '',
              order_by_name: '',
              order_by_username: '',
              order_by_email: '',
              is_active: 1,
              date_created_start: '',
              date_created_end: '',
            });
          }}
          action={() => {
            setFilterModal(false);
            getUserData(pagination.currentPage, pagination.limit, {
              keyword: payload.keyword,
              order_by_name: payload.order_by_name,
              order_by_username: payload.order_by_username,
              order_by_email: payload.order_by_email,
              is_active: payload.is_active,
              date_created_start: payload.date_created_start,
              date_created_end: payload.date_created_end,
            });
          }}
        />
      ),
    [filterModal, payload, pagination]
  );

  useEffect(() => {
    console.log(filterModal, 'filterModal');
  }, [filterModal]);

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
                value={payload.keyword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPayload((prev: any) => ({
                    ...prev,
                    keyword: e.target.value,
                  }))
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
              data={user.map((item: any) => ({
                ...item,
                is_active: (
                  <span
                    className={`table_status ${
                      item.is_active === 1 ? 'publish' : 'draft'
                    }`}
                  >
                    {item.is_active ? 'Active' : 'Inactive'}
                  </span>
                ),
                created_at: formatDate(item.created_at),
                detail: (
                  <div className='flex justify-center'>
                    <Image
                      src={PencilIcon}
                      className='w-[20px] h-[20px] cursor-pointer'
                      alt='return_icon'
                      onClick={() =>
                        router.push(
                          `/dashboard/userManagement/${item.unique_id}`
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
                      onClick={() => deleteUser(item.unique_id)}
                    />
                  </div>
                ),
              }))}
              listKey={[
                'username',
                'name',
                'email',
                'phone',
                'is_active',
                'created_at',
                'detail',
                'delete',
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
