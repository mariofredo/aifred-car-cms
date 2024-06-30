'use client';
import {useModal, useBrand} from '@/context';
import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import {PencilIcon, TrashIcon} from '@/public';
import {Brand} from '@/types';
import {FaCheck} from 'react-icons/fa6';
import {IoClose} from 'react-icons/io5';
interface BrandListInput extends Brand {
  checked: boolean;
  newValue: string;
  isEdit: boolean;
}
interface Payload {
  name: string;
  is_active: number;
  unique_id: string;
}
export default function BrandForm({
  title,
  action,
  is_competitor,
}: {
  title: string;
  action?: () => void;
  is_competitor: boolean;
}) {
  const token = Cookies.get('token_aifred_neo_cms');
  const {setShowModal} = useModal();
  const {createBrand, getListBrand, updateBrand, deleteBrand} = useBrand();
  const [payload, setPayload] = useState({
    name: '',
    is_active: 1,
    unique_id: '',
  });
  const [brandListInput, setBrandListInput] = useState<BrandListInput[]>([]);
  const callGetListBrand = useCallback(async () => {
    const {data} = await getListBrand();
    setBrandListInput(
      data.map((item: Brand) => ({
        ...item,
        checked: false,
        newValue: item.name,
        isEdit: false,
      }))
    );
  }, []);
  const callUpdateBrand = useCallback(
    async (payload: Payload) => {
      const {code} = await updateBrand({
        name:
          brandListInput.find((item) => item.unique_id === payload.unique_id)
            ?.newValue || '',
        is_active: payload.is_active,
        unique_id: payload.unique_id,
      });
      if (code === 200) {
        await getListBrand();
        setShowModal(false);
      }
    },
    [payload, brandListInput]
  );
  const callDeleteBrand = useCallback(
    async (unique_id: string) => {
      const {code} = await deleteBrand(unique_id);
      if (code === 200) {
        await getListBrand();
        setShowModal(false);
      }
    },
    [payload, brandListInput]
  );
  const handleClickEditBrand = useCallback(
    (index: number, value: boolean) => {
      if (value)
        setBrandListInput((prev) => {
          let brandListInput = [...prev];
          brandListInput[index] = {
            ...brandListInput[index],
            isEdit: value,
          };
          return brandListInput;
        });
      else
        setBrandListInput((prev) => {
          let brandListInput = [...prev];
          brandListInput[index] = {
            ...brandListInput[index],
            isEdit: value,
            newValue: brandListInput[index].name,
          };
          return brandListInput;
        });
    },
    [brandListInput]
  );
  const handleChangeEditBrand = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) => {
      setBrandListInput((prev) => {
        let brandListInput = [...prev];
        brandListInput[index] = {
          ...brandListInput[index],
          newValue: e.target.value,
        };
        return brandListInput;
      });
    },
    [brandListInput]
  );
  useEffect(() => {
    callGetListBrand();
  }, []);
  return (
    <>
      <div className='modal_form_title'>
        {title} <span>Brand name max. 20 characters</span>
      </div>
      {/* <div className='h-[2px] bg-[#dfdfdf] w-full'></div> */}

      <div className='modal_form_input'>
        <div className='modal_form_wrapper'>
          <input
            type='text'
            name='name'
            value={payload.name}
            placeholder='Enter new brand'
            onChange={(e) => setPayload({...payload, name: e.target.value})}
          />
        </div>

        <div className='modal_form_btn_ctr'>
          <button className='btn_cancel' onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button
            className={`btn_done ${!payload.name && 'cursor-not-allowed'}`}
            onClick={async () => {
              const data = await createBrand(payload);
              if (data.code === 200) {
                // await getListBrand(is_competitor ? 1 : 0);
                action && action();
                setShowModal(false);
              }
            }}
            disabled={!payload.name}
          >
            Done
          </button>
        </div>
      </div>
      <div className='modal_form_input'>
        <div className='modal_form_wrapper'>
          <div className='flex items-center gap-[10px]'>
            <div className='text-[18px] text-[#3e3e3e]'>Brand List</div>
          </div>
          <div className='modal_item_ctr'>
            {brandListInput.map((item, i) => (
              <div className='modal_item' key={item.unique_id}>
                {item.isEdit ? (
                  <div className='modal_item_input'>
                    <div
                      className={`item_input_circle ${
                        payload.unique_id === item.unique_id ? 'active' : ''
                      }`}
                      onClick={() =>
                        setPayload((prev) => ({
                          ...prev,
                          unique_id: item.unique_id,
                        }))
                      }
                    ></div>
                    <div className='item_input_edit_wrapper'>
                      <input
                        type='text'
                        className='item_input_edit'
                        value={item.newValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChangeEditBrand(e, i)
                        }
                      />
                      <FaCheck
                        color='#06D001'
                        className='item_input_edit_confirm'
                        onClick={() =>
                          callUpdateBrand({
                            ...payload,
                            unique_id: item.unique_id,
                          })
                        }
                        height={20}
                        width={20}
                      />
                      <IoClose
                        color='#FF0000'
                        className='item_input_edit_cancel'
                        onClick={() => handleClickEditBrand(i, false)}
                        height={20}
                        width={20}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='modal_item_radio'>
                      <input
                        type='radio'
                        id={`active_${item.unique_id}`}
                        className='item_radio_input'
                        name='is_active'
                        value={item.unique_id}
                        checked={payload.unique_id === item.unique_id}
                        onChange={() =>
                          setPayload({
                            ...payload,
                            unique_id: item.unique_id,
                          })
                        }
                      />
                      <span className='item_radio_circle'></span>
                      <label htmlFor='active_1' className='item_radio_label'>
                        {item.name}
                      </label>
                    </div>
                    <div className='flex items-center gap-[10px]'>
                      <Image
                        src={PencilIcon}
                        className='w-[15px] h-[15px] cursor-pointer'
                        alt='pencil_icon'
                        onClick={() =>
                          // payload.selected_brand === item.unique_id &&
                          handleClickEditBrand(i, true)
                        }
                      />
                      <Image
                        src={TrashIcon}
                        className='w-[15px] h-[15px] cursor-pointer'
                        alt='trash_icon'
                        onClick={() => callDeleteBrand(item.unique_id)}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
