'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import {Brand} from '@/types';
import Cookies from 'js-cookie';
interface ContextProps {
  brands: Brand[];
  setBrands: Dispatch<SetStateAction<Brand[]>>;
  getListBrand: () => Promise<{
    [key: string]: any;
    data: Brand[];
  }>;
  createBrand: (payload: {
    name: string;
    is_competitor: number;
  }) => Promise<{code: number}>;
}

const defaultValue: ContextProps = {
  brands: [],
  setBrands: () => {},
  getListBrand: async () => ({data: []}),
  createBrand: async (payload) => ({code: 200}),
};

const BrandContext = createContext<ContextProps>(defaultValue);

export function BrandContextProvider({children}: {children: React.ReactNode}) {
  const token = Cookies.get('token');
  const [brands, setBrands] = useState<Brand[]>([]);

  const getListBrand = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  };
  const createBrand = async (payload: {
    name: string;
    is_competitor: number;
  }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/company-brand/create`,
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
  const ctx = {
    brands,
    setBrands,
    getListBrand,
    createBrand,
  };
  return <BrandContext.Provider value={ctx}>{children}</BrandContext.Provider>;
}

export const useBrand = () => useContext(BrandContext);
