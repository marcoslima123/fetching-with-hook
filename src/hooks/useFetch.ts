import axios, { Axios, AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';

const { VITE_API } = import.meta.env

const api = axios.create({
  baseURL:<string> import.meta.env.VITE_API
})

export function useFetch<T = unknown>(url: string, options?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api.get(url, options).then(response => {
      setData(response.data);
    })
    .catch(error => {
      setError(error)
    })
    .finally(() => {
      setIsFetching(false);
    })
  },[])

  return { data, error, isFetching }
}