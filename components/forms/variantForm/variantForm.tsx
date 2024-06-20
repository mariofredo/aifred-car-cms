'use client';
import {CirclePlus} from '@/public';
import Image from 'next/image';
import React, {useState} from 'react';
import {Tag} from '@/types';
import {ModalForm, TagInput} from '@/components';
import {useModal} from '@/context';
export default function VariantForm() {
  const {showModal, setShowModal} = useModal();
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
            name='brand'
            className='h-full  rounded-[10px] border-[1.5px] border-[#b5b5b5] w-full px-[15px] py-[10px] text-[24px] text-[#3e3e3e] font-semibold'
            // onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            //   setPayload({...payload, company_brand_id: e.target.value})
            // }
            // value={payload.company_brand_id}
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
            // onChange={handleChange}
            // value={payload.price}
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
          {/* {selectedSpecs.map((el, idx) => ( */}
          <div
            // key={idx}
            className='w-full flex gap-[20px]'
          >
            <div className='h-full w-[25%] rounded-[10px] border-[1.5px] border-[#b5b5b5] px-[15px] py-[10px] text-[24px] text-[#3e3e3e] font-semibold'>
              {/* {el.name} */}
              Type
            </div>
            <input
              type='text'
              // name={`spec_${el.id}`}
              // value={selectedSpecs[idx].value}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              //   handleSelectedSpecChange(e, idx)
              // }
              className='h-full w-[75%] px-[15px] py-[10px] rounded-[10px] border-[1.5px] border-[#b5b5b5] text-[24px] text-[#3e3e3e] font-semibold'
            />
          </div>
          {/* ))} */}
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
                // onClick={() => {
                //   setPreviewImg('');
                //   setPayload({...payload, image: null});
                // }}
              >
                Remove
              </button>
              <div className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf] bg-[#dfdfdf] relative text-center'>
                <input
                  type='file'
                  className='opacity-0 absolute top-0 left-0 w-full h-full'
                  accept='image/*'
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  //   if (e.target.files && e.target.files.length > 0) {
                  //     setPayload({...payload, image: e.target.files[0]});
                  //     const imageUrl = URL.createObjectURL(e.target.files[0]);
                  //     setPreviewImg(imageUrl);
                  //   }
                  // }}
                />
                Upload
              </div>
            </div>
          </div>
          {/* {previewImg && (
            <img
              src={previewImg}
              alt='previewImg'
              className='w-[300px] h-[200px]'
            />
          )} */}
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
                // checked={payload.status === 1 ? true : false}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                //   setPayload({...payload, status: e.target.checked ? 1 : 0})
                // }
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
              // onClick={() => router.push('/dashboard/product')}
            >
              Cancel
            </button>
            <button
              className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf] bg-[#dfdfdf]'
              // onClick={async () => {
              //   if (type === 'detailProduct' || type === 'detailComparison') {
              //     const data = await updateCategoryTwo({
              //       category_level_1_id: payload.category_level_1_id,
              //       category_level_2_id: productId,
              //       name: payload.name,
              //       price: payload.price,
              //       status: payload.status,
              //       image: payload.image,
              //       specs: selectedSpecs,
              //       tags: tags,
              //       category_level_1_product_id: category_level_1_product_id,
              //     });
              //     if (data.code === 200) router.push('/dashboard/product');
              //   } else {
              //     const data = await createCategoryTwo({
              //       category_level_1_id: payload.category_level_1_id,
              //       name: payload.name,
              //       price: payload.price,
              //       status: payload.status,
              //       image: payload.image,
              //       specs: selectedSpecs,
              //       tags: tags,
              //       category_level_1_product_id: category_level_1_product_id,
              //     });
              //     if (data.code === 200) router.push('/dashboard/product');
              //   }
              // }}
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
