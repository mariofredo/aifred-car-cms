'use client';
import React, {useCallback, useEffect, useState} from 'react';
import '@/styles/questionContainer.scss';
import {FaRegTrashAlt} from 'react-icons/fa';
import Image from 'next/image';
import {CirclePlus} from '@/public';
import {useRouter} from 'next/navigation';
import {Tag} from '@/types/tag';
import Cookies from 'js-cookie';
import {ListQuestionItem, QuestionInput} from '@/types';
export default function QuestionContainer({
  type,
  params,
}: {
  type: string;
  params: number | null;
}) {
  const token = Cookies.get('token');
  const router = useRouter();

  const [questions, setQuestions] = useState<QuestionInput[]>([
    {
      question: {
        name: `input_q${1}`,
        value: '',
      },
      answer: [
        {
          name: `input_a${1}_num1`,
          value: '',
        },
      ],
      flow: [
        {
          name: `input_f${1}_num1`,
          value: '',
        },
      ],
    },
  ]);
  const [totalQuestion, setTotalQuestion] = useState<number>(0);
  const [showHeader, setShowHeader] = useState<boolean>(
    // type === 'detailQuestion' ? false : true
    false
  );
  const [tags, setTags] = useState<Tag[]>([]);
  const handleSetQuestions = useCallback(
    (totalQuestion: number) => {
      const data = Array.from({length: totalQuestion}, (_, i) => ({
        question: {
          name: `input_q${i + 1}`,
          value: '',
        },
        answer: [
          {
            name: `input_a${i + 1}_num1`,
            value: '',
          },
        ],
        flow: [
          {
            name: `input_f${i + 1}_num1`,
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
        },
        answer: [
          {
            name: `input_a${length + 1}_num1`,
            value: '',
          },
        ],
        flow: [
          {
            name: `input_f${length + 1}_num1`,
            value: '',
          },
        ],
      });
      return updatedData;
    });
    setShowHeader(false);
  }, [questions, setQuestions]);
  const getDetailQuestion = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/question/details`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({batch: params}),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  };
  const handleSetQuestionsDetail = useCallback(async () => {
    const data = await getDetailQuestion();
    const detailData = data.map((el: ListQuestionItem, i: number) => ({
      question: {
        name: `input_q${i + 1}`,
        value: el.question,
      },
      answer: el.answer.map((key, i2) => ({
        name: `input_a${i + 1}_num${i2 + 1}`,
        value: key.answer_tag_id,
      })),
      flow: el.answer.map((key, i3) => ({
        name: `input_f${i + 1}_num${i3 + 1}`,
        value: key.next_question_id,
      })),
    }));
    setQuestions(detailData);
    setShowHeader(false);
  }, [questions, setQuestions]);
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
          flow: [
            ...updatedItems[idx].flow,
            {
              name: `input_f${idx + 1}_num${length + 1}`,
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
          el.flow = el.flow.map((flow, i2) => ({
            name: `input_f${i1 + 1}_num${i2}`,
            value: flow.value,
          }));
          el.question = {name: `input_q${i1 + 1}`, value: el.question.value};
          return el;
        });
        return updatedData;
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
    (e: React.ChangeEvent<HTMLSelectElement>, idx1: number, idx2: number) => {
      setQuestions((prev) => {
        let data = [...prev];
        data[idx1].answer[idx2].value = e.target.value;
        return data;
      });
    },
    [questions]
  );
  const handleSelectFlowQuestion = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>, idx1: number, idx2: number) => {
      setQuestions((prev) => {
        let data = [...prev];
        data[idx1].flow[idx2].value = e.target.value;
        return data;
      });
    },
    [questions]
  );
  const createQuestion = useCallback(
    async (payload: QuestionInput[]) => {
      const data = payload.map((el) => {
        return {
          question: el.question.value,
          answer: el.answer.map((key, idx) => {
            return {
              answer_tag_id: key.value,
              next_question_id: el.flow[idx].value,
            };
          }),
        };
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/question/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({questions: data}),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.code === 200) router.push('/dashboard/question');
      }
    },
    [questions]
  );
  const updateQuestion = useCallback(
    async (batch: number, payload: QuestionInput[]) => {
      const data = payload.map((el) => {
        return {
          question: el.question.value,
          answer: el.answer.map((key, idx) => {
            return {
              answer_tag_id: key.value,
              next_question_id: el.flow[idx].value,
            };
          }),
        };
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/question/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({batch, questions: data}),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.code === 200) router.push('/dashboard/question');
      }
    },
    [questions]
  );
  const getListTag = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/answer-tag`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      const result = await data.data.map((el: {id: number; tag: string}) => ({
        id: el.id,
        text: el.tag,
      }));
      setTags(result);
    }
  };

  useEffect(() => {
    getListTag();
    if (type === 'detailQuestion') {
      handleSetQuestionsDetail();
    }
  }, []);
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
      <div className='qc_list_q'>
        {questions.map((el, index) => {
          return (
            <>
              <div className='qc_card_ctr'>
                <div className='qc_card_title_ctr'>
                  <div className='qc_card_title'>Q{index + 1}</div>
                  <FaRegTrashAlt
                    color='#F31D1E'
                    onClick={() => handleDeleteQuestion(index)}
                  />
                </div>
                <div className='qc_card_input_ctr'>
                  <div className='qc_card_input question'>
                    <div className='qc_card_input_title'>Question</div>
                    <div className='qc_card_input_info'>
                      Question max 100 character
                    </div>
                    <div className='qc_card_input_input'>
                      <input
                        type='text'
                        value={el.question.value}
                        name={el.question.name}
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
                      {el.answer.map((ans, idx) => (
                        <>
                          <select
                            name={ans.name}
                            id=''
                            onChange={(
                              e: React.ChangeEvent<HTMLSelectElement>
                            ) => handleSelectAnswerQuestion(e, index, idx)}
                            value={ans.value}
                          >
                            <option value='' disabled>
                              Select answer
                            </option>
                            {tags.map((el) => {
                              return <option value={el.id}>{el.text}</option>;
                            })}
                          </select>
                        </>
                      ))}
                      <button
                        className='flex justify-center items-center'
                        onClick={() => handleAddAnswer(index)}
                      >
                        <Image src={CirclePlus} alt='circle_plus' /> more answer
                        option
                      </button>
                    </div>
                  </div>
                  <div className='qc_card_input flow'>
                    <div className='qc_card_input_title'>Flow</div>
                    <div className='qc_card_input_info'>
                      Select the next question
                    </div>
                    <div className='qc_card_input_input'>
                      {el.flow.map((flow, idxFlow) => (
                        <select
                          name={flow.name}
                          value={flow.value}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            handleSelectFlowQuestion(e, index, idxFlow)
                          }
                        >
                          <option value='' disabled>
                            Select next step
                          </option>
                          {questions.map((_, idx) => (
                            <option value={idx + 1}>{idx + 1}</option>
                          ))}
                          <option value='0'>Done</option>
                        </select>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}

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
                    if (params) updateQuestion(params, questions);
                  } else createQuestion(questions);
                }}
              >
                Done
              </button>
            </div>
            <button
              className='flex justify-center items-center'
              onClick={() => {
                handleAddNewQuestions();
              }}
            >
              Add New Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
