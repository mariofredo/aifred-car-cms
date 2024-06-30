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
import {API_ROUTES} from '@/consts';
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
  }) => Promise<{[key: string]: any}>;
  updateBrand: (payload: {
    name: string;
    is_active: number;
    unique_id: string;
  }) => Promise<{[key: string]: any}>;
  deleteBrand: (unique_id: string) => Promise<{[key: string]: any}>;
  isLoadingBrand: LoadingBrand;
  setIsLoadingBrand: Dispatch<SetStateAction<LoadingBrand>>;
}

const defaultValue: ContextProps = {
  brands: [],
  setBrands: () => {},
  getListBrand: async () => ({data: []}),
  createBrand: async (payload) => ({code: 200}),
  updateBrand: async (payload) => ({}),
  deleteBrand: async (payload) => ({}),
  isLoadingBrand: {loadingList: false, loadingCreate: false},
  setIsLoadingBrand: () => {},
};

const BrandContext = createContext<ContextProps>(defaultValue);

export const BrandContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoadingBrand, setIsLoadingBrand] = useState<LoadingBrand>({
    loadingList: false,
    loadingCreate: false,
  });

  const getListBrand = async () => {
    try {
      setIsLoadingBrand((prev) => ({...prev, loadingList: true}));
      const response = await fetch(API_ROUTES.brand_list, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBrands(data.data);
        return data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingBrand((prev) => ({...prev, loadingList: false}));
    }
  };
  const createBrand = async (payload: {name: string; is_active: number}) => {
    try {
      setIsLoadingBrand((prev) => ({...prev, loadingCreate: true}));
      const response = await fetch(API_ROUTES.brand_create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingBrand((prev) => ({...prev, loadingCreate: false}));
    }
  };
  const updateBrand = async (payload: {
    name: string;
    is_active: number;
    unique_id: string;
  }) => {
    const response = await fetch(API_ROUTES.brand_update, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error('Error');
    }
    const data = await response.json();
    return data;
  };
  const deleteBrand = async (unique_id: string) => {
    try {
      const response = await fetch(API_ROUTES.brand_delete, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token_aifred_neo_cms')}`,
        },
        body: JSON.stringify({unique_id}),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const ctx = {
    brands,
    setBrands,
    getListBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    isLoadingBrand,
    setIsLoadingBrand,
  };
  return <BrandContext.Provider value={ctx}>{children}</BrandContext.Provider>;
};

export const useBrand = () => useContext(BrandContext);
