'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import Cookies from 'js-cookie';
import {SelectedSpec, Variant} from '@/types';
import {API_ROUTES} from '@/consts';
interface ContextProps {
  getListVariant: (id: string) => Promise<{
    [key: string]: any;
    data: Variant[];
  }>;
  createVariant: (
    id: string,
    payload: {
      variant_name: string;
      price: number;
      is_active: number;
      image: File | null;
      spec: SelectedSpec[];
    }
  ) => Promise<{[key: string]: any}>;
  updateVariant: (
    id: string,
    payload: {
      id: string;
      brand_unique_id: string;
      name: string;
      is_active: number;
    }
  ) => Promise<{[key: string]: any}>;
  getDetailVariant: (
    id: string,
    variantId: string
  ) => Promise<{[key: string]: any}>;
  deleteVariant: (object_id: string) => Promise<{[key: string]: any}>;
}

const defaultValue: ContextProps = {
  getListVariant: async (id) => ({data: []}),
  createVariant: async (id, payload) => ({}),
  updateVariant: async (id, payload) => ({}),
  getDetailVariant: async (id, variantId) => ({}),
  deleteVariant: async (object_id) => ({}),
};

const VariantContext = createContext<ContextProps>(defaultValue);

export function VariantContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = Cookies.get('token');

  const getListVariant = async (id: string) => {
    try {
      const response = await fetch(API_ROUTES.variant_list(id), {
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
  const createVariant = async (
    id: string,
    payload: {
      variant_name: string;
      price: number;
      is_active: number;
      image: File | null;
      spec: SelectedSpec[];
    }
  ) => {
    try {
      const {is_active, variant_name, price, image, spec} = payload;
      const formData = new FormData();
      formData.append('variant_name', variant_name);
      formData.append('price', price.toString());
      formData.append('is_active', is_active.toString());
      spec.forEach((item, i) => {
        formData.append(`spec_id[${i}]`, item.id.toString());
        formData.append(`spec_content[${i}]`, item.value.toString());
      });
      formData.append('tags[0]', '1');
      if (image) formData.append('image', image);
      console.log(payload, 'payload');
      const response = await fetch(API_ROUTES.variant_create(id), {
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
  const updateVariant = async (
    id: string,
    payload: {
      id: string;
      brand_unique_id: string;
      name: string;
      is_active: number;
    }
  ) => {
    try {
      const response = await fetch(API_ROUTES.variant_update(id), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {}
  };
  const getDetailVariant = async (id: string, variantId: string) => {
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
  const deleteVariant = async (object_id: string) => {
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
    getListVariant,
    createVariant,
    getDetailVariant,
    updateVariant,
    deleteVariant,
  };
  return (
    <VariantContext.Provider value={ctx}>{children}</VariantContext.Provider>
  );
}

export const useVariant = () => useContext(VariantContext);
