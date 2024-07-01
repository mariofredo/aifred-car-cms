'use client';
import Link from 'next/link';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Button,
  DefaultContainer,
  ModalDeleteConfirmation,
  Table,
  TablePagination,
} from '@/components';
import {useQuestion} from '@/context';
import {CirclePlus, PencilIcon, TrashIcon} from '@/public';
import {Question} from '@/types';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

export default function DashboardQuestion() {
  const router = useRouter();
  const {getListQuestion, deleteQuestion} = useQuestion();
  const [questionId, setQuestionId] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<Question[]>([]);
  const [modal, setModal] = useState(false);
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

  const handleDeleteQuestion = useCallback(async (id: string) => {
    const {code} = await deleteQuestion(id);
    if (code === 200) {
      callListQuestion();
      setModal(false);
    }
    setModal(false);
  }, []);

  const handleDeleteModal = useMemo(
    () =>
      modal && (
        <ModalDeleteConfirmation
          label={`Are you sure to delete the question ${questionTitle}?`}
          onCancel={() => setModal(false)}
          onDone={() => handleDeleteQuestion(questionId)}
        />
      ),
    [questionTitle, questionId, modal]
  );

  useEffect(() => {
    callListQuestion();
  }, []);

  return (
    <DefaultContainer title='Question List'>
      {handleDeleteModal}
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
                  'Actions',
                ]}
                data={question.map((item) => ({
                  ...item,
                  actions: (
                    <div className='flex gap-[10px]'>
                      <Image
                        src={PencilIcon}
                        className='w-[20px] h-[20px] cursor-pointer'
                        alt='return_icon'
                        onClick={() =>
                          router.push(`/dashboard/question/${item.unique_id}`)
                        }
                      />
                      <Image
                        src={TrashIcon}
                        className='w-[20px] h-[20px] cursor-pointer'
                        alt='trash_icon'
                        onClick={() => {
                          setModal(true);
                          setQuestionId(item.unique_id);
                          setQuestionTitle(
                            item.brand_name + ' ' + item.question_set_title
                          );
                          // deleteUser(item.unique_id);
                        }}
                      />
                    </div>
                  ),
                }))}
                listKey={[
                  'brand_name',
                  'question_set_title',
                  'total_question',
                  'is_active',
                  'created_at',
                  'actions',
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
