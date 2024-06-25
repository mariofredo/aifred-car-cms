'use client';
import {CirclePlus} from '@/public';
import Image, {StaticImageData} from 'next/image';
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {SelectedSpec, Tag} from '@/types';
import {ModalForm, TagInput} from '@/components';
import {useModal, useSpec} from '@/context';
import {useParams} from 'next/navigation';
import {useComparison} from '@/context/comparisonContext';
import {useRouter} from 'next/navigation';
interface Payload {
  product_name: string;
  variant_name: string;
  price: number;
  spec: SelectedSpec[];
  image: File | null;
  is_active: number;
}
export default function ComparisonForm({type}: {type: string}) {
  const {id, comparisonId}: {id: string; comparisonId: string} = useParams();
  const router = useRouter();
  const {getDetailComparison, createComparison, updateComparison} =
    useComparison();
  const {showModal, setShowModal} = useModal();
  const [payload, setPayload] = useState<Payload>({
    product_name: '',
    variant_name: '',
    price: 0,
    spec: [],
    image: null,
    is_active: 0,
  });
  const [previewImg, setPreviewImg] = useState<string>('');
  const {
    tagSuggestion,
    selectedSpecs,
    setSelectedSpecs,
    getListSpec,
    specs,
    setSpecs,
    fetchSpecs,
    setFetchSpecs,
    getListTag,
  } = useSpec();
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
  const handleSubmitComparison = useCallback(
    async (type: string, payload: Payload, id: string) => {
      try {
        switch (type) {
          case 'edit':
            const resUpdate = await updateComparison(id, {
              id: comparisonId,
              ...payload,
              spec: selectedSpecs,
            });
            if (resUpdate.code === 200)
              router.push(`/dashboard/comparison/${id}`);
            return;

          default:
            const resCreate = await createComparison(id, {
              ...payload,
              spec: selectedSpecs,
            });
            if (resCreate.code === 200)
              router.push(`/dashboard/comparison/${id}`);
            return;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [payload, id, comparisonId, selectedSpecs, specs, type]
  );
  const callDetailVariant = useCallback(
    async (id: string, comparisonId: string) => {
      try {
        const data = await getDetailComparison(id, comparisonId);
        setPayload((prev) => ({
          ...prev,
          product_name: data.product_competitor.brand,
          variant_name: data.product_competitor.name,
          price: data.product_competitor.price || 0,
          is_active: data.product_competitor.is_active,
        }));
        setSpecs((prev) => {
          let updatedData = [...prev];
          updatedData.map((obj) => {
            if (data.specs) {
              let found = data.specs.find(
                (el: {[key: string]: any}) => obj.id === el.spec_id
              );
              if (found) obj.checked = true;
              return obj;
            }
          });
          // console.log(specs, 'specs');
          setSelectedSpecs((prev) => {
            return data.specs.map((el: {[key: string]: any}) => {
              // const found = specs.find((key: any) => key.id === el.spec_id);
              // console.log(found, 'found');
              // if (found) {
              //   return {
              //     id: el.spec_id,
              //     checked: true,
              //     name: found.name,
              //     value: el.value,
              //   };
              // }
              return {
                id: el.spec_id,
                checked: true,
                name: el.name,
                value: el.content,
              };
            });
          });
          return updatedData;
        });
        setPreviewImg(data.product_competitor.image);
        setFetchSpecs(true);
      } catch (error) {
        console.log(error);
      }
    },
    [specs]
  );
  useEffect(() => {
    setFetchSpecs(false);
    getListSpec();
    getListTag();
  }, []);
  useEffect(() => {
    if (comparisonId && specs.length > 0 && !fetchSpecs)
      callDetailVariant(id, comparisonId);
  }, [specs]);
  return (
    <>
      <div className='grid grid-cols-3 gap-[30px]'>
        <div className='col-span-3'>
          <div className='text-[24px] text-[#3e3e3e] font-medium'>
            Product Essentials
          </div>
          <div className='text-[12px] text-[#b5b5b5]'>
            (<span className='text-[#F31D1E]'>*</span>) are mandatory
          </div>
        </div>
        <div className='col-span-1 flex flex-col justify-center'>
          <div className='text-[15px] font-medium'>
            PRODUCT NAME<span className='text-[#F31D1E]'>*</span>
          </div>
          <div className='text-[12px] text-[#b5b5b5]'>
            Nama produk max. 20 karakter
          </div>
        </div>
        <div className='col-span-2 flex gap-[20px] '>
          <input
            name='product_name'
            className='h-full  rounded-[10px] border-[1.5px] border-[#b5b5b5] w-full px-[15px] py-[10px] text-[24px] text-[#3e3e3e] font-semibold'
            onChange={handleChange}
            value={payload.product_name}
          />
        </div>
        <div className='col-span-1 flex flex-col justify-center'>
          <div className='text-[15px] font-medium'>
            PRODUCT VARIANT NAME<span className='text-[#F31D1E]'>*</span>
          </div>
          <div className='text-[12px] text-[#b5b5b5]'>
            Nama produk variant max. 20 karakter
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
              onClick={() => router.push(`/dashboard/comparison/${id}`)}
            >
              Cancel
            </button>
            <button
              className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf] bg-[#dfdfdf]'
              onClick={async () => {
                handleSubmitComparison(type, payload, id);
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
