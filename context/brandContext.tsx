'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import {Brand, LoadingBrand} from '@/types';
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
    is_active: number;
  }) => Promise<{code: number}>;
  isLoadingBrand: LoadingBrand;
  setIsLoadingBrand: Dispatch<SetStateAction<LoadingBrand>>;
}

const defaultValue: ContextProps = {
  brands: [],
  setBrands: () => {},
  getListBrand: async () => ({data: []}),
  createBrand: async (payload) => ({code: 200}),
  isLoadingBrand: {loadingList: false, loadingCreate: false},
  setIsLoadingBrand: () => {},
};

const BrandContext = createContext<ContextProps>(defaultValue);

export const BrandContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = Cookies.get('token_aifred_neo_cms');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoadingBrand, setIsLoadingBrand] = useState<LoadingBrand>({
    loadingList: false,
    loadingCreate: false,
  });

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
      setBrands(data.data);
      return data;
    }
  };
  const createBrand = async (payload: {name: string; is_active: number}) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/brand/store`,
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
    isLoadingBrand,
    setIsLoadingBrand,
  };
  return <BrandContext.Provider value={ctx}>{children}</BrandContext.Provider>;
};

export const useBrand = () => useContext(BrandContext);
