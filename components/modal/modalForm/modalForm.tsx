import {Dispatch, SetStateAction} from 'react';
import {BrandForm, SpecForm, CategoryLvlOneForm} from './modalContent';
import '@/styles/modalForm.scss';
export default function ModalForm({
  title,
  content,
  data,
  setData,
  is_competitor,
  action,
}: {
  title: string;
  content: string;
  data: {
    [key: string]: any;
  };
  setData: Dispatch<SetStateAction<any>>;
  is_competitor: boolean;
  action?: () => void;
}) {
  return (
    <div className='modal_form_backdrop'>
      <div className='modal_form_ctr'>
        {content === 'brand' ? (
          <BrandForm
            title={title}
            is_competitor={is_competitor}
            action={action}
          />
        ) : content === 'spec' ? (
          <SpecForm title={title} data={data} setData={setData} />
        ) : (
          <CategoryLvlOneForm title={title} data={data} />
        )}
      </div>
    </div>
  );
}
