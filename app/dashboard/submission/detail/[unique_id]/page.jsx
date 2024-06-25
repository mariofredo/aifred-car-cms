'use client';
import Image from 'next/image';
import {ContactIcon, MailIcon, UserIcon} from '@/public';
import {DefaultContainer, TableHome, Card} from '@/components';
import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import '@/styles/submissionDetail.scss';

export default function page() {
  const {unique_id} = useParams();
  const [submissionDetail, setSubmissionDetail] = useState(null);

  const token = Cookies.get('token');
  useEffect(() => {
    if (unique_id) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/submission/${unique_id}`;

      fetch(apiUrl, {
        method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          const submissionDetail = data.data;

          setSubmissionDetail(submissionDetail);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [unique_id]);

  if (!submissionDetail) {
    return <div>Loading...</div>;
  }

  const questionDetails = submissionDetail.question_details?.map((detail, index) => ({
    number: index + 1,
    question: detail.question,
    answer: detail.answer,
    tag: detail.tag,
    duration: detail.duration,
  }));
  return (
    <div className='flex flex-col gap-[15px]'>
      <DefaultContainer title={'Submission Detail'} />
      <div className='sd_about'>
        <div className='sd_about_title'>About</div>
        <div className='sd_about_content'>
          <Image src={UserIcon} width={20} height={20} alt='profile_icon' />
          <p>PIC</p>
          <p>
            <span className='highlight'>{submissionDetail.name}</span>
          </p>
        </div>
        <div className='sd_about_content'>
          <Image src={ContactIcon} width={20} height={20} alt='profile_icon' />
          <p>Contact</p>
          <p>
            <span className='highlight'>{submissionDetail.phone}</span>
          </p>
        </div>
        <div className='sd_about_content'>
          <Image src={MailIcon} width={20} height={20} alt='profile_icon' />
          <p>Email</p>
          <p>
            <span className='highlight'>{submissionDetail.email}</span>
          </p>
        </div>
      </div>
      <div className='sd_content_container'>
        <div className='w-full flex justify-between'>
          <p className='content_title'>Questions Details</p>
          <button className='back_button'>
            <Link href="/dashboard/submission/">
            <p>Back</p>
            </Link>
          </button>
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
          tableValue={questionDetails}
          tableKey={['number', 'question', 'answer', 'tag', 'duration']}
          tHeadBg={'#474747'}
        />
      </div>
      {submissionDetail.choosen_product && (
      <div className='sd_content_container_row'>
        <div>
          <p className='choosen_text'>Choosen Product</p>
        </div>
        <div>
          <Card
            image={submissionDetail.choosen_product.image}
            brand_name='Mitsubishi'
            product_level_1_name={submissionDetail.choosen_product.product}
            product_level_2_name={submissionDetail.choosen_product.variant}
            price={`Rp ${submissionDetail.choosen_product.price.toLocaleString()}`}
          />
        </div>
      </div>
        )}
    </div>
  );
}
