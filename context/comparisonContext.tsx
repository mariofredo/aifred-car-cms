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
import {StaticImageData} from 'next/image';

interface ContextProps {
  getListComparison: (
    productId: string,
    payload: any
  ) => Promise<{
    [key: string]: any;
    data: Comparison[];
  }>;
  createComparison: (
    productId: string,
    payload: {
      product_name: string;
      variant_name: string;
      price: number;
      spec: SelectedSpec[];
      image: File | null;
      is_active: number;
    }
  ) => Promise<{[key: string]: any}>;
  updateComparison: (
    productId: string,
    payload: {
      id: string;
      product_name: string;
      variant_name: string;
      price: number;
      spec: SelectedSpec[];
      image: File | null;
      is_active: number;
    }
  ) => Promise<{[key: string]: any}>;
  getDetailComparison: (
    productId: string,
    comparisonId: string
  ) => Promise<{[key: string]: any}>;
  deleteComparison: (
    id: string,
    object_id: string
  ) => Promise<{[key: string]: any}>;
}

const defaultValue: ContextProps = {
  getListComparison: async (productId, payload) => ({data: []}),
  createComparison: async (productId, payload) => ({}),
  updateComparison: async (productId, payload) => ({}),
  getDetailComparison: async (productId, comparisonId) => ({}),
  deleteComparison: async (object_id) => ({}),
};

const ComparisonContext = createContext<ContextProps>(defaultValue);

export function ComparisonContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = Cookies.get('token_aifred_neo_cms');

  const getListComparison = async (productId: string, payload: any) => {
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
        API_ROUTES.comparison_list(productId) + `?${query}`,
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
  const createComparison = async (
    productId: string,
    payload: {
      product_name: string;
      variant_name: string;
      price: number;
      spec: SelectedSpec[];
      image: File | null;
      is_active: number;
    }
  ) => {
    try {
      const {is_active, variant_name, price, image, spec, product_name} =
        payload;
      const formData = new FormData();
      formData.append('product_name', product_name);
      formData.append('variant_name', variant_name);
      formData.append('price', price.toString());
      formData.append('is_active', is_active.toString());
      spec.forEach((item, i) => {
        formData.append(`spec_id[${i}]`, item.id.toString());
        formData.append(`spec_content[${i}]`, item.value.toString());
      });
      if (image) formData.append('image', image);
      else formData.append('image', '');
      // console.log(payload, 'payload');
      const response = await fetch(API_ROUTES.comparison_create(productId), {
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
  const updateComparison = async (
    productId: string,
    payload: {
      id: string;
      product_name: string;
      variant_name: string;
      price: number;
      spec: SelectedSpec[];
      image: File | null;
      is_active: number;
    }
  ) => {
    try {
      const {product_name, is_active, variant_name, price, image, spec, id} =
        payload;
      const formData = new FormData();
      formData.append('id', id);
      formData.append('product_name', product_name);
      formData.append('variant_name', variant_name);
      formData.append('price', price.toString());
      formData.append('is_active', is_active.toString());
      spec.forEach((item, i) => {
        formData.append(`spec_id[${i}]`, item.id.toString());
        formData.append(`spec_content[${i}]`, item.value.toString());
      });
      if (image) formData.append('image', image);
      else formData.append('image', '');
      const response = await fetch(API_ROUTES.comparison_update(productId), {
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
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const getDetailComparison = async (id: string, comparisonId: string) => {
    try {
      const response = await fetch(
        API_ROUTES.comparison_detail(id, comparisonId),
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
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComparison = async (id: string, object_id: string) => {
    try {
      const response = await fetch(API_ROUTES.comparison_delete(id), {
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
