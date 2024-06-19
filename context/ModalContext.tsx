'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface ContextProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: ContextProps = {
  showModal: false,
  setShowModal: () => {},
};

const ModalContext = createContext<ContextProps>(defaultValue);

export function ModalContextProvider({children}: {children: React.ReactNode}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const ctx = {
    showModal,
    setShowModal,
  };
  return <ModalContext.Provider value={ctx}>{children}</ModalContext.Provider>;
}

export const useModal = () => useContext(ModalContext);
