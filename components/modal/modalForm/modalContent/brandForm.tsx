'use client';
import {useBrand} from '@/context/BrandContext';
import {useModal} from '@/context/ModalContext';
import {useState} from 'react';
import Cookies from 'js-cookie';
export default function BrandForm({
  title,
  is_competitor,
}: {
  title: string;
  is_competitor: boolean;
}) {
  const token = Cookies.get('token');
  const {setShowModal} = useModal();
  const {createBrand, getListBrand} = useBrand();
  const [payload, setPayload] = useState({
    name: '',
    is_competitor: is_competitor ? 1 : 0,
  });

  return (
    <>
      <div className='modal_form_title'>
        {title} <span>Brand name max. 20 characters</span>
      </div>
      {/* <div className='h-[2px] bg-[#dfdfdf] w-full'></div> */}

      <div className='modal_form_input'>
        <div className='modal_form_wrapper'>
          {/* <div className='flex items-center gap-[10px]'>
            <div className='text-[18px] text-[#3e3e3e]'>Name</div>
            <div className='text-[12px] text-[#b5b5b5]'>
              (<span className='text-[#F31D1E]'>*</span>) are mandatory
            </div>
          </div> */}
          <input
            type='text'
            name='name'
            value={payload.name}
            placeholder='Enter new brand'
            onChange={(e) => setPayload({...payload, name: e.target.value})}
          />
        </div>
        {/* <div className='modal_form_wrapper'>
          <div className='flex items-center gap-[10px]'>
            <div className='text-[18px] text-[#3e3e3e]'>IsCompetitor</div>
            <div className='text-[12px] text-[#b5b5b5]'>
              (<span className='text-[#F31D1E]'>*</span>) are mandatory
            </div>
          </div>
          <label className='switch'>
            <input
              type='checkbox'
              onChange={(e) =>
                setPayload({
                  ...payload,
                  is_competitor: e.target.checked ? 1 : 0,
                })
              }
            />
            <span className='slider round'></span>
          </label>
        </div>
        <div className='modal_form_wrapper'>
          <div className='flex items-center gap-[10px]'>
            <div className='text-[18px] text-[#3e3e3e]'>IsActive</div>
            <div className='text-[12px] text-[#b5b5b5]'>
              (<span className='text-[#F31D1E]'>*</span>) are mandatory
            </div>
          </div>
          <label className='switch'>
            <input
              type='checkbox'
              onChange={(e) =>
                setPayload({...payload, status: e.target.checked ? 1 : 0})
              }
            />
            <span className='slider round'></span>
          </label>
        </div> */}
      </div>
      <div className='modal_form_btn_ctr'>
        <button className='btn_cancel' onClick={() => setShowModal(false)}>
          Cancel
        </button>
        <button
          className='btn_done'
          onClick={async () => {
            const data = await createBrand(payload);
            if (data.code === 200) {
              await getListBrand(is_competitor ? 1 : 0);
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
