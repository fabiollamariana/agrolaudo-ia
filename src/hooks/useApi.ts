import { useState, useCallback } from 'react';
import { API_CONFIG } from '../constants';
import type { ApiResponse, AppError } from '../types';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const request = useCallback(async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const appError: AppError = {
        code: 'NETWORK_ERROR',
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
      };
      setError(appError);
      throw appError;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback(<T>(endpoint: string) => 
    request<T>(endpoint, { method: 'GET' }), [request]);

  const post = useCallback(<T>(endpoint: string, data: any) => 
    request<T>(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }), [request]);

  const put = useCallback(<T>(endpoint: string, data: any) => 
    request<T>(endpoint, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    }), [request]);

  const del = useCallback(<T>(endpoint: string) => 
    request<T>(endpoint, { method: 'DELETE' }), [request]);

  return { get, post, put, delete: del, loading, error };
};
