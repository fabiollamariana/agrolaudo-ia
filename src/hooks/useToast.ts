import { useState, useCallback } from 'react';
import type { ToastProps } from '../components/common/Toast';

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((
    type: ToastProps['type'],
    message: string,
    options?: Partial<Omit<ToastProps, 'id' | 'type' | 'message' | 'onClose'>>
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newToast: ToastProps = {
      id,
      type,
      message,
      ...options,
      onClose: (toastId) => {
        setToasts(prev => prev.filter(toast => toast.id !== toastId));
      },
    };

    setToasts(prev => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message: string, options?: Omit<ToastProps, 'id' | 'type' | 'message' | 'onClose'>) => {
    return addToast('success', message, options);
  }, [addToast]);

  const error = useCallback((message: string, options?: Omit<ToastProps, 'id' | 'type' | 'message' | 'onClose'>) => {
    return addToast('error', message, options);
  }, [addToast]);

  const warning = useCallback((message: string, options?: Omit<ToastProps, 'id' | 'type' | 'message' | 'onClose'>) => {
    return addToast('warning', message, options);
  }, [addToast]);

  const info = useCallback((message: string, options?: Omit<ToastProps, 'id' | 'type' | 'message' | 'onClose'>) => {
    return addToast('info', message, options);
  }, [addToast]);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clearAll,
  };
};
