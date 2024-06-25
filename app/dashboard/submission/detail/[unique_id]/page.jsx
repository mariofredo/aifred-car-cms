'use client';
import Image from 'next/image';
import {ContactIcon, MailIcon, UserIcon} from '@/public';
import {DefaultContainer, TableHome, Card} from '@/components';
import Link from 'next/link';
import '@/styles/submissionDetail.scss';

export default function page() {
  return (
    <div className='flex flex-col gap-[15px]'>
      <DefaultContainer title={'Submission Detail'} />
      <div className='sd_about'>
        <div className='sd_about_title'>About</div>
        <div className='sd_about_content'>
          <Image src={UserIcon} width={20} height={20} alt='profile_icon' />
          <p>PIC</p>
          <p>
            Mr. <span className='highlight'>John Doe</span>
          </p>
        </div>
        <div className='sd_about_content'>
          <Image src={ContactIcon} width={20} height={20} alt='profile_icon' />
          <p>Contact</p>
          <p>
            +62 <span className='highlight'>811234124</span>
          </p>
        </div>
        <div className='sd_about_content'>
          <Image src={MailIcon} width={20} height={20} alt='profile_icon' />
          <p>Email</p>
          <p>
            <span className='highlight'>johndoe@pertamina.com</span>
          </p>
        </div>
      </div>
      <div className='sd_content_container'>
        <div className='w-full flex justify-between'>
          <p className='content_title'>Questions Details</p>
          <Link href={`/dashboard/submission/`}>
          <button className='back_button'>
            <p>Back</p>
          </button></Link>
        </div>
        <TableHome
          tableName={[
            {
              name: 'No',
              colSpan: 1,
            },
            {
              name: 'Question',
              colSpan: 1,
            },
            {
              name: 'Answer',
              colSpan: 1,
            },
            {
              name: 'Tag',
              colSpan: 1,
            },
            {
              name: 'Duration',
              colSpan: 1,
            },
          ]}
          tableValue={[
            {
              number: 'Question 1',
              question: '00:02',
              answer: '00:43',
              tag: '02:43',
              duration: '00:02',
            },
            {
              number: 'Question 2',
              question: '00:02',
              answer: '00:43',
              tag: '02:43',
              duration: '00:02',
            },
            {
              number: 'Question 3',
              question: '00:02',
              answer: '00:43',
              tag: '02:43',
              duration: '00:02',
            },
            {
              number: 'Question 4',
              question: '00:02',
              answer: '00:43',
              tag: '02:43',
              duration: '00:02',
            },
            {
              number: 'Question 5',
              question: '00:02',
              answer: '00:43',
              tag: '02:43',
              duration: '00:02',
            },
          ]}
          tableKey={['number', 'question', 'answer', 'tag', 'duration']}
          tHeadBg={'#474747'}
        />
      </div>
      <div className='sd_content_container_row'>
        <div>
          <p className='choosen_text'>Choosen Product</p>
        </div>
        <div>
          <Card
            brand_name='Mitsubishi'
            product_level_1_name='Pajero Dakkar'
            product_level_2_name='Ultimate 4x4 AT'
            price={'Rp 200.000.000'}
          />
        </div>
      </div>
    </div>
  );
}
