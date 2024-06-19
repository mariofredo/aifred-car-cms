'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import {CategoryLvlOne, CategoryLvlTwo} from '@/types/category';
import {SelectedSpec} from '@/types/spec';
import {Tag} from '@/types/tag';
import Cookies from 'js-cookie';
interface ContextProps {
  categoryOne: CategoryLvlOne[];
  setCategoryOne: Dispatch<SetStateAction<CategoryLvlOne[]>>;
  getListCategoryOne: (company_brand_id: string) => void;
  categoryTwo: CategoryLvlTwo[];
  setCategoryTwo: Dispatch<SetStateAction<CategoryLvlTwo[]>>;
  getListCategoryTwo: (access_token: string) => void;
  createCategoryOne: (payload: {
    company_brand_id: string;
    name: string;
    status: number;
  }) => Promise<{code: number}>;
  createCategoryTwo: (payload: {
    category_level_1_id: string;
    name: string;
    price: string;
    status: number;
    image: File | null;
    specs: SelectedSpec[];
    tags: Tag[];
    category_level_1_product_id: string | null;
  }) => Promise<{code: number}>;
  updateCategoryTwo: (payload: {
    category_level_1_id: string;
    category_level_2_id: string;
    name: string;
    price: string;
    status: number;
    image: File | null;
    specs: SelectedSpec[];
    tags: Tag[];
    category_level_1_product_id: string | null;
  }) => Promise<{code: number}>;
  getDetailCategoryTwo: (payload: {
    productId: string;
  }) => Promise<{[key: string]: any}>;
}

const defaultValue: ContextProps = {
  categoryOne: [],
  setCategoryOne: () => {},
  getListCategoryOne: (company_brand_id) => {},
  categoryTwo: [],
  setCategoryTwo: () => {},
  getListCategoryTwo: () => {},
  createCategoryOne: async (payload) => ({code: 200}),
  createCategoryTwo: async (payload) => ({code: 200}),
  updateCategoryTwo: async (payload) => ({code: 200}),
  getDetailCategoryTwo: async (payload) => ({code: 200}),
};

const CategoryContext = createContext<ContextProps>(defaultValue);

export function CategoryContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = Cookies.get('token');
  const [categoryOne, setCategoryOne] = useState<CategoryLvlOne[]>([]);
  const [categoryTwo, setCategoryTwo] = useState<CategoryLvlTwo[]>([]);
  const getListCategoryOne = async (company_brand_id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category-level-1`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company_brand_id,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setCategoryOne(data.data);
    }
  };
  const getListCategoryTwo = async (access_token: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category-level-2`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setCategoryTwo(data.data);
    }
  };
  const createCategoryOne = async (payload: {
    name: string;
    company_brand_id: string;
    status: number;
  }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category-level-1/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  };
  const createCategoryTwo = async (payload: {
    category_level_1_id: string;
    name: string;
    price: string;
    status: number;
    image: File | null;
    tags: Tag[];
    specs: SelectedSpec[];
    category_level_1_product_id: string | null;
  }) => {
    const formData = new FormData();
    formData.append('category_level_1_id', payload.category_level_1_id);
    formData.append('name', payload.name);
    formData.append('price', payload.price);
    payload.tags.forEach((el, i) => formData.append(`tags[${i}]`, el.text));
    formData.append('specs', JSON.stringify(payload.specs));
    if (payload.status) formData.append('status', payload.status.toString());
    if (payload.image) formData.append('image', payload.image);
    if (payload.category_level_1_product_id)
      formData.append(
        'category_level_1_product_id',
        payload.category_level_1_product_id
      );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category-level-2/create`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return {code: 200};
  };
  const updateCategoryTwo = async (payload: {
    category_level_1_id: string;
    category_level_2_id: string;
    name: string;
    price: string;
    status: number;
    image: File | null;
    tags: Tag[];
    specs: SelectedSpec[];
    category_level_1_product_id: string | null;
  }) => {
    const formData = new FormData();
    formData.append('category_level_1_id', payload.category_level_1_id);
    formData.append('category_level_2_id', payload.category_level_2_id);
    formData.append('name', payload.name);
    formData.append('price', payload.price);
    payload.tags.forEach((el, i) => formData.append(`tags[${i}]`, el.text));
    formData.append('specs', JSON.stringify(payload.specs));
    if (payload.status) formData.append('status', payload.status.toString());
    if (payload.image) formData.append('image', payload.image);
    if (payload.category_level_1_product_id)
      formData.append(
        'category_level_1_product_id',
        payload.category_level_1_product_id
      );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category-level-2/update`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return {code: 200};
  };
  const getDetailCategoryTwo = async (payload: {productId: string}) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category-level-2/details`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({object_id: parseInt(payload.productId)}),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  };
  const ctx = {
    categoryOne,
    setCategoryOne,
    getListCategoryOne,
    categoryTwo,
    setCategoryTwo,
    getListCategoryTwo,
    createCategoryOne,
    createCategoryTwo,
    updateCategoryTwo,
    getDetailCategoryTwo,
  };
  return (
    <CategoryContext.Provider value={ctx}>{children}</CategoryContext.Provider>
  );
}

export const useCategory = () => useContext(CategoryContext);
