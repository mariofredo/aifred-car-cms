import {Dispatch, SetStateAction} from 'react';
import {BrandForm, SpecForm, CategoryLvlOneForm} from './modalContent';
import '@/styles/modalForm.scss';
export default function ModalForm({
  title,
  content,
  data,
  setData,
  is_competitor,
}: {
  title: string;
  content: string;
  data: {
    [key: string]: any;
  };
  setData: Dispatch<SetStateAction<any>>;
  is_competitor: boolean;
}) {
  return (
    <div className='modal_form_backdrop'>
      <div className='modal_form_ctr'>
        {content === 'brand' ? (
          <BrandForm title={title} is_competitor={is_competitor} />
        ) : content === 'spec' ? (
          <SpecForm title={title} data={data} setData={setData} />
        ) : (
          <CategoryLvlOneForm title={title} data={data} />
        )}
      </div>
    </div>
  );
}
