'use client';
import {useBrand} from '@/context/BrandContext';
import {useCategory} from '@/context/CategoryContext';
import {useModal} from '@/context/ModalContext';
import {useState} from 'react';
import Cookies from 'js-cookie';
export default function CategoryLvlOneForm({
  title,
  data,
}: {
  title: string;
  data: {[key: string]: any};
}) {
  const token = Cookies.get('token');
  const {setShowModal} = useModal();
  const {brands, getListBrand} = useBrand();
  const {createCategoryOne, getListCategoryOne} = useCategory();
  const [payload, setPayload] = useState({
    name: '',
    company_brand_id: data.company_brand_id,
    status: 0,
  });

  return (
    <>
      <div className='modal_form_title'>
        {title} <span>Brand name max. 20 characters</span>
      </div>

      <div className='modal_form_input'>
        <div className='modal_form_wrapper'>
          <input
            type='text'
            name='name'
            value={payload.name}
            placeholder='Enter new product'
            onChange={(e) => setPayload({...payload, name: e.target.value})}
          />
        </div>
      </div>
      <div className='modal_form_btn_ctr'>
        <button className='btn_cancel' onClick={() => setShowModal(false)}>
          Cancel
        </button>
        <button
          className='btn_done'
          onClick={async () => {
            const data = await createCategoryOne(payload);
            if (data.code === 200) {
              await getListCategoryOne(payload.company_brand_id);
              setShowModal(false);
            }
          }}
        >
          Done
        </button>
      </div>
    </>
  );
}
