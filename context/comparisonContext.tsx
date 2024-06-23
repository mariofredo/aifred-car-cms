'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import Cookies from 'js-cookie';
import {SelectedSpec, Tag, Comparison} from '@/types';
import {API_ROUTES} from '@/consts';
interface ContextProps {
  getListComparison: (productId: string) => Promise<{
    [key: string]: any;
    data: Comparison[];
  }>;
  createComparison: (
    productId: string,
    payload: {
      variant_name: string;
      price: number;
      is_active: number;
      image: File | null;
      spec: SelectedSpec[];
      tag: Tag[];
    }
  ) => Promise<{[key: string]: any}>;
  updateComparison: (
    productId: string,
    payload: {
      id: string;
      variant_name: string;
      price: number;
      is_active: number;
      image: File | null;
      spec: SelectedSpec[];
      tag: Tag[];
    }
  ) => Promise<{[key: string]: any}>;
  getDetailComparison: (
    productId: string,
    variantId: string
  ) => Promise<{[key: string]: any}>;
  deleteComparison: (object_id: string) => Promise<{[key: string]: any}>;
}

const defaultValue: ContextProps = {
  getListComparison: async (productId) => ({data: []}),
  createComparison: async (productId, payload) => ({}),
  updateComparison: async (productId, payload) => ({}),
  getDetailComparison: async (productId, variantId) => ({}),
  deleteComparison: async (object_id) => ({}),
};

const ComparisonContext = createContext<ContextProps>(defaultValue);

export function ComparisonContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = Cookies.get('token');

  const getListComparison = async (productId: string) => {
    try {
      const response = await fetch(API_ROUTES.variant_list(productId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {}
  };
  const createComparison = async (
    productId: string,
    payload: {
      variant_name: string;
      price: number;
      is_active: number;
      image: File | null;
      spec: SelectedSpec[];
      tag: Tag[];
    }
  ) => {
    try {
      const {is_active, variant_name, price, image, spec, tag} = payload;
      const formData = new FormData();
      formData.append('variant_name', variant_name);
      formData.append('price', price.toString());
      formData.append('is_active', is_active.toString());
      spec.forEach((item, i) => {
        formData.append(`spec_id[${i}]`, item.id.toString());
        formData.append(`spec_content[${i}]`, item.value.toString());
      });
      tag.forEach((item, i) => {
        formData.append(`tags[${i}]`, item.id);
      });
      if (image) formData.append('image', image);
      else formData.append('image', '');
      // console.log(payload, 'payload');
      const response = await fetch(API_ROUTES.variant_create(productId), {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          // 'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {}
  };
  const updateComparison = async (
    productId: string,
    payload: {
      id: string;
      variant_name: string;
      price: number;
      is_active: number;
      image: File | null;
      spec: SelectedSpec[];
      tag: Tag[];
    }
  ) => {
    try {
      const {is_active, variant_name, price, image, spec, id, tag} = payload;
      const formData = new FormData();
      formData.append('id', id);
      formData.append('variant_name', variant_name);
      formData.append('price', price.toString());
      formData.append('is_active', is_active.toString());
      spec.forEach((item, i) => {
        formData.append(`spec_id[${i}]`, item.id.toString());
        formData.append(`spec_content[${i}]`, item.value.toString());
      });
      tag.forEach((item, i) => {
        formData.append(`tags[${i}]`, item.id);
      });
      if (image) formData.append('image', image);
      else formData.append('image', '');
      const response = await fetch(API_ROUTES.variant_update(productId), {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {}
  };
  const getDetailComparison = async (id: string, variantId: string) => {
    try {
      const response = await fetch(API_ROUTES.variant_detail(id, variantId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComparison = async (object_id: string) => {
    try {
      const response = await fetch(API_ROUTES.variant_delete('1'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: object_id,
        }),
      });
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {}
  };
  const ctx = {
    getListComparison,
    createComparison,
    getDetailComparison,
    updateComparison,
    deleteComparison,
  };
  return (
    <ComparisonContext.Provider value={ctx}>
      {children}
    </ComparisonContext.Provider>
  );
}

export const useComparison = () => useContext(ComparisonContext);
