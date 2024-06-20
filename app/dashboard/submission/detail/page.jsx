import Image from 'next/image';
import {ContactIcon, MailIcon, UserIcon} from '@/public';
import {Select, DefaultContainer, TableHome, Card} from '@/components';
import '@/styles/submissionDetail.scss';

export default function page() {
  return (
    <div>
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
      <div>
        <div>
          <p>Questions Details</p>
          <button>back</button>
        </div>
        <TableHome
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
      <div>
        <div>
          <p>Choosen Product</p>
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
