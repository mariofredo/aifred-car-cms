'use client';
import {useState} from 'react';
import {Card, DateRange, HomeHeader, Select, Table} from '@/components';
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

export default function DashboardHome() {
  const [dataRespondent, setDataRespondent] = useState();
  const [dataTotalCompleted, setTotalCompleted] = useState();
  return (
    <div className='dashboard_home_ctr'>
      <HomeHeader />
      <div className='dashboard_home_filter'>
        <Select
          options={[
            {
              label: 'Mitsubishi',
              value: 'Mitsubishi',
            },
            {
              label: 'Hyundai',
              value: 'Hyundai',
            },
          ]}
        />
        <Select
          options={[
            {
              label: 'Mitsubishi',
              value: 'Mitsubishi',
            },
            {
              label: 'Hyundai',
              value: 'Hyundai',
            },
          ]}
        />
        {/* <DateRange /> */}
      </div>
      <div className='dashboard_box'>
        <div className='grid grid-cols-4 gap-[50px]'>
          <div className='dashboard_info'>
            <p className='dashboard_info_title'>Total Respondents</p>
            <p className='dashboard_info_value'>1479</p>
          </div>
          <div className='dashboard_info'>
            <p className='dashboard_info_title'>Completed</p>
            <p className='dashboard_info_value'>379</p>
          </div>
          <div className='dashboard_info'>
            <p className='dashboard_info_title'>Uncompleted</p>
            <p className='dashboard_info_value'>1100</p>
          </div>
          <div className='dashboard_info'>
            <Pie
              data={{
                datasets: [
                  {
                    data: [379, 1100],
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
      <div className='dashboard_box'>
        <div className='grid grid-cols-4 gap-[50px]'>
          <div className='dashboard_info'>
            <p className='dashboard_info_title'>Total Respondents</p>
            <p className='dashboard_info_value'>1479</p>
          </div>
          <div className='dashboard_info'>
            <p className='dashboard_info_title'>Completed</p>
            <p className='dashboard_info_value'>379</p>
          </div>
          <div className='dashboard_info'>
            <p className='dashboard_info_title'>Uncompleted</p>
            <p className='dashboard_info_value'>1100</p>
          </div>
          <div className='dashboard_info'>
            <Pie
              data={{
                datasets: [
                  {
                    data: [379, 1100],
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
                      console.log(value, 'value');
                      console.log(context, 'context');
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
          <Table
            tableName={[{name: 'COMPLETED DURATION', colSpan: 2}]}
            tableValue={[
              {
                name: 'Complete',
                value: '02:56',
              },
              {
                name: 'Fastest',
                value: '02:56',
              },
              {
                name: 'Average',
                value: '02:56',
              },
              {
                name: 'Slowest',
                value: '02:56',
              },
            ]}
            tableKey={['name', 'value']}
            tHeadBg={'#474747'}
          />
        </div>
        <div className='col-span-3 dashboard_box'>
          <div className='dashboard_info'>
            <p className='dashboard_text_title'>Total Respondent per Period</p>
            <Line
              data={{
                datasets: [
                  {
                    label: 'Total Completed Respondents',
                    data: [10, 60, 40, 10, 30],
                    borderColor: '#E0150A',
                    backgroundColor: '#E0150A',
                  },
                  {
                    label: 'Total Uncompleted Respondents',
                    data: [40, 20, 10, 5, 10],
                    borderColor: '#F1CDC6',
                    backgroundColor: '#F1CDC6',
                  },
                ],
                labels: [
                  'Total Completed Respondents',
                  'Total Uncompleted Respondents',
                ],
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
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className='dashboard_box'>
        <div className='dashboard_info'>
          <p className='dashboard_text_title'>Total Answers per Question</p>
          <Bar
            data={{
              labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
              datasets: [
                {
                  label: 'Test',
                  data: [1, 30, 40, 60, 100],
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
        </div>
      </div>
      <div className='dashboard_box'>
        <div className='dashboard_info'>
          <p className='dashboard_text_title'>Summary of Answered Questions</p>
          <Table
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
            tableValue={[
              {
                name: 'Question 1',
                fastest: '00:02',
                average: '00:43',
                slowest: '02:43',
              },
              {
                name: 'Question 2',
                fastest: '00:02',
                average: '00:43',
                slowest: '02:43',
              },
              {
                name: 'Question 3',
                fastest: '00:02',
                average: '00:43',
                slowest: '02:43',
              },
              {
                name: 'Question 4',
                fastest: '00:02',
                average: '00:43',
                slowest: '02:43',
              },
              {
                name: 'Question 5',
                fastest: '00:02',
                average: '00:43',
                slowest: '02:43',
              },
            ]}
            tableKey={['name', 'fastest', 'average', 'slowest']}
          />
        </div>
      </div>
      <div className='dashboard_box'>
        <div className='dashboard_info'>
          <p className='dashboard_text_title'>Summary of Answered Questions</p>
          <div className='grid grid-cols-5 gap-[20px]'>
            <Card
              brand_name='Mitsubishi'
              product_level_1_name='Pajero Dakkar'
              product_level_2_name='Ultimate 4x4 AT'
              price={'Rp 200.000.000'}
            />
            <Card
              brand_name='Mitsubishi'
              product_level_1_name='Pajero Dakkar'
              product_level_2_name='Ultimate 4x4 AT'
              price={'Rp 200.000.000'}
            />
            <Card
              brand_name='Mitsubishi'
              product_level_1_name='Pajero Dakkar'
              product_level_2_name='Ultimate 4x4 AT'
              price={'Rp 200.000.000'}
            />
            <Card
              brand_name='Mitsubishi'
              product_level_1_name='Pajero Dakkar'
              product_level_2_name='Ultimate 4x4 AT'
              price={'Rp 200.000.000'}
            />
            <Card
              brand_name='Mitsubishi'
              product_level_1_name='Pajero Dakkar'
              product_level_2_name='Ultimate 4x4 AT'
              price={'Rp 200.000.000'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
