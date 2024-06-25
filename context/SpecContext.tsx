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
  createSpec: (payload: {name: string}) => void;
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
  createSpec: () => {},
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
  const token = Cookies.get('token');
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
      `${process.env.NEXT_PUBLIC_API_URL}/spec-param/create`,
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
      const data = response.json();
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
