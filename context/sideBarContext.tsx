'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface ContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: ContextProps = {
  open: false,
  setOpen: () => {},
};

const SidebarContext = createContext<ContextProps>(defaultValue);

export function SidebarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const ctx = {
    open,
    setOpen,
  };
  return (
    <SidebarContext.Provider value={ctx}>{children}</SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
