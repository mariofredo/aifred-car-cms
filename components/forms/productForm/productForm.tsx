'use client';
import {CirclePlus} from '@/public';
import Image from 'next/image';
import {useCallback, useEffect, useState} from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import {IoSearch} from 'react-icons/io5';
import {Table, ModalForm} from '@/components';
import {useModal} from '@/context/ModalContext';
import {useCategory} from '@/context/CategoryContext';
import {useBrand} from '@/context/BrandContext';
import {useRouter, useSearchParams} from 'next/navigation';
import {useSpec} from '@/context/SpecContext';
import {Tag, SelectedSpec} from '@/types';
import Cookie from 'js-cookie';
import '@/styles/productForm.scss';
interface ProductFormProps {
  type: string;
  params: {[key: string]: any};
}

interface Payload {
  company_brand_id: string;
  category_level_1_id: string;
  name: string;
  price: string;
  status: number;
  image: File | null;
}
export default function ProductForm(
  {type, params}: ProductFormProps = {type: '', params: {}}
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category_level_1_product_id = searchParams.get(
    'category_level_1_product_id'
  );
  const token = Cookie.get('token')?.toString();
  const {showModal, setShowModal} = useModal();
  const {productId} = params;

  const {
    categoryOne,
    getListCategoryOne,
    createCategoryTwo,
    updateCategoryTwo,
    getDetailCategoryTwo,
  } = useCategory();
  const {brands, getListBrand} = useBrand();
  const {
    selectedSpecs,
    setSelectedSpecs,
    getListSpec,
    specs,
    setSpecs,
    fetchSpecs,
    setFetchSpecs,
  } = useSpec();
  const [modalProps, setModalProps] = useState({
    title: '',
    content: '',
  });
  const [payload, setPayload] = useState<Payload>({
    company_brand_id: '',
    category_level_1_id: '',
    name: '',
    price: '',
    status: 0,
    image: null,
  });
  const [previewImg, setPreviewImg] = useState<string>('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const [comparison, setComparison] = useState([]);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;

    // // Remove non-digit characters from the input value
    // const numericValue = value.replace(/\D/g, '');

    // // Format the numeric value
    // const formatted = numericValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    setPayload({...payload, price: value});
  };

  const getListTag = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/answer-tag`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      const result = await data.data.map((el: {tag: string}) => ({
        id: el.tag,
        text: el.tag,
      }));
      setSuggestions(result);
    }
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

  const handleGetDetail = async () => {
    // const data = await getDetailCategoryTwo({productId});
    // setPayload({
    //   ...payload,
    //   company_brand_id: data.company_brand_id,
    //   category_level_1_id: data.category_level_1_id,
    //   name: data.name,
    //   price: data.price.split('.').join(''),
    //   status: data.status,
    //   image: null,
    // });
    // setTags(data.tags.map((el: string) => ({id: el, text: el})));
    // setSpecs((prev) => {
    //   let updatedData = [...prev];
    //   updatedData.map((obj) => {
    //     if (data.specs) {
    //       let found = data.specs.find(
    //         (el: {[key: string]: any}) => obj.id === el.id
    //       );
    //       if (found) obj.checked = true;
    //       return obj;
    //     }
    //   });
    //   setSelectedSpecs((prev) => {
    //     return data.specs.map((el: SelectedSpec) => {
    //       const found = specs.find((key) => key.id === el.id);
    //       if (found) {
    //         return {
    //           id: el.id,
    //           checked: true,
    //           name: found.name,
    //           value: el.value,
    //         };
    //       }
    //       return {
    //         id: el.id,
    //         checked: true,
    //         name: '',
    //         value: el.value,
    //       };
    //     });
    //   });
    //   return updatedData;
    // });
    // setPreviewImg(data.image);
    // setComparison(data.comparison);
    // setFetchSpecs(true);
  };
  useEffect(() => {
    // setFetchSpecs(false);
    // getListSpec();
    // getListTag();
    // getListBrand(type === 'addProduct' || type === 'detailProduct' ? 0 : 1);
  }, []);

  useEffect(() => {
    // if (
    //   (type === 'detailProduct' || type === 'detailComparison') &&
    //   specs.length > 0 &&
    //   !fetchSpecs
    // ) {
    //   handleGetDetail();
    // }
  }, [specs]);

  useEffect(() => {
    // if (payload.company_brand_id) getListCategoryOne(payload.company_brand_id);
  }, [payload.company_brand_id]);

  return (
    <>
      <div className='grid grid-cols-3 gap-[30px]'>
        <div className='col-span-3'>
          <div className='text-[24px] text-[#3e3e3e]'>Product Essentials</div>
          <div className='text-[12px] text-[#b5b5b5]'>
            (<span className='text-[#F31D1E]'>*</span>) are mandatory
          </div>
        </div>
        <div className='col-span-1 flex flex-col justify-center'>
          <div className='text-[15px]'>
            BRAND NAME<span className='text-[#F31D1E]'>*</span>
          </div>
          <div className='text-[12px] text-[#b5b5b5]'>
            Nama brand max. 15 karakter
          </div>
        </div>
        <div className='col-span-2 flex gap-[20px] '>
          <select
            name='brand'
            className='h-full  rounded-[10px] border-[1.5px] border-[#b5b5b5] w-[80%] px-[15px] py-[10px] text-[24px] text-[#3e3e3e] font-semibold'
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPayload({...payload, company_brand_id: e.target.value})
            }
            value={payload.company_brand_id}
          >
            <option value='' disabled>
              Select the brand
            </option>
            {brands.map((brand) => (
              <option key={`${brand.id}_${brand.name}`} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          <button
            className='flex justify-center items-center py-[10px] px-[21px] rounded-[12px] bg-[#dfdfdf] text-[16px] w-[30%] gap-[15px] whitespace-nowrap'
            onClick={() => {
              setModalProps({title: 'NEW BRAND', content: 'brand'});
              setShowModal(true);
            }}
          >
            <Image
              src={CirclePlus}
              alt='circle_plus'
              className='w-[15px] h-[15px]'
            />{' '}
            New Brand
          </button>
        </div>
        <div className='col-span-1 flex flex-col justify-center'>
          <div className='text-[15px]'>
            SERIES NAME<span className='text-[#F31D1E]'>*</span>
          </div>
          <div className='text-[12px] text-[#b5b5b5]'>
            Nama series max. 20 karakter
          </div>
        </div>
        <div className='col-span-2 flex gap-[20px] '>
          <input
            name='series'
            className='h-full w-full rounded-[10px] border-[1.5px] border-[#b5b5b5] px-[15px] py-[10px] text-[24px] text-[#3e3e3e] font-semibold'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPayload({...payload, category_level_1_id: e.target.value})
            }
            value={payload.category_level_1_id}
            // disabled={!payload.company_brand_id}
          />
        </div>

        {type === 'detailProduct' && (
          <>
            <div className='col-span-3'>
              <div className='h-[2px] bg-[#dfdfdf] w-full my-[20px]'></div>
            </div>
            <div className='col-span-3'>
              <div className='text-[24px] text-[#3e3e3e]'>Variant</div>
              <div className='text-[12px] text-[#b5b5b5]'>
                (<span className='text-[#F31D1E]'>*</span>) are mandatory
              </div>
            </div>
            <div className='col-span-3 flex gap-[20px] '>
              <button
                className='flex justify-center items-center py-[10px] px-[21px] rounded-[12px] bg-[#dfdfdf] text-[16px] w-[30%] gap-[15px] whitespace-nowrap'
                onClick={() =>
                  router.push(
                    `/dashboard/product/${productId}/addComparison?category_level_1_product_id=${payload.category_level_1_id}`
                  )
                }
              >
                <Image
                  src={CirclePlus}
                  alt='circle_plus'
                  className='w-[15px] h-[15px]'
                />
                New Variant
              </button>
              <div className='relative w-[80%]'>
                <input
                  name='brand'
                  type='text'
                  className='h-full w-full  rounded-[10px] border-[1.5px] border-[#b5b5b5] pl-[15px] pr-[40px] py-[10px] text-[24px] text-[#3e3e3e] font-semibold'
                  placeholder='Search name or sub-series'
                />
                <IoSearch
                  color='#b5b5b5'
                  className='w-[20px] h-[20px] absolute top-[50%] right-[15px] transform translate-y-[-50%]'
                />
              </div>
            </div>
            <div className='col-span-3 overflow-scroll'>
              <Table
                listTitle={[
                  'Brand',
                  'Name',
                  'Sub-series name',
                  'Status',
                  // 'Created by and date',
                  'Image',
                ]}
                listKey={[
                  'company_brand_name',
                  'category_level_1_name',
                  'category_level_2_name',
                  'status',
                  'image',
                ]}
                data={comparison}
                type={'comparison'}
                productId={productId}
              />
            </div>
          </>
        )}
        {type === 'detailProduct' && (
          <>
            <div className='col-span-3'>
              <div className='h-[2px] bg-[#dfdfdf] w-full my-[20px]'></div>
            </div>
            <div className='col-span-3'>
              <div className='text-[24px] text-[#3e3e3e]'>Compare with</div>
              <div className='text-[12px] text-[#b5b5b5]'>
                (<span className='text-[#F31D1E]'>*</span>) are mandatory
              </div>
            </div>
            <div className='col-span-3 flex gap-[20px] '>
              <button
                className='flex justify-center items-center py-[10px] px-[21px] rounded-[12px] bg-[#dfdfdf] text-[16px] w-[30%] gap-[15px] whitespace-nowrap'
                onClick={() =>
                  router.push(
                    `/dashboard/product/${productId}/addComparison?category_level_1_product_id=${payload.category_level_1_id}`
                  )
                }
              >
                <Image
                  src={CirclePlus}
                  alt='circle_plus'
                  className='w-[15px] h-[15px]'
                />{' '}
                Create New
              </button>
              <div className='relative w-[80%]'>
                <input
                  name='brand'
                  type='text'
                  className='h-full w-full  rounded-[10px] border-[1.5px] border-[#b5b5b5] pl-[15px] pr-[40px] py-[10px] text-[24px] text-[#3e3e3e] font-semibold'
                  placeholder='Search name or sub-series'
                />
                <IoSearch
                  color='#b5b5b5'
                  className='w-[20px] h-[20px] absolute top-[50%] right-[15px] transform translate-y-[-50%]'
                />
              </div>
            </div>
            <div className='col-span-3 overflow-scroll'>
              <Table
                listTitle={[
                  'Brand',
                  'Name',
                  'Sub-series name',
                  'Status',
                  // 'Created by and date',
                  'Image',
                ]}
                listKey={[
                  'company_brand_name',
                  'category_level_1_name',
                  'category_level_2_name',
                  'status',
                  'image',
                ]}
                data={comparison}
                type={'comparison'}
                productId={productId}
              />
            </div>
          </>
        )}

        <div className='col-span-3'>
          <div className='h-[2px] bg-[#dfdfdf] w-full my-[20px]'></div>
        </div>
        <div className='col-span-1 flex flex-col gap-[10px]'>
          <div className='flex gap-[20px] justify-between items-center'>
            <div className='text-[24px] text-[#3e3e3e]'>Publish</div>
            <label className='switch'>
              <input
                type='checkbox'
                checked={payload.status === 1 ? true : false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPayload({...payload, status: e.target.checked ? 1 : 0})
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
              onClick={() => router.push('/dashboard/product')}
            >
              Cancel
            </button>
            <button
              className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf] bg-[#dfdfdf]'
              onClick={async () => {
                if (type === 'detailProduct' || type === 'detailComparison') {
                  const data = await updateCategoryTwo({
                    category_level_1_id: payload.category_level_1_id,
                    category_level_2_id: productId,
                    name: payload.name,
                    price: payload.price,
                    status: payload.status,
                    image: payload.image,
                    specs: selectedSpecs,
                    tags: tags,
                    category_level_1_product_id: category_level_1_product_id,
                  });
                  if (data.code === 200) router.push('/dashboard/product');
                } else {
                  const data = await createCategoryTwo({
                    category_level_1_id: payload.category_level_1_id,
                    name: payload.name,
                    price: payload.price,
                    status: payload.status,
                    image: payload.image,
                    specs: selectedSpecs,
                    tags: tags,
                    category_level_1_product_id: category_level_1_product_id,
                  });
                  if (data.code === 200) router.push('/dashboard/product');
                }
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <ModalForm
          title={modalProps.title}
          content={modalProps.content}
          data={payload}
          setData={setPayload}
          is_competitor={
            type === 'addProduct' || type === 'detailProduct' ? false : true
          }
        />
      )}
    </>
  );
}
