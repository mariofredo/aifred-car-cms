'use client';
import {useCallback, useEffect, useState} from 'react';
import {Card, DateRange, Select, Table, TableHome} from '@/components';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
} from 'chart.js';
import {Bar, Line, Pie} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import '@/styles/home.scss';
ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);
import {Range} from 'react-date-range';
import Cookies from 'js-cookie';
import {useBrand, useQuestion} from '@/context';
import {SingleValue} from 'react-select';
import {Question} from '@/types';
import {formatDate} from '@/utils';
import Image from 'next/image';
import {ReturnIcon, SliderIcon} from '@/public';
interface Payload {
  brand_unique_id: SingleValue<{
    label: string;
    value: string;
  }>;
  question_unique_id: SingleValue<{
    label: string;
    value: string;
  }>;
  date_range_home: Range;
}
export default function DashboardHome() {
  const {getListBrand} = useBrand();
  const {getQuestionListByBrand} = useQuestion();
  const [mostSubmissionBySales, setMostSubmissionBySales] = useState([]);
  const [payload, setPayload] = useState<Payload>({
    brand_unique_id: {
      label: '',
      value: '',
    },
    question_unique_id: {
      label: '',
      value: '',
    },
    date_range_home: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'date_range_home',
    },
  });
  const [brand, setBrand] = useState<{label: string; value: string}[]>([]);
  const [question, setQuestion] = useState<{label: string; value: string}[]>(
    []
  );
  const [summaryRespondent, setSummaryRespondent] = useState({
    total: 0,
    completed: 0,
    uncompleted: 0,
  });
  const [summaryCompleted, setSummaryCompleted] = useState({
    total: 0,
    saved: 0,
    unsaved: 0,
  });
  const [totalAnswersPerQuestion, setTotalAnswersPerQuestion] = useState([]);
  const [
    summaryAnsweredQuestionsDuration,
    setSummaryAnsweredQuestionsDuration,
  ] = useState([]);
  const [mostSelectedProduct, setMostSelectedProduct] = useState([]);
  const [completedDuration, setCompletedDuration] = useState({
    fastest: '00:00',
    average: '00:00',
    slowest: '00:00',
  });
  const [totalRespondentsPerPeriod, setTotalRespondentsPerPeriod] = useState<{
    completed: {[key: string]: any};
    uncompleted: {[key: string]: any};
  }>({
    completed: {},
    uncompleted: {},
  });
  const getSummaryRespondents = useCallback(async (payload: Payload) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/summary-respondents`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
        },
        body: JSON.stringify({
          question_unique_id: payload.question_unique_id?.value,
          date_start: formatDate(payload.date_range_home.startDate),
          date_end: formatDate(payload.date_range_home.endDate),
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Error');
    }
    const {data} = await response.json();
    setSummaryRespondent(data);
    return data;
  }, []);

  const getSummaryCompleted = useCallback(async (payload: Payload) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/summary-completed`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
        },
        body: JSON.stringify({
          question_unique_id: payload.question_unique_id?.value,
          date_start: formatDate(payload.date_range_home.startDate),
          date_end: formatDate(payload.date_range_home.endDate),
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Error');
    }
    const {data} = await response.json();
    setSummaryCompleted(data);
    return data;
  }, []);
  const getCompletedDuration = useCallback(async (payload: Payload) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/completed-duration`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
        },
        body: JSON.stringify({
          question_unique_id: payload.question_unique_id?.value,
          date_start: formatDate(payload.date_range_home.startDate),
          date_end: formatDate(payload.date_range_home.endDate),
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Error');
    }
    const {data} = await response.json();
    setCompletedDuration(data);
    return data;
  }, []);

  const getTotalAnswersPerQuestion = useCallback(async (payload: Payload) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/total-answers-per-question`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
        },
        body: JSON.stringify({
          question_unique_id: payload.question_unique_id?.value,
          date_start: formatDate(payload.date_range_home.startDate),
          date_end: formatDate(payload.date_range_home.endDate),
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Error');
    }
    const {data} = await response.json();
    setTotalAnswersPerQuestion(data);
    return data;
  }, []);
  const getTotalRespondentsPerPeriod = useCallback(async (payload: Payload) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/total-respondents-per-period`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
        },
        body: JSON.stringify({
          question_unique_id: payload.question_unique_id?.value,
          date_start: formatDate(payload.date_range_home.startDate),
          date_end: formatDate(payload.date_range_home.endDate),
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Error');
    }
    const {data} = await response.json();
    setTotalRespondentsPerPeriod(data);
    return data;
  }, []);

  const getSummaryAnsweredQuestionDuration = useCallback(
    async (payload: Payload) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/summary-answered-questions-duration`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
          },
          body: JSON.stringify({
            question_unique_id: payload.question_unique_id?.value,
            date_start: formatDate(payload.date_range_home.startDate),
            date_end: formatDate(payload.date_range_home.endDate),
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Error');
      }
      const {data} = await response.json();
      setSummaryAnsweredQuestionsDuration(data);
      return data;
    },
    []
  );
  const getMostSelectedProduct = useCallback(async (payload: Payload) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/most-selected-products`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
        },
        body: JSON.stringify({
          question_unique_id: payload.question_unique_id?.value,
          date_start: formatDate(payload.date_range_home.startDate),
          date_end: formatDate(payload.date_range_home.endDate),
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Error');
    }
    const {data} = await response.json();
    setMostSelectedProduct(data);
    return data;
  }, []);
  const callListBrand = useCallback(async () => {
    const {data} = await getListBrand(); // get brand list
    setBrand(data.map((item) => ({label: item.name, value: item.unique_id}))); // set brand list
  }, [brand]);

  const callListQuestion = useCallback(
    async (brand_id: {label: string; value: string}) => {
      const {data} = await getQuestionListByBrand(brand_id.value);
      setQuestion(
        data.map((item: Question) => ({
          ...item,
          label: item.question_set_title,
          value: item.unique_id,
        }))
      );
    },
    [question]
  );
  const postMostSubmissionBySales = useCallback(async (payload: Payload) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/most-submission-by-sales`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
          },
          body: JSON.stringify({
            question_unique_id: payload.question_unique_id?.value,
            date_start: formatDate(payload.date_range_home.startDate),
            date_end: formatDate(payload.date_range_home.endDate),
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Error');
      }
      const {data} = await response.json();
      setMostSubmissionBySales(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    callListBrand();
  }, []);
  useEffect(() => {
    if (payload.question_unique_id?.value) {
      getSummaryRespondents(payload);
      getSummaryCompleted(payload);
      getTotalAnswersPerQuestion(payload);
      getSummaryAnsweredQuestionDuration(payload);
      getMostSelectedProduct(payload);
      getCompletedDuration(payload);
      getTotalRespondentsPerPeriod(payload);
      postMostSubmissionBySales(payload);
    }
  }, [payload]);

  useEffect(() => {
    if (payload.brand_unique_id?.value)
      callListQuestion(payload.brand_unique_id);
  }, [payload.brand_unique_id]);
  return (
    <div className='dashboard_home_ctr'>
      {/* <HomeHeader /> */}
      <div className='dashboard_home_filter'>
        <Select
          options={brand}
          value={payload.brand_unique_id}
          isSearchable
          isClearable
          label='BRAND'
          name='brand_unique_id'
          onChange={(newValue) => {
            setPayload((prev) => ({
              ...prev,
              brand_unique_id: newValue,
              question_unique_id: {label: '', value: ''},
            }));
          }}
        />
        <Select
          options={question}
          value={payload.question_unique_id}
          isSearchable
          isClearable
          label='QUESTION SET'
          name='question_unique_id'
          onChange={(newValue) => {
            setPayload((prev) => ({...prev, question_unique_id: newValue}));
          }}
          isDisabled={!payload.brand_unique_id?.value}
        />
        <DateRange
          dateRange={[payload.date_range_home]}
          onChange={(item) => {
            setPayload((prev) => ({
              ...prev,
              date_range_home: item['date_range_home'],
            }));
          }}
          label='PERIOD'
        />
      </div>
      <div className='dashboard_box'>
        <div className='grid grid-cols-4 gap-[50px]'>
          <div className='dashboard_info'>
            <p className='dashboard_info_title'>Total Respondents</p>
            <p className='dashboard_info_value'>{summaryRespondent.total}</p>
          </div>
          <div className='dashboard_info'>
            <p className='dashboard_info_title'>Completed</p>
            <p className='dashboard_info_value'>
              {summaryRespondent.completed}
            </p>
          </div>
          <div className='dashboard_info'>
            <p className='dashboard_info_title'>Uncompleted</p>
            <p className='dashboard_info_value'>
              {summaryRespondent.uncompleted}
            </p>
          </div>
          <div className='dashboard_info'>
            <Pie
              data={{
                datasets: [
                  {
                    data: [
                      summaryRespondent.completed,
                      summaryRespondent.uncompleted,
                    ],
                    backgroundColor: ['#18BE1F', '#E2E1E1'],
                  },
                ],
                labels: ['Total Complete', 'Total Not Complete'],
              }}
              options={{
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      usePointStyle: true,
                      pointStyle: 'circle',
                    },
                  },
                  // tooltip: {
                  //   callbacks: {
                  //     label: (context) => {
                  //       if (context.dataset.data) {
                  //         const total = (
                  //           context.dataset.data as number[]
                  //         ).reduce((total, num) => total + num, 0);
                  //         const percentage =
                  //           (
                  //             (context.dataset.data[context.dataIndex] * 100) /
                  //             total
                  //           ).toFixed(1) + '%';
                  //         return percentage;
                  //       }
                  //       return '0%';
                  //     },
                  //   },
                  // },
                  datalabels: {
                    formatter(value, context) {
                      if (context.dataset.data) {
                        const total = (context.dataset.data as number[]).reduce(
                          (total, num) => total + num,
                          0
                        );
                        const percentage =
                          ((value * 100) / total).toFixed(1) + '%';
                        return percentage;
                      }
                      return '0%';
                    },
                    color: ['#fff', '#3e3e3e'],
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className='dashboard_box'>
        <div className='grid grid-cols-4 gap-[50px]'>
          <div className='dashboard_info'>
            <p className='dashboard_info_title'>Total Complete</p>
            <p className='dashboard_info_value'>{summaryCompleted.total}</p>
          </div>
          <div className='dashboard_info'>
            <p className='dashboard_info_title'>Total Saved Recommendations</p>
            <p className='dashboard_info_value'>{summaryCompleted.saved}</p>
          </div>
          <div className='dashboard_info'>
            <p className='dashboard_info_title'>
              Total Unsaved Recommendations
            </p>
            <p className='dashboard_info_value'>{summaryCompleted.unsaved}</p>
          </div>
          <div className='dashboard_info'>
            <Pie
              data={{
                datasets: [
                  {
                    data: [summaryCompleted.saved, summaryCompleted.unsaved],
                    backgroundColor: ['#18BE1F', '#E2E1E1'],
                  },
                ],
                labels: ['Total Complete', 'Total Not Complete'],
              }}
              options={{
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      usePointStyle: true,
                      pointStyle: 'circle',
                    },
                  },
                  datalabels: {
                    formatter(value, context) {
                      if (context.dataset.data) {
                        const total = (context.dataset.data as number[]).reduce(
                          (total, num) => total + num,
                          0
                        );
                        const percentage =
                          ((value * 100) / total).toFixed(1) + '%';
                        return percentage;
                      }
                      return '0%';
                    },
                    color: ['#fff', '#3e3e3e'],
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-[20px]'>
        <div className='col-span-1 dashboard_box'>
          <TableHome
            tableName={[{name: 'COMPLETED DURATION', colSpan: 2}]}
            tableValue={[
              {
                name: 'Fastest',
                value: completedDuration.fastest,
              },
              {
                name: 'Average',
                value: completedDuration.average,
              },
              {
                name: 'Slowest',
                value: completedDuration.slowest,
              },
            ]}
            tableKey={['name', 'value']}
            tHeadBg={'#474747'}
          />
        </div>
        <div className='col-span-3 dashboard_box'>
          <div className='dashboard_info'>
            <p className='dashboard_text_title'>Total Respondent per Period</p>
            {totalRespondentsPerPeriod.completed.length > 0 &&
            totalRespondentsPerPeriod.uncompleted.length > 0 ? (
              <Line
                data={{
                  datasets: [
                    {
                      label: 'Total Completed Respondents',
                      data: Object.keys(
                        totalRespondentsPerPeriod.completed
                      ).map(
                        (item: string) =>
                          totalRespondentsPerPeriod.completed[item]
                      ),
                      borderColor: '#E0150A',
                      backgroundColor: '#E0150A',
                    },
                    {
                      label: 'Total Uncompleted Respondents',
                      data: Object.keys(
                        totalRespondentsPerPeriod.uncompleted
                      ).map(
                        (item: string) =>
                          totalRespondentsPerPeriod.uncompleted[item]
                      ),
                      borderColor: '#F1CDC6',
                      backgroundColor: '#F1CDC6',
                    },
                  ],
                  labels: [...Object.keys(totalRespondentsPerPeriod.completed)],
                }}
                options={{
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                      },
                    },
                    datalabels: {
                      font: {
                        size: 0,
                      },
                    },
                  },
                }}
              />
            ) : (
              <p>No Data Found</p>
            )}
          </div>
        </div>
      </div>
      <div className='dashboard_box'>
        <div className='dashboard_info'>
          <p className='dashboard_text_title'>Total Answers per Question</p>
          {totalAnswersPerQuestion.length > 0 ? (
            <Bar
              data={{
                labels: totalAnswersPerQuestion.map((_, idx) => `Q${idx + 1}`),
                datasets: [
                  {
                    label: 'Total Answers per Question',
                    data: totalAnswersPerQuestion.map(
                      (item: any) => item.total
                    ),
                    backgroundColor: '#E0150A',
                  },
                ],
              }}
              options={{
                plugins: {
                  datalabels: {
                    color: '#FFF',
                  },
                },
              }}
            />
          ) : (
            <p>No Data Found</p>
          )}
        </div>
      </div>
      <div className='dashboard_box'>
        <div className='dashboard_info'>
          <p className='dashboard_text_title'>Summary of Answered Questions</p>
          {summaryAnsweredQuestionsDuration.length > 0 ? (
            <TableHome
              tableName={[
                {
                  name: 'Question',
                  colSpan: 1,
                },
                {
                  name: 'Fastest',
                  colSpan: 1,
                },
                {
                  name: 'Average',
                  colSpan: 1,
                },
                {
                  name: 'Slowest',
                  colSpan: 1,
                },
              ]}
              tableValue={summaryAnsweredQuestionsDuration.map(
                (item: any, idx) => ({
                  name: `Question ${idx + 1}`,
                  ...item,
                })
              )}
              tableKey={['name', 'fastest', 'average', 'slowest']}
            />
          ) : (
            <p>No Data Found</p>
          )}
        </div>
      </div>
      <div className='dashboard_box'>
        <div className='dashboard_info'>
          <p className='dashboard_text_title'>Most Submission by Sales</p>
          {mostSubmissionBySales.length > 0 ? (
            <Table
              listTitle={[
                'Rank',
                'User Name',
                'Name',
                'Email',
                'Phone',
                'Status',
                'Total Submission',
              ]}
              data={mostSubmissionBySales}
              listKey={[
                'brand_name',
                'series_name',
                'total_variant',
                'is_active',
                'created_at',
                'action',
                'detail',
              ]}
              type={'product'}
              subType='product'
              id={''}
            />
          ) : (
            <p>No Data Found</p>
          )}
        </div>
      </div>
      <div className='dashboard_box'>
        <div className='dashboard_info'>
          <p className='dashboard_text_title'>Most Selected Product</p>
          <div className='grid grid-cols-5 gap-[20px]'>
            {mostSelectedProduct.length > 0 ? (
              mostSelectedProduct.map((item: any, idx: number) => (
                <div
                  className='flex flex-col bg-[#B5B5B5] rounded-[20px]'
                  key={item.product_name}
                >
                  <Card
                    // brand_name='Mitsubishi'
                    product_level_1_name={item.product_name}
                    product_level_2_name={item.variant_name}
                    price={item.price}
                    image={item.image}
                  />
                  <div className='flex items-center gap-[5px] py-[5px] px-[10px] text-white'>
                    <span className='font-bold text-[24px] '>#{idx + 1}</span>
                    <span className=''>Choosen</span>
                    <span className='font-bold'>{item.total}</span>X
                  </div>
                </div>
              ))
            ) : (
              <p> No Data Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
