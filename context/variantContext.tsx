'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import Cookies from 'js-cookie';
import {SelectedSpec, Tag, Variant} from '@/types';
import {API_ROUTES} from '@/consts';
interface ContextProps {
  getListVariant: (
    productId: string,
    payload: any
  ) => Promise<{
    [key: string]: any;
    data: Variant[];
  }>;
  createVariant: (
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
  updateVariant: (
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
  getDetailVariant: (
    productId: string,
    variantId: string
  ) => Promise<{[key: string]: any}>;
  deleteVariant: (object_id: string) => Promise<{[key: string]: any}>;
}

const defaultValue: ContextProps = {
  getListVariant: async (productId, payload) => ({data: []}),
  createVariant: async (productId, payload) => ({}),
  updateVariant: async (productId, payload) => ({}),
  getDetailVariant: async (productId, variantId) => ({}),
  deleteVariant: async (object_id) => ({}),
};

const VariantContext = createContext<ContextProps>(defaultValue);

export function VariantContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = Cookies.get('token_aifred_neo_cms');

  const getListVariant = async (productId: string, payload: any) => {
    try {
      let query = '';
      for (const key in payload) {
        if (Object.hasOwnProperty.call(payload, key)) {
          const element = payload[key];
          if (Array.isArray(element)) {
            const labelString = element?.map((item) => item.label).join(',');
            const valueString = element?.map((item) => item.value).join(',');
            query += `${key}_name=${labelString}&`;
            query += `${key}=${valueString}&`;
          } else query += `${key}=${element}&`;
        }
      }
      const response = await fetch(
        API_ROUTES.variant_list(productId) + `?${query}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {}
  };
  const createVariant = async (
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
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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
