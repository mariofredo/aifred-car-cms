'use client';
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {FaRegTrashAlt} from 'react-icons/fa';
import Image from 'next/image';
import {CirclePlus} from '@/public';
import {useParams, useRouter} from 'next/navigation';
import {Tag} from '@/types/tag';
import Cookies from 'js-cookie';
import {ListQuestionItem, QuestionInput} from '@/types';
import {Button, Select} from '@/components';
import {List, arrayMove} from 'react-movable';
import '@/styles/questionContainer.scss';
import {useBrand, useQuestion, useSpec} from '@/context';
export default function QuestionContainer({
  type,
  params,
}: {
  type: string;
  params: number | null;
}) {
  const {id}: {id: string} = useParams();
  const router = useRouter();
  const [payload, setPayload] = useState({
    brand_unique_id: '',
    question_set_title: '',
    is_active: 0,
  });
  const {createQuestion, getDetailQuestion, updateQuestion} = useQuestion();
  const [questions, setQuestions] = useState<QuestionInput[]>([
    {
      question: {
        name: `input_q${1}`,
        value: '',
        type: 'single',
      },
      answer: [
        {
          name: `input_a${1}_num1`,
          value: '',
        },
      ],
      tag: [
        {
          name: `input_t${1}_num1`,
          value: '',
        },
      ],
    },
  ]);
  const {brands, getListBrand} = useBrand();
  const [totalQuestion, setTotalQuestion] = useState<number>(0);
  const [showHeader, setShowHeader] = useState<boolean>(
    // type === 'detailQuestion' ? false : true
    false
  );
  const {getListTag, tagSuggestion} = useSpec();
  const handleSetQuestions = useCallback(
    (totalQuestion: number) => {
      const data = Array.from({length: totalQuestion}, (_, i) => ({
        question: {
          name: `input_q${i + 1}`,
          value: '',
          type: 'single',
        },
        answer: [
          {
            name: `input_a${i + 1}_num1`,
            value: '',
          },
        ],
        tag: [
          {
            name: `input_t${i + 1}_num1`,
            value: '',
          },
        ],
      }));
      setQuestions(data);
      setShowHeader(false);
    },
    [questions, setQuestions]
  );
  const handleAddNewQuestions = useCallback(() => {
    setQuestions((prev) => {
      let updatedData = [...prev];
      const length = updatedData.length;
      updatedData.push({
        question: {
          name: `input_q${length + 1}`,
          value: '',
          type: 'single',
        },
        answer: [
          {
            name: `input_a${length + 1}_num1`,
            value: '',
          },
        ],
        tag: [
          {
            name: `input_t${length + 1}_num1`,
            value: '',
          },
        ],
      });
      return updatedData;
    });
    setShowHeader(false);
  }, [questions, setQuestions]);
  // const getDetailQuestion = async () => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/question/details`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({batch: params}),
  //     }
  //   );
  //   if (response.ok) {
  //     const data = await response.json();
  //     return data.data;
  //   }
  // };
  const handleSetQuestionsDetail = useCallback(
    async (id: string) => {
      const {data} = await getDetailQuestion(id);
      setPayload((prev) => ({
        ...prev,
        brand_unique_id: data.question_object_id,
        question_set_title: data.question_set_title,
      }));
      // const detailData = data.question_items.map(
      //   (el: ListQuestionItem, i: number) => ({
      //     question: {
      //       name: `input_q${i + 1}`,
      //       value: el.question,
      //     },
      //     answer: el.answer.map((key, i2) => ({
      //       name: `input_a${i + 1}_num${i2 + 1}`,
      //       value: key.answer_tag_id,
      //     })),
      //     tag: el.answer.map((key, i3) => ({
      //       name: `input_t${i + 1}_num${i3 + 1}`,
      //       value: key.next_question_id,
      //     })),
      //   })
      // );
      // setQuestions(detailData);
      setShowHeader(false);
    },
    [questions, setQuestions]
  );
  const handleAddAnswer = useCallback(
    (idx: number) => {
      const length = questions[idx].answer.length;
      setQuestions((prevItems: QuestionInput[]) => {
        const updatedItems = [...prevItems];
        updatedItems[idx] = {
          ...updatedItems[idx],
          answer: [
            ...updatedItems[idx].answer,
            {
              name: `input_a${idx + 1}_num${length + 1}`,
              value: '',
            },
          ],
          tag: [
            ...updatedItems[idx].tag,
            {
              name: `input_t${idx + 1}_num${length + 1}`,
              value: '',
            },
          ],
        };
        return updatedItems;
      });
    },
    [questions, setQuestions]
  );
  const handleDeleteQuestion = useCallback(
    (idx: number) => {
      setQuestions((prev) => {
        let data = [...prev];
        data.splice(idx, 1);
        let updatedData = data.map((el, i1) => {
          el.answer = el.answer.map((ans, i2) => ({
            name: `input_a${i1 + 1}_num${i2}`,
            value: ans.value,
          }));
          el.tag = el.tag.map((tag, i2) => ({
            name: `input_t${i1 + 1}_num${i2}`,
            value: tag.value,
          }));
          el.question = {
            name: `input_q${i1 + 1}`,
            value: el.question.value,
            type: el.question.type,
          };
          return el;
        });
        return updatedData;
      });
    },
    [questions]
  );
  const handleDeleteAnswer = useCallback(
    (idx: number, idx2: number) => {
      console.log(idx, idx2, 'test');
      setQuestions((prev) => {
        let data = [...prev];
        let question = {...data[idx]};
        question.answer = [...question.answer];
        question.tag = [...question.tag];

        // Remove the specific answer and tag
        question.answer.splice(idx2, 1);
        question.tag.splice(idx2, 1);

        // Update the names of the remaining answers and tags
        question.answer = question.answer.map((ans, i2) => ({
          name: `input_a${idx + 1}_num${i2}`,
          value: ans.value,
        }));
        question.tag = question.tag.map((tag, i2) => ({
          name: `input_t${idx + 1}_num${i2}`,
          value: tag.value,
        }));

        // Update the specific question in the data array
        data[idx] = question;

        console.log(question.answer, 'data');
        return data;
      });
    },
    [questions]
  );
  const handleInputQuestion = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
      setQuestions((prev) => {
        let data = [...prev];
        data[idx].question.value = e.target.value;
        return data;
      });
    },
    [questions]
  );
  const handleSelectAnswerQuestion = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, idx1: number, idx2: number) => {
      setQuestions((prev) => {
        let data = [...prev];
        data[idx1].answer[idx2].value = e.target.value;
        return data;
      });
    },
    [questions]
  );
  const handleSelectTagQuestion = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>, idx1: number, idx2: number) => {
      setQuestions((prev) => {
        let data = [...prev];
        data[idx1].tag[idx2].value = e.target.value;
        return data;
      });
    },
    [questions]
  );
  const handleSelectQuestionType = useCallback(
    (value: string, idx: number) => {
      setQuestions((prev) => {
        let data = [...prev];
        data[idx].question.type = value;
        return data;
      });
    },
    [questions]
  );
  const callCreateQuestion = useCallback(
    async (question: QuestionInput[], payload: any) => {
      createQuestion(question, payload);

      // if (response.ok) {
      //   const data = await response.json();
      //   if (data.code === 200) router.push('/dashboard/question');
      // }
    },
    [questions, payload]
  );
  const callUpdateQuestion = useCallback(
    async (question: QuestionInput[], payload: any) => {
      updateQuestion(question, payload);
    },
    [questions]
  );

  useEffect(() => {
    getListTag();
    getListBrand();
    if (type === 'detailQuestion') {
      handleSetQuestionsDetail(id);
    }
  }, []);
  useEffect(() => {
    console.log(payload, 'payload');
  }, [payload]);
  return (
    <div className='qc_ctr'>
      <div className='qc_title'>Add Question</div>
      <div className='h-[2px] bg-[#dfdfdf] w-full '></div>
      {showHeader && (
        <>
          <div className='qc_num_of_q'>
            <div className=' qc_num_of_q_wrapper'>
              How many question do you like ?{' '}
              <input
                type='number'
                name='numQuestion'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTotalQuestion(parseInt(e.target.value))
                }
                min={0}
              />
            </div>
            <button
              className='flex justify-center items-center'
              onClick={() => handleSetQuestions(totalQuestion)}
            >
              Submit
            </button>
          </div>
          <div className='h-[2px] bg-[#dfdfdf] w-full '></div>
        </>
      )}
      <div className='qc_card_ctr'>
        <div className='qc_initial_form'>
          <div className='qc_initial_wrapper'>
            <div className='qc_initial_title'>Brand</div>
            <select
              name='brand_unique_id'
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setPayload((prev) => ({
                  ...prev,
                  brand_unique_id: e.target.value,
                }))
              }
              value={payload.brand_unique_id}
            >
              <option value='' disabled>
                Select Brand
              </option>
              {brands.map((item) => (
                <option value={item.unique_id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className='qc_initial_wrapper'>
            <div className='qc_initial_title'>Question Set Title</div>
            <input
              type='text'
              name='question_set_title'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPayload((prev) => ({
                  ...prev,
                  question_set_title: e.target.value,
                }))
              }
              value={payload.question_set_title}
            />
          </div>
        </div>
      </div>
      <div className='qc_list_q'>
        <List
          values={questions}
          onChange={({oldIndex, newIndex}) => {
            setQuestions(arrayMove(questions, oldIndex, newIndex));
          }}
          renderList={({children, props}) => <ul {...props}>{children}</ul>}
          renderItem={({value, props, index}) => {
            if (index === undefined) return <li>Empty Data</li>;
            return (
              <li {...props} className='qc_card_ctr'>
                <div className='qc_card_ctr'>
                  <div className='qc_card_title_ctr'>
                    <div className='qc_card_title'>Q{index + 1}</div>
                    <button
                      onClick={() =>
                        questions.length > 1 && handleDeleteQuestion(index)
                      }
                      className='qc_card_remove'
                    >
                      <FaRegTrashAlt color='#F31D1E' />
                    </button>
                  </div>
                  <div className='qc_card_input_ctr'>
                    <div className='qc_card_input question'>
                      <div className='flex gap-[20px]'>
                        <button
                          className={`${
                            value.question.type === 'single'
                              ? 'qc_card_btn_active'
                              : ''
                          }`}
                          onClick={() =>
                            handleSelectQuestionType('single', index)
                          }
                        >
                          Single Answer
                        </button>
                        <button
                          className={`${
                            value.question.type === 'multiple'
                              ? 'qc_card_btn_active'
                              : ''
                          }`}
                          onClick={() =>
                            handleSelectQuestionType('multiple', index)
                          }
                        >
                          Multiple Answer
                        </button>
                      </div>
                      <div className='qc_card_input_title'>Question</div>
                      <div className='qc_card_input_info'>
                        Question max 100 character
                      </div>
                      <div className='qc_card_input_input'>
                        <input
                          type='text'
                          value={value.question.value}
                          name={value.question.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputQuestion(e, index)
                          }
                        />
                      </div>
                    </div>
                    <div className='qc_card_input answer'>
                      <div className='qc_card_input_title'>Answer</div>
                      <div className='qc_card_input_info'>
                        Answers can be choosen from tags
                      </div>
                      <div className='qc_card_input_input'>
                        {value.answer.map((ans, idx) => (
                          <div className='flex gap-[20px]'>
                            <input
                              name={ans.name}
                              id=''
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => handleSelectAnswerQuestion(e, index, idx)}
                              value={ans.value}
                            />
                            <button
                              onClick={() => handleDeleteAnswer(index, idx)}
                              className='qc_card_remove'
                            >
                              <FaRegTrashAlt color='#B5B5B5' />
                            </button>
                          </div>
                        ))}
                        <button
                          className='flex justify-center items-center max-w-[175px]'
                          onClick={() => handleAddAnswer(index)}
                        >
                          <Image src={CirclePlus} alt='circle_plus' /> more
                          option
                        </button>
                      </div>
                    </div>
                    <div className='qc_card_input flow'>
                      <div className='qc_card_input_title'>Tags</div>
                      <div className='qc_card_input_info'>
                        Select the next step
                      </div>
                      <div className='qc_card_input_input'>
                        {value.tag.map((tag, idxFlow) => (
                          <select
                            name={tag.name}
                            value={tag.value}
                            onChange={(
                              e: React.ChangeEvent<HTMLSelectElement>
                            ) => handleSelectTagQuestion(e, index, idxFlow)}
                            disabled={value.question.type === 'multiple'}
                          >
                            <option value='' disabled>
                              Select next step
                            </option>
                            {tagSuggestion.map((el) => {
                              return <option value={el.id}>{el.text}</option>;
                            })}
                          </select>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          }}
        />

        <div className='flex flex-col gap-[10px] max-w-[250px] mt-[50px]'>
          <div className='flex gap-[20px] justify-between items-center'>
            <div className='text-[24px] text-[#3e3e3e]'>Publish</div>
            <label className='switch'>
              <input
                type='checkbox'
                checked={payload.is_active === 1 ? true : false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPayload({...payload, is_active: e.target.checked ? 1 : 0})
                }
              />
              <span className='slider round'></span>
            </label>
          </div>
          <p className='text-justify text-[12px] text-[#B5B5B5]'>
            If publish is off will be saved as draft
          </p>
        </div>
        <button
          className='flex justify-center items-center mt-[50px]'
          onClick={() => {
            handleAddNewQuestions();
          }}
        >
          Add New Question
        </button>
        <div className='h-[2px] bg-[#dfdfdf] w-full my-[50px]'></div>

        {!showHeader && (
          <div className='flex justify-between'>
            <div className='flex gap-[20px]'>
              <button
                className='flex justify-center items-center outline_btn'
                onClick={() => router.push('/dashboard/question')}
              >
                Cancel
              </button>
              <button
                className='flex justify-center items-center'
                onClick={() => {
                  if (type === 'detailQuestion') {
                    updateQuestion(questions, {id, ...payload});
                  } else callCreateQuestion(questions, payload);
                }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
