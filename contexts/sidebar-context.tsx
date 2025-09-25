'use client';

// import necessary modules
import { createContext, useContext, useState } from 'react';

// define the SidebarContext type
interface SidebarContextType {
  isOpenSidebar: boolean;
  onToggleSidebar: () => void;
}

// create the SidebarContext
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// create the SidebarProvider
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleSidebar() {
    setIsOpen((prev) => !prev);
  }

  return (
    <SidebarContext.Provider
      value={{
        isOpenSidebar: isOpen,
        onToggleSidebar: handleToggleSidebar,
      }}>
      {children}
    </SidebarContext.Provider>
  );
}

// create the useSidebar hook
export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
};
