'use client';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {useModal, useSpec} from '@/context';
import Cookies from 'js-cookie';
import Image from 'next/image';
import {CheckIcon, PencilIcon, TrashIcon, UncheckIcon} from '@/public';
import {Spec} from '@/types';
import {FaCheck} from 'react-icons/fa';
import {IoClose} from 'react-icons/io5';
interface SpecListInput extends Spec {
  isEdit: boolean;
  newName: string;
}
interface Payload {
  name: string;
  is_active: number;
  id: number;
}
export default function SpecForm({
  title,
  data,
  setData,
}: {
  title: string;
  data: {[key: string]: any};
  setData: Dispatch<SetStateAction<any>>;
}) {
  const {setShowModal} = useModal();
  const {
    specs,
    setSpecs,
    selectedSpecs,
    setSelectedSpecs,
    createSpec,
    updateSpec,
    deleteSpec,
    getListSpec,
    fetchSpecs,
    setFetchSpecs,
  } = useSpec();
  const [payload, setPayload] = useState<Payload>({
    name: '',
    is_active: 1,
    id: 0,
  });
  const [specListInput, setSpecListInput] = useState<SpecListInput[]>([]);
  const handleChecked = useCallback(
    (checked: boolean, item: any, idx: number) => {
      if (checked) {
        setSpecListInput((prev) => {
          let updatedData = prev;
          updatedData[idx] = {
            ...updatedData[idx],
            id: item.id,
            name: item.name,
            checked: true,
          };
          return updatedData;
        });
        setSelectedSpecs([
          ...selectedSpecs,
          {
            id: item.id,
            name: item.name,
            checked: true,
            value: '',
          },
        ]);
      } else {
        setSpecListInput((prev) => {
          let updatedData = prev;
          updatedData[idx] = {
            ...updatedData[idx],
            id: item.id,
            name: item.name,
            checked: false,
          };
          return updatedData;
        });
        let updatedData = selectedSpecs;
        updatedData = updatedData.filter((el) => el.id !== item.id);
        setSelectedSpecs(updatedData);
      }
    },
    [specListInput, selectedSpecs]
  );
  const handleClickEditSpec = useCallback(
    (index: number, value: boolean) => {
      if (value)
        setSpecListInput((prev) => {
          let specListInput = [...prev];
          specListInput[index] = {
            ...specListInput[index],
            isEdit: value,
          };
          return specListInput;
        });
      else
        setSpecListInput((prev) => {
          let specListInput = [...prev];
          specListInput[index] = {
            ...specListInput[index],
            isEdit: value,
            newName: specListInput[index].name,
          };
          return specListInput;
        });
    },
    [specListInput, payload]
  );

  const handleChangeEditSpec = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) => {
      setSpecListInput((prev) => {
        let brandListInput = [...prev];
        brandListInput[index] = {
          ...brandListInput[index],
          newName: e.target.value,
        };
        return brandListInput;
      });
    },
    [specListInput]
  );
  const handleUpdateEditSpec = useCallback(
    async (payload: Payload) => {
      try {
        const {code} = await updateSpec(payload);
        if (code === 200) {
          setFetchSpecs(false);
          await getListSpec();
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    [specs, specListInput]
  );
  const handleDeleteSpec = useCallback(
    async (id: number) => {
      try {
        const {code} = await deleteSpec(id);
        if (code === 200) {
          setFetchSpecs(false);
          await getListSpec();
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    [specs, specListInput]
  );

  useEffect(() => {
    setSpecListInput(
      specs.map((item) => ({...item, isEdit: false, newName: item.name}))
    );
  }, [specs]);

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
            await createSpec(payload);
            setFetchSpecs(false);
            await getListSpec();
            setShowModal(false);
          }}
        >
          Done
        </button>
      </div>
      <div className='modal_form_list'>
        <div className='modal_form_list_title'>Specification List</div>
        <div className='modal_form_list_ctr'>
          {specListInput.map((el, idx) => (
            <div
              key={`spec_${el.id}_${el.name}`}
              className='modal_form_input_ctr'
            >
              {el.isEdit ? (
                <>
                  <div className='modal_item_input'>
                    <Image
                      src={el.checked ? CheckIcon : UncheckIcon}
                      className='modal_checkbox_icon'
                      alt='check_icon'
                      onClick={() => handleChecked(!el.checked, el, idx)}
                    />
                    <div className='item_input_edit_wrapper'>
                      <input
                        type='text'
                        className='item_input_edit'
                        value={el.newName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChangeEditSpec(e, idx)
                        }
                      />
                      <FaCheck
                        color='#06D001'
                        className='item_input_edit_confirm'
                        onClick={() =>
                          handleUpdateEditSpec({
                            name: el.newName,
                            id: el.id,
                            is_active: 1,
                          })
                        }
                        height={20}
                        width={20}
                      />
                      <IoClose
                        color='#FF0000'
                        className='item_input_edit_cancel'
                        onClick={() => handleClickEditSpec(idx, false)}
                        height={20}
                        width={20}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className='modal_form_input'>
                    <input
                      type='checkbox'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChecked(e.target.checked, el, idx)
                      }
                      checked={el.checked}
                      id={`c_spec_${el.id}_${el.name}`}
                      className='modal_input_checkbox'
                    />
                    <Image
                      src={el.checked ? CheckIcon : UncheckIcon}
                      className='modal_checkbox_icon'
                      alt='check_icon'
                    />
                    <label htmlFor={`c_spec_${el.id}_${el.name}`}>
                      {el.name}
                    </label>
                  </div>
                  <div className='flex items-center gap-[10px]'>
                    <Image
                      src={PencilIcon}
                      className='w-[15px] h-[15px] cursor-pointer'
                      alt='pencil_icon'
                      onClick={() => handleClickEditSpec(idx, true)}
                    />
                    <Image
                      src={TrashIcon}
                      className='w-[15px] h-[15px] cursor-pointer'
                      alt='trash_icon'
                      onClick={() => handleDeleteSpec(el.id)}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
