'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import Cookies from 'js-cookie';
import {Product} from '@/types';
import {API_ROUTES} from '@/consts';
interface ContextProps {
  getListProduct: () => Promise<{
    [key: string]: any;
    data: Product[];
  }>;
  createProduct: (payload: {
    brand_unique_id: string;
    name: string;
    is_active: number;
  }) => Promise<{[key: string]: any}>;
  updateProduct: (payload: {
    id: string;
    brand_unique_id: string;
    name: string;
    is_active: number;
  }) => Promise<{[key: string]: any}>;
  getDetailProduct: (object_id: string) => Promise<{[key: string]: any}>;
  deleteProduct: (object_id: string) => Promise<{[key: string]: any}>;
}

const defaultValue: ContextProps = {
  getListProduct: async () => ({data: []}),
  createProduct: async (payload) => ({}),
  updateProduct: async (payload) => ({}),
  getDetailProduct: async (object_id) => ({}),
  deleteProduct: async (object_id) => ({}),
};

const ProductContext = createContext<ContextProps>(defaultValue);

export function ProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = Cookies.get('token');

  const getListProduct = async () => {
    try {
      const response = await fetch(API_ROUTES.product_list, {
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
  const createProduct = async (payload: {
    brand_unique_id: string;
    name: string;
    is_active: number;
  }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/store`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {}
  };
  const updateProduct = async (payload: {
    id: string;
    brand_unique_id: string;
    name: string;
    is_active: number;
  }) => {
    try {
      const response = await fetch(API_ROUTES.product_update, {
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
  const getDetailProduct = async (object_id: string) => {
    try {
      const response = await fetch(
        API_ROUTES.product_detail + `/${object_id}`,
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
  const deleteProduct = async (object_id: string) => {
    try {
      const response = await fetch(API_ROUTES.product_delete, {
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
    getListProduct,
    createProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct,
  };
  return (
    <ProductContext.Provider value={ctx}>{children}</ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
