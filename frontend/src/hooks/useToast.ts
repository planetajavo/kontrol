// ============================================================================
// USE TOAST - Custom Hook
// ============================================================================

import { toast as sonnerToast } from 'sonner@2.0.3';

interface ToastOptions {
  title: string;
  description?: string;
  duration?: number;
}

export function useToast() {
  const success = ({ title, description, duration = 4000 }: ToastOptions) => {
    sonnerToast.success(title, {
      description,
      duration,
    });
  };

  const error = ({ title, description, duration = 5000 }: ToastOptions) => {
    sonnerToast.error(title, {
      description,
      duration,
    });
  };

  const warning = ({ title, description, duration = 4000 }: ToastOptions) => {
    sonnerToast.warning(title, {
      description,
      duration,
    });
  };

  const info = ({ title, description, duration = 4000 }: ToastOptions) => {
    sonnerToast.info(title, {
      description,
      duration,
    });
  };

  const promise = <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return sonnerToast.promise(promise, messages);
  };

  return {
    success,
    error,
    warning,
    info,
    promise,
  };
}
