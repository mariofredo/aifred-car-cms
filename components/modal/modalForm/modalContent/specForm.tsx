'use client';
import {Dispatch, SetStateAction, useCallback, useState} from 'react';
import {useModal} from '@/context/ModalContext';
import {useSpec} from '@/context/SpecContext';
import Cookies from 'js-cookie';
export default function SpecForm({
  title,
  data,
  setData,
}: {
  title: string;
  data: {[key: string]: any};
  setData: Dispatch<SetStateAction<any>>;
}) {
  const token = Cookies.get('token')?.toString();
  const {setShowModal} = useModal();
  const {
    specs,
    setSpecs,
    selectedSpecs,
    setSelectedSpecs,
    createSpec,
    getListSpec,
    fetchSpecs,
    setFetchSpecs,
  } = useSpec();
  const [payload, setPayload] = useState({name: ''});
  const [bool, setBool] = useState(false);
  const handleChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, item: any, idx: number) => {
      if (e.target.checked) {
        setSpecs((prev) => {
          let updatedData = prev;
          updatedData[idx] = {id: item.id, name: item.name, checked: true};
          return updatedData;
        });
        setSelectedSpecs([
          ...selectedSpecs,
          {id: item.id, name: item.name, checked: true, value: ''},
        ]);
      } else {
        setSpecs((prev) => {
          let updatedData = prev;
          updatedData[idx] = {id: item.id, name: item.name, checked: false};
          return updatedData;
        });
        let updatedData = selectedSpecs;
        updatedData = updatedData.filter((el) => el.id !== item.id);
        setSelectedSpecs(updatedData);
      }
    },
    [specs, selectedSpecs]
  );
  return (
    <>
      <div className='modal_form_title'>
        {title} <span>Spec category name max. 20 characters</span>
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
        <button
          className='btn_cancel'
          onClick={() => {
            setShowModal(false);
          }}
        >
          Cancel
        </button>
        <button
          className='btn_done'
          onClick={async () => {
            createSpec(payload);
            setFetchSpecs(false);
            getListSpec();
            setShowModal(false);
          }}
        >
          Done
        </button>
      </div>
      <div className='modal_form_list'>
        <div className='modal_form_list_title'>Spec Category List</div>
        <div className='modal_form_list_ctr'>
          {specs.map((el, idx) => (
            <div
              key={`spec_${el.id}_${el.name}`}
              className='modal_form_input_ctr'
            >
              <div className='modal_form_input'>
                <input
                  type='checkbox'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChecked(e, el, idx)
                  }
                  checked={el.checked}
                  id={`c_spec_${el.id}_${el.name}`}
                />
                <label htmlFor={`c_spec_${el.id}_${el.name}`}>{el.name}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
