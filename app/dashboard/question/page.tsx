'use client';

import {Button, DefaultContainer, Table} from '@/components';
import {useQuestion} from '@/context';
import {CirclePlus} from '@/public';
import Link from 'next/link';
import {useCallback, useEffect, useState} from 'react';
import {IoSearch} from 'react-icons/io5';

export default function DashboardQuestion() {
  const {getListQuestion} = useQuestion();
  const [question, setQuestion] = useState<[]>([]);

  const callListVariant = useCallback(async () => {
    const {data} = await getListQuestion();
    setQuestion(data);
  }, [question]);

  useEffect(() => {
    callListVariant();
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
              id={''}
            />
          </div>
        </div>
      </div>
    </DefaultContainer>
  );
}
