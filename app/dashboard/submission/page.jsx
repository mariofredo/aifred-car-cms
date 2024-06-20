import {Select, DefaultContainer, Table} from '@/components';
import '@/styles/submission.scss';

export default function page() {
  return (
    <div>
      <DefaultContainer title={'Submission'} />
      <div className='flex gap-[23px]'>
        <Select label={'SERIES'} />
        <Select label={'VARIANT'} />
      </div>
      <div className='submission_container'>
        <p>Submission List</p>
        <Table
          listTitle={[
            'Brand',
            'Name',
            'Sub-series name',
            'Status',
            // 'Created by and date',
            'Image',
          ]}
          data={[
            {
              company_brand_name: 'Mitsubishi',
              category_level_1_name: 'Pajero',
              name: 'Dakkar Ultimate 4x4',
              status: 'Publish',
              image: '',
            },
          ]}
          listKey={[
            'company_brand_name',
            'category_level_1_name',
            'name',
            'status',
            'image',
          ]}
          type={'product'}
          productId={null}
        />
      </div>
    </div>
  );
}
