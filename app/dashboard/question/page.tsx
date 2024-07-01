'use client';

import {Button, DefaultContainer, Table, TablePagination} from '@/components';
import {useQuestion} from '@/context';
import {CirclePlus} from '@/public';
import {Question} from '@/types';
import Link from 'next/link';
import {useCallback, useEffect, useState} from 'react';
import {IoSearch} from 'react-icons/io5';

export default function DashboardQuestion() {
  const {getListQuestion} = useQuestion();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<Question[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 0,
    limit: 10,
  });

  const callListQuestion = useCallback(async () => {
    setLoading(true);
    const {data, total_data} = await getListQuestion();
    setQuestion(data);
    setPagination((prev) => ({
      ...prev,
      totalCount: total_data,
    }));
    setLoading(false);
  }, [question]);

  useEffect(() => {
    callListQuestion();
  }, []);

  return (
    <DefaultContainer title='Question List'>
      <div className='dc_ctr'>
        <div className='dc_table_ctr'>
          <div className='dc_action_ctr'>
            <Link href={`/dashboard/question/create`}>
              <Button
                bgColor='#DFDFDF'
                text='Create New'
                borderRadius='12px'
                padding='10px 21px'
                color='#3e3e3e'
                image={CirclePlus}
              />
            </Link>
            {/* <div className='dc_search_ctr'>
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
            </div> */}
          </div>
          <div className='dc_table'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Table
                listTitle={[
                  'Brand',
                  'Question Set Title',
                  'Total Question',
                  'Status',
                  'Date created',
                  'Detail',
                  'Option',
                ]}
                data={question}
                listKey={[
                  'brand_name',
                  'question_set_title',
                  'total_question',
                  'is_active',
                  'created_at',
                  'detail',
                  'option',
                ]}
                type={'question'}
                subType='question'
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
