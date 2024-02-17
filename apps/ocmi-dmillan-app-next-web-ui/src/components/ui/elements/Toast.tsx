import React, { ReactElement, createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

const ToastContext = createContext<any>(undefined);

export type ToastOptions = {
  severity: string
  summary: string
  detail: string
}

export default function ToastContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const toast = useRef<any>(null);

  const showToast: (options: ToastOptions) => void = (options: ToastOptions) => {
    if (!toast.current) return;
    toast.current.show(options);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className='h-full'>{children}</div>
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
}

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    console.error(
      'useToastContext have to be used within ToastContextProvider'
    );
  }

  return context;
};
