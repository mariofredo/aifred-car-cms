'use client';
import {CirclePlus} from '@/public';
import Image from 'next/image';
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {SelectedSpec, Tag} from '@/types';
import {ModalForm, TagInput} from '@/components';
import {useModal, useSpec, useVariant} from '@/context';
import {useParams, useRouter} from 'next/navigation';
import Link from 'next/link';
interface Payload {
  variant_name: string;
  price: number;
  image: File | null;
  is_active: number;
}
export default function VariantForm({type}: {type: string}) {
  const {id, variantId}: {id: string; variantId: string} = useParams();
  const router = useRouter();
  const {createVariant, getDetailVariant, updateVariant} = useVariant();
  const {showModal, setShowModal} = useModal();
  const {
    selectedSpecs,
    setSelectedSpecs,
    getListSpec,
    specs,
    setSpecs,
    fetchSpecs,
    setFetchSpecs,
  } = useSpec();
  const [payload, setPayload] = useState<Payload>({
    variant_name: '',
    price: 0,
    image: null,
    is_active: 0,
  });
  const [previewImg, setPreviewImg] = useState<string>('');
  const [tags, setTags] = useState<Tag[]>([]);
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleAddition = (tag: Tag) => {
    // Add logic for handling tag addition
    setTags([...tags, tag]);
  };

  const handleDelete = (i: number) => {
    // Add logic for handling tag deletion
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };
  const handleSelectedSpecChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
      setSelectedSpecs((prev) => {
        const updatedData = [...prev];
        updatedData[idx] = {
          ...updatedData[idx],
          value: e.target.value,
        };
        return updatedData;
      });
    },
    [selectedSpecs, setSelectedSpecs]
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmitVariant = useCallback(
    async (type: string, payload: Payload, id: string) => {
      try {
        switch (type) {
          case 'edit':
            // const resUpdate = await updateProduct({
            //   id,
            //   ...payload,
            // });
            // if (resUpdate.code === 200) router.push('/dashboard/product');
            return;

          default:
            const resCreate = await createVariant(id, {
              ...payload,
              spec: selectedSpecs,
            });
            if (resCreate.code === 200) router.push(`/dashboard/variant/${id}`);
            return;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [payload, id]
  );
  const callDetailVariant = useCallback(
    async (id: string, variantId: string) => {
      try {
        const {specs, variant, tags} = await getDetailVariant(id, variantId);
        console.log(variant, 'variant');
        setPayload((prev) => ({
          ...prev,
          variant_name: variant.name,
          price: variant.price,
          is_active: variant.is_active,
        }));
        setTags(
          tags.map((el: {[key: string]: any}) => ({
            id: el.tag_id.toString(),
            className: '',
            text: el.name,
          }))
        );
        setSpecs((prev) => {
          let updatedData = [...prev];
          updatedData.map((obj) => {
            if (specs) {
              let found = specs.find(
                (el: {[key: string]: any}) => obj.id === el.id
              );
              if (found) obj.checked = true;
              return obj;
            }
          });
          setSelectedSpecs((prev) => {
            return specs.map((el: SelectedSpec) => {
              const found = specs.find((key: any) => key.id === el.id);
              if (found) {
                return {
                  id: el.id,
                  checked: true,
                  name: found.name,
                  value: el.value,
                };
              }
              return {
                id: el.id,
                checked: true,
                name: '',
                value: el.value,
              };
            });
          });
          return updatedData;
        });
        setPreviewImg(variant.image);
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    getListSpec();
  }, []);
  useEffect(() => {
    if (variantId) callDetailVariant(id, variantId);
  }, [variantId]);
  useEffect(() => {
    // console.log(payload, 'payload');
    // console.log(selectedSpecs, 'spec');
  }, [payload, selectedSpecs]);
  return (
    <>
      <div className='grid grid-cols-3 gap-[30px]'>
        <div className='col-span-3'>
          <div className='text-[24px] text-[#3e3e3e] font-medium'>
            Pajero Series
          </div>
          <div className='text-[12px] text-[#b5b5b5]'>
            (<span className='text-[#F31D1E]'>*</span>) are mandatory
          </div>
        </div>
        <div className='col-span-1 flex flex-col justify-center'>
          <div className='text-[15px] font-medium'>
            VARIANT NAME<span className='text-[#F31D1E]'>*</span>
          </div>
          <div className='text-[12px] text-[#b5b5b5]'>
            Nama variant max. 20 karakter
          </div>
        </div>
        <div className='col-span-2 flex gap-[20px] '>
          <input
            name='variant_name'
            className='h-full  rounded-[10px] border-[1.5px] border-[#b5b5b5] w-full px-[15px] py-[10px] text-[24px] text-[#3e3e3e] font-semibold'
            onChange={handleChange}
            value={payload.variant_name}
          />
        </div>

        <div className='col-span-1 flex flex-col justify-center'>
          <div className='text-[15px] font-medium'>
            PRICE<span className='text-[#F31D1E]'>*</span>
          </div>
        </div>
        <div className='col-span-2 flex gap-[20px] '>
          {/* <div className='h-full w-[25%] rounded-[10px] border-[1.5px] border-[#b5b5b5] px-[15px] py-[10px] text-[24px] text-[#3e3e3e] font-semibold'>
            Rp
          </div> */}
          <input
            type='number'
            name='price'
            className='h-full w-full px-[15px] py-[10px] rounded-[10px] border-[1.5px] border-[#b5b5b5] text-[24px] text-[#3e3e3e] font-semibold'
            min={0}
            onChange={handleChange}
            value={payload.price}
          />
        </div>
        {
          <>
            <div className='col-span-1 flex flex-col justify-center'>
              <div className='text-[15px] font-medium'>
                TAGS<span className='text-[#F31D1E]'>*</span>
              </div>
            </div>
            <div className='col-span-2 flex gap-[20px] '>
              <div className='rounded-[10px] border-[1.5px] border-[#b5b5b5] p-[10px] w-full '>
                <TagInput
                  tags={tags}
                  suggestions={[
                    {
                      id: '1',
                      className: '',
                      text: 'Coklat',
                    },
                    {
                      id: '2',
                      className: '',
                      text: 'Biru',
                    },
                    {
                      id: '2',
                      className: '',
                      text: 'Cok',
                    },
                  ]}
                  handleAddition={handleAddition}
                  handleDelete={handleDelete}
                />
              </div>
            </div>
          </>
        }
        <div className='col-span-3'>
          <div className='h-[2px] bg-[#dfdfdf] w-full my-[20px]'></div>
        </div>
        <div className='col-span-3'>
          <div className='text-[24px] text-[#3e3e3e]'>
            Specification Category
          </div>
          <div className='text-[12px] text-[#b5b5b5]'>
            (<span className='text-[#F31D1E]'>*</span>) are mandatory
          </div>
        </div>
        <div className='col-span-3'>
          <button
            className='flex justify-center items-center py-[10px] px-[21px] rounded-[12px] bg-[#dfdfdf] text-[16px] w-[20%] gap-[15px] whitespace-nowrap'
            onClick={() => {
              // setModalProps({title: 'NEW SPEC CATEGORY', content: 'spec'});
              setShowModal(true);
            }}
          >
            <Image
              src={CirclePlus}
              alt='circle_plus'
              className='w-[15px] h-[15px]'
            />{' '}
            New Category
          </button>
        </div>
        <div className='col-span-3 flex gap-[20px] flex-col'>
          {selectedSpecs.map((el, idx) => (
            <div key={idx} className='w-full flex gap-[20px]'>
              <div className='h-full w-[25%] rounded-[10px] border-[1.5px] border-[#b5b5b5] px-[15px] py-[10px] text-[24px] text-[#3e3e3e] font-semibold'>
                {el.name}
              </div>
              <input
                type='text'
                name={`spec_${el.id}`}
                value={selectedSpecs[idx].value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSelectedSpecChange(e, idx)
                }
                className='h-full w-[75%] px-[15px] py-[10px] rounded-[10px] border-[1.5px] border-[#b5b5b5] text-[24px] text-[#3e3e3e] font-semibold'
              />
            </div>
          ))}
        </div>

        <div className='col-span-3'>
          <div className='h-[2px] bg-[#dfdfdf] w-full my-[20px]'></div>
        </div>
        <div className='col-span-3 flex gap-[70px]'>
          <div className='flex flex-col w-[33%]'>
            <div className='text-[24px] text-[#3e3e3e]'>Product Image</div>
            <p className='text-justify text-[12px] text-[#B5B5B5]'>
              Optimize the image by using Clear background image on .PNG format
              300 x 200 image size with less than 500 kb file size
            </p>
            <div className='flex gap-[20px]'>
              <button
                className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf]'
                onClick={() => {
                  setPreviewImg('');
                  setPayload({...payload, image: null});
                }}
              >
                Remove
              </button>
              <div className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf] bg-[#dfdfdf] relative text-center'>
                <input
                  type='file'
                  className='opacity-0 absolute top-0 left-0 w-full h-full'
                  accept='image/*'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setPayload({...payload, image: e.target.files[0]});
                      const imageUrl = URL.createObjectURL(e.target.files[0]);
                      setPreviewImg(imageUrl);
                    }
                  }}
                />
                Upload
              </div>
            </div>
          </div>
          {previewImg && (
            <img
              src={previewImg}
              alt='previewImg'
              className='w-[300px] h-[200px]'
            />
          )}
        </div>

        <div className='col-span-3'>
          <div className='h-[2px] bg-[#dfdfdf] w-full my-[20px]'></div>
        </div>
        <div className='col-span-1 flex flex-col gap-[10px]'>
          <div className='flex gap-[20px] justify-between items-center'>
            <div className='text-[24px] text-[#3e3e3e]'>Publish</div>
            <label className='switch'>
              <input
                type='checkbox'
                name='is_active'
                checked={payload.is_active === 1 ? true : false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPayload({...payload, is_active: e.target.checked ? 1 : 0})
                }
              />
              <span className='slider round'></span>
            </label>
          </div>
          <p className='text-justify text-[12px] text-[#B5B5B5]'>
            If publish is off will be saved as draft
          </p>
          <div className='flex gap-[20px] mt-[30px]'>
            <button
              className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf]'
              onClick={() => router.push(`/dashboard/variant/${id}`)}
            >
              Cancel
            </button>
            <button
              className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf] bg-[#dfdfdf]'
              onClick={async () => {
                handleSubmitVariant(type, payload, id);
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <ModalForm
          title={'NEW SPEC CATEGORY'}
          content={'spec'}
          data={{}}
          setData={() => {}}
          is_competitor={false}
        />
      )}
    </>
  );
}
