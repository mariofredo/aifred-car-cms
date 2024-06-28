'use client';
import {
  CirclePlus,
  NoImage,
  PencilIcon,
  ReturnIcon,
  SliderIcon,
  TrashIcon,
} from '@/public';
import Image from 'next/image';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {IoSearch} from 'react-icons/io5';
import {Table, ModalForm, Button, FilterModal} from '@/components';
import {
  useModal,
  useBrand,
  useProduct,
  useSpec,
  useVariant,
  useComparison,
} from '@/context';
import {useParams, useRouter} from 'next/navigation';
import {Tag, Brand, Variant, Comparison} from '@/types';
import Cookie from 'js-cookie';
import '@/styles/productForm.scss';
import Link from 'next/link';
import {formatDateUI} from '@/utils';
import {FILTER_PRODUCT_DETAIL} from '@/consts';
interface ProductFormProps {
  type: string;
  params: {[key: string]: any};
}

interface Payload {
  brand_unique_id: string;
  name: string;
  is_active: number;
}
interface PayloadVariant {
  keyword_variant: string;
  is_active_variant: number;
  order_by_name_variant: string;
  date_created_start_variant: string;
  date_created_end_variant: string;
}
interface PayloadComparison {
  keyword: string;
  order_by_brand: string;
  order_by_series: string;
  date_created_start: string;
  date_created_end: string;
  is_active: number;
}
export default function ProductForm(
  {type, params}: ProductFormProps = {type: '', params: {}}
) {
  const router = useRouter();
  const {id}: {id: string} = useParams();
  const {showModal, setShowModal, filterModal, setFilterModal} = useModal();
  const {createProduct, getDetailProduct, updateProduct} = useProduct();
  const {getListVariant, deleteVariant} = useVariant();
  const {getListComparison, deleteComparison} = useComparison();
  const {getListBrand} = useBrand();
  const {
    selectedSpecs,
    setSelectedSpecs,
    getListSpec,
    specs,
    setSpecs,
    fetchSpecs,
    setFetchSpecs,
  } = useSpec();
  const [brand, setBrand] = useState<Brand[]>([]);
  const [modalProps, setModalProps] = useState({
    title: '',
    content: '',
  });
  const [payload, setPayload] = useState<Payload>({
    brand_unique_id: '',
    name: '',
    is_active: 0,
  });
  const [filterType, setFilterType] = useState<string>('');
  const [variant, setVariant] = useState<Variant[]>([]);
  const [comparison, setComparison] = useState<Comparison[]>([]);
  const [payloadVariant, setPayloadVariant] = useState<PayloadVariant>({
    keyword_variant: '',
    order_by_name_variant: '',
    is_active_variant: 1,
    date_created_start_variant: '',
    date_created_end_variant: '',
  });
  const [payloadComparison, setPayloadComparison] = useState<PayloadComparison>(
    {
      keyword: '',
      order_by_brand: '',
      order_by_series: '',
      date_created_start: '',
      date_created_end: '',
      is_active: 1,
    }
  );
  const [paginationVariant, setPaginationVariant] = useState({
    limit: 10,
    currentPage: 1,
    totalCount: 0,
  });
  const [paginationComparison, setPaginationComparison] = useState({
    limit: 10,
    currentPage: 1,
    totalCount: 0,
  });

  const callListBrand = useCallback(async () => {
    const {data} = await getListBrand();
    setBrand(data);
  }, []);
  const handleSubmitProduct = useCallback(
    async (type: string, payload: Payload, id: string) => {
      try {
        switch (type) {
          case 'edit':
            const resUpdate = await updateProduct({
              id,
              ...payload,
            });
            if (resUpdate.code === 200) router.push('/dashboard/product');
            return;

          default:
            const resCreate = await createProduct(payload);
            if (resCreate.code === 200) router.push('/dashboard/product');
            return;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [payload, id]
  );

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const {value} = event.target;

  //   // // Remove non-digit characters from the input value
  //   // const numericValue = value.replace(/\D/g, '');

  //   // // Format the numeric value
  //   // const formatted = numericValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  //   setPayload({...payload, price: value});
  // };

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
  const handleRenderFilter = useMemo(
    () =>
      filterModal && (
        <FilterModal
          list={
            filterType === 'variant'
              ? FILTER_PRODUCT_DETAIL.variant
              : FILTER_PRODUCT_DETAIL.competitor
          }
          setFilterModal={setFilterModal}
          onReset={() => {
            filterType === 'variant'
              ? () => {
                  setPayloadVariant({
                    keyword_variant: '',
                    order_by_name_variant: '',
                    is_active_variant: 1,
                    date_created_start_variant: '',
                    date_created_end_variant: '',
                  });
                  callListVariant(id, {
                    page: paginationVariant.currentPage,
                    limit: paginationVariant.limit,
                    keyword_variant: '',
                    order_by_name_variant: '',
                    is_active_variant: 1,
                    date_created_start_variant: '',
                    date_created_end_variant: '',
                  });
                }
              : () => {
                  setPayloadComparison({
                    keyword: '',
                    order_by_brand: '',
                    order_by_series: '',
                    date_created_start: '',
                    date_created_end: '',
                    is_active: 1,
                  });
                  callListComparison(id, {
                    page: paginationComparison.currentPage,
                    limit: paginationComparison.limit,
                    keyword: '',
                    order_by_brand: '',
                    order_by_series: '',
                    date_created_start: '',
                    date_created_end: '',
                    is_active: 1,
                  });
                };
          }}
          payload={
            filterType === 'variant' ? payloadVariant : payloadComparison
          }
          setPayload={
            filterType === 'variant' ? setPayloadVariant : setPayloadComparison
          }
          action={() => {
            setFilterModal(false);
            filterType === 'variant'
              ? callListVariant(id, {
                  page: paginationVariant.currentPage,
                  limit: paginationVariant.limit,
                  ...payloadVariant,
                })
              : callListComparison(id, {
                  page: paginationComparison.currentPage,
                  limit: paginationComparison.limit,
                  ...payloadComparison,
                });
          }}
        />
      ),
    [
      payloadComparison,
      payloadVariant,
      paginationComparison,
      paginationVariant,
      filterModal,
      filterType,
      id,
    ]
  );
  const callDetailProduct = async (id: string) => {
    const {product, competitors, variants} = await getDetailProduct(id);
    setPayload((prev) => ({
      ...prev,
      name: product.name,
      brand_unique_id: product.brand_unique_id,
      is_active: product.is_active,
    }));
    // setVariant(variants);
    // setComparison(competitors);
  };
  const callListVariant = useCallback(
    async (id: string, payload: any) => {
      const {data, total_data} = await getListVariant(id, payload);
      setVariant(data);
      setPaginationVariant((prev) => ({
        ...prev,
        totalCount: total_data,
      }));
    },
    [variant, paginationVariant, payloadVariant]
  );
  const callDeleteVariant = useCallback(
    async (productId: string, variantId: string) => {
      const {code} = await deleteVariant(productId, variantId);
      if (code === 200)
        callListVariant(id, {
          page: paginationVariant.currentPage,
          limit: paginationVariant.limit,
          ...payloadComparison,
        });
    },
    [payloadComparison, id, paginationVariant]
  );
  const callListComparison = useCallback(
    async (id: string, payload: any) => {
      const {data, total_data} = await getListComparison(id, payload);
      setComparison(data);
      setPaginationComparison((prev) => ({
        ...prev,
        totalCount: total_data,
      }));
    },
    [comparison, paginationComparison, payloadComparison]
  );
  const callDeleteComparison = useCallback(
    async (productId: string, comparisonId: string) => {
      const {code} = await deleteComparison(productId, comparisonId);
      if (code === 200)
        callListComparison(productId, {
          page: paginationComparison.currentPage,
          limit: paginationComparison.limit,
          ...payloadComparison,
        });
    },
    [payloadComparison, id, paginationComparison]
  );
  useEffect(() => {
    callListBrand();
  }, []);
  useEffect(() => {
    if (id) {
      callDetailProduct(id);
    }
  }, [brand]);
  useEffect(() => {
    if (id) {
      callListVariant(id, {
        page: paginationVariant.currentPage,
        limit: paginationVariant.limit,
        ...payloadVariant,
      });
    }
  }, [paginationVariant.currentPage]);
  useEffect(() => {
    if (id) {
      callListComparison(id, {
        page: paginationComparison.currentPage,
        limit: paginationComparison.limit,
        ...payloadComparison,
      });
    }
  }, [paginationComparison.currentPage]);
  return (
    <>
      <div className='grid grid-cols-3 gap-[30px]'>
        {handleRenderFilter}
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
              setPayload({...payload, brand_unique_id: e.target.value})
            }
            value={payload.brand_unique_id}
          >
            <option value='' disabled>
              Select the brand
            </option>
            {brand.map((brand) => (
              <option
                key={`${brand.unique_id}_${brand.name}`}
                value={brand.unique_id}
              >
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
              setPayload({...payload, name: e.target.value})
            }
            value={payload.name}
            // disabled={!payload.company_brand_id}
          />
        </div>

        {type === 'edit' && (
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
                onClick={() => router.push(`/dashboard/variant/${id}/create`)}
              >
                <Image
                  src={CirclePlus}
                  alt='circle_plus'
                  className='w-[15px] h-[15px]'
                />
                New Variant
              </button>
              <form
                className='relative w-[80%]'
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  callListVariant(id, {
                    page: paginationVariant.currentPage,
                    limit: paginationVariant.limit,
                    ...payloadVariant,
                  });
                }}
              >
                <input
                  name='keyword_variant'
                  type='text'
                  className='h-full w-full  rounded-[10px] border-[1.5px] border-[#b5b5b5] pl-[15px] pr-[40px] py-[10px] text-[24px] text-[#3e3e3e] font-semibold'
                  placeholder='Search name or sub-series'
                  value={payloadVariant.keyword_variant}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPayloadVariant((prev) => ({
                      ...prev,
                      keyword_variant: e.target.value,
                    }))
                  }
                />
                <IoSearch
                  color='#b5b5b5'
                  className='w-[20px] h-[20px] absolute top-[50%] right-[15px] transform translate-y-[-50%]'
                />
              </form>
            </div>
            <div className='col-span-3 overflow-scroll'>
              <Table
                listTitle={[
                  'Name',
                  // 'Comparison',
                  'Status',
                  'Date created',
                  'Image',
                  <div className='flex justify-center'>
                    <Image
                      src={ReturnIcon}
                      className='w-[20px] h-[15px]'
                      alt='return_icon'
                    />
                  </div>,
                  <div className='flex justify-center'>
                    <Image
                      src={SliderIcon}
                      alt='slider_icon'
                      className='w-[20px] h-[20px] cursor-pointer'
                      onClick={() => {
                        setFilterModal((prev) => !prev);
                        setFilterType('variant');
                      }}
                    />
                  </div>,
                ]}
                listKey={[
                  'name',
                  'is_active',
                  'created_at',
                  'image',
                  'detail',
                  'delete',
                ]}
                data={variant.map((item) => ({
                  ...item,
                  image: (
                    <Image
                      src={item.image || NoImage}
                      width={150}
                      height={100}
                      alt={`gambar`}
                      className='rounded-md'
                    />
                  ),
                  is_active: (
                    <span
                      className={`table_status ${
                        item.is_active === 1 ? 'publish' : 'draft'
                      }`}
                    >
                      {item.is_active ? 'Publish' : 'Draft'}
                    </span>
                  ),
                  created_at: formatDateUI(item.created_at),
                  action: (
                    <div className='flex flex-col gap-[10px]'>
                      <Link
                        href={`/dashboard/variant/${item.object_id}`}
                        className='w-full'
                      >
                        <Button
                          borderRadius='5px'
                          bgColor='rgba(101, 57, 228, 0.58)'
                          color='#fff'
                          text='Variant List'
                          width='100%'
                          padding='3.5px'
                        />
                      </Link>
                      <Link href={`/dashboard/comparison/${item.object_id}`}>
                        <Button
                          borderRadius='5px'
                          bgColor='rgba(228, 57, 57, 0.58)'
                          color='#fff'
                          text='Comparison List'
                          width='100%'
                          padding='3.5px'
                        />
                      </Link>
                    </div>
                  ),
                  detail: (
                    <div className='flex justify-center'>
                      <Image
                        src={PencilIcon}
                        className='w-[20px] h-[20px]'
                        alt='return_icon'
                        onClick={() =>
                          router.push(
                            `/dashboard/variant/${id}/${item.object_id}`
                          )
                        }
                      />
                    </div>
                  ),
                  delete: (
                    <div className='flex justify-center'>
                      <Image
                        src={TrashIcon}
                        className='w-[20px] h-[20px]'
                        alt='trash_icon'
                        onClick={() => callDeleteVariant(id, item.object_id)}
                      />
                    </div>
                  ),
                }))}
                type={'product'}
                id={''}
              />
            </div>
          </>
        )}
        {type === 'edit' && (
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
              <Link
                className='flex justify-center items-center py-[10px] px-[21px] rounded-[12px] bg-[#dfdfdf] text-[16px] w-[30%] gap-[15px] whitespace-nowrap'
                href={`/dashboard/comparison/${id}/create`}
              >
                <Image
                  src={CirclePlus}
                  alt='circle_plus'
                  className='w-[15px] h-[15px]'
                />{' '}
                Create New
              </Link>
              <form
                className='relative w-[80%]'
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  callListComparison(id, {
                    page: paginationComparison.currentPage,
                    limit: paginationComparison.limit,
                    ...payloadComparison,
                  });
                }}
              >
                <input
                  name='keyword'
                  type='text'
                  className='h-full w-full  rounded-[10px] border-[1.5px] border-[#b5b5b5] pl-[15px] pr-[40px] py-[10px] text-[24px] text-[#3e3e3e] font-semibold'
                  placeholder='Search name or sub-series'
                  value={payloadComparison.keyword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPayloadComparison((prev) => ({
                      ...prev,
                      keyword: e.target.value,
                    }))
                  }
                />
                <IoSearch
                  color='#b5b5b5'
                  className='w-[20px] h-[20px] absolute top-[50%] right-[15px] transform translate-y-[-50%]'
                />
              </form>
            </div>
            <div className='col-span-3 overflow-scroll'>
              <Table
                listTitle={[
                  'Main Comparison',
                  'Brand',
                  'Name',
                  'Status',
                  'Date created',
                  'Image',
                  <div className='flex justify-center'>
                    <Image
                      src={ReturnIcon}
                      className='w-[20px] h-[15px]'
                      alt='return_icon'
                    />
                  </div>,
                  <div className='flex justify-center'>
                    <Image
                      src={SliderIcon}
                      alt='trash_icon'
                      className='w-[20px] h-[20px]'
                      onClick={() => {
                        setFilterModal((prev) => !prev);
                        setFilterType('comparison');
                      }}
                    />
                  </div>,
                ]}
                listKey={[
                  'brand',
                  'name',
                  'is_active',
                  'created_at',
                  'image',
                  'detail',
                  'delete',
                ]}
                data={comparison.map((item) => ({
                  ...item,
                  image: (
                    <Image
                      src={item.image || NoImage}
                      width={150}
                      height={100}
                      alt={`gambar`}
                      className='rounded-md'
                    />
                  ),
                  is_active: (
                    <span
                      className={`table_status ${
                        item.is_active === 1 ? 'publish' : 'draft'
                      }`}
                    >
                      {item.is_active ? 'Publish' : 'Draft'}
                    </span>
                  ),
                  created_at: formatDateUI(item.created_at),
                  action: (
                    <div className='flex flex-col gap-[10px]'>
                      <Link
                        href={`/dashboard/comparison/${item.object_id}`}
                        className='w-full'
                      >
                        <Button
                          borderRadius='5px'
                          bgColor='rgba(101, 57, 228, 0.58)'
                          color='#fff'
                          text='Variant List'
                          width='100%'
                          padding='3.5px'
                        />
                      </Link>
                      <Link href={`/dashboard/comparison/${item.object_id}`}>
                        <Button
                          borderRadius='5px'
                          bgColor='rgba(228, 57, 57, 0.58)'
                          color='#fff'
                          text='Comparison List'
                          width='100%'
                          padding='3.5px'
                        />
                      </Link>
                    </div>
                  ),
                  detail: (
                    <div className='flex justify-center'>
                      <Image
                        src={PencilIcon}
                        className='w-[20px] h-[20px]'
                        alt='return_icon'
                        onClick={() =>
                          router.push(
                            `/dashboard/comparison/${id}/edit/${item.object_id}`
                          )
                        }
                      />
                    </div>
                  ),
                  delete: (
                    <div className='flex justify-center'>
                      <Image
                        src={TrashIcon}
                        className='w-[20px] h-[20px]'
                        alt='trash_icon'
                        onClick={() => callDeleteComparison(id, item.object_id)}
                      />
                    </div>
                  ),
                }))}
                type={'product'}
                id={''}
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
              onClick={() => router.push('/dashboard/product')}
            >
              Cancel
            </button>
            <button
              className='w-[50%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf] bg-[#dfdfdf]'
              onClick={() => {
                handleSubmitProduct(type, payload, id);
                callListBrand();
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
          is_competitor={type === 'create' || type === 'edit' ? false : true}
          action={callListBrand}
        />
      )}
    </>
  );
}
