'use client';
import {
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  createContext,
} from 'react';
import {Spec, SelectedSpec} from '@/types/spec';
import Cookies from 'js-cookie';
import {API_ROUTES} from '@/consts';
import {Tag} from '@/types';
interface ContextProps {
  tagSuggestion: Tag[];
  setTagSuggestion: Dispatch<SetStateAction<Tag[]>>;
  specs: Spec[];
  setSpecs: Dispatch<SetStateAction<Spec[]>>;
  getListSpec: () => void;
  selectedSpecs: SelectedSpec[];
  setSelectedSpecs: Dispatch<SetStateAction<SelectedSpec[]>>;
  createSpec: (payload: {name: string}) => Promise<{[key: string]: any}>;
  updateSpec: (payload: {
    name: string;
    is_active: number;
    id: number;
  }) => Promise<{[key: string]: any}>;
  deleteSpec: (id: number) => Promise<{[key: string]: any}>;
  fetchSpecs: boolean;
  setFetchSpecs: Dispatch<SetStateAction<boolean>>;
  getListTag: () => void;
}

const defaultValue = {
  tagSuggestion: [],
  setTagSuggestion: () => {},
  specs: [],
  setSpecs: () => {},
  getListSpec: async () => {},
  selectedSpecs: [],
  setSelectedSpecs: () => {},
  createSpec: async () => ({}),
  updateSpec: async () => ({}),
  deleteSpec: async () => ({}),
  fetchSpecs: false,
  setFetchSpecs: () => {},
  getListTag: () => {},
};
const SpecParamContext = createContext<ContextProps>(defaultValue);

export function SpecParamContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = Cookies.get('token_aifred_neo_cms');
  const [tagSuggestion, setTagSuggestion] = useState<Tag[]>([]);
  const [specs, setSpecs] = useState<Spec[]>([]);
  const [selectedSpecs, setSelectedSpecs] = useState<SelectedSpec[]>([]);
  const [fetchSpecs, setFetchSpecs] = useState<boolean>(false);

  const getListSpec = async () => {
    await setSpecs([]);
    await setSelectedSpecs([]);
    const response = await fetch(API_ROUTES.spec_category_list, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setSpecs(
        data.data.map((el: Spec) => ({
          id: el.id,
          name: el.name,
          checked: false,
        }))
      );
      return data;
    }
  };
  const createSpec = async (payload: {name: string}) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/spec/store`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      throw new Error('Error');
    }
    const data = response.json();
    return data;
  };
  const updateSpec = async (payload: {name: string; id: number}) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/spec/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const deleteSpec = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/spec/delete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({id}),
        }
      );
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getListTag = async () => {
    const response = await fetch(API_ROUTES.tag_list, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      const result = await data.data.map(
        (el: {object_id: string; name: string; id: number}) => ({
          id: el.id.toString(),
          object_id: el.object_id,
          className: '',
          text: el.name,
        })
      );
      setTagSuggestion(result);
    }
  };
  const ctx = {
    tagSuggestion,
    setTagSuggestion,
    specs,
    setSpecs,
    getListSpec,
    selectedSpecs,
    setSelectedSpecs,
    createSpec,
    updateSpec,
    deleteSpec,
    fetchSpecs,
    setFetchSpecs,
    getListTag,
  };
  return (
    <SpecParamContext.Provider value={ctx}>
      {children}
    </SpecParamContext.Provider>
  );
}

export const useSpec = () => useContext(SpecParamContext);
