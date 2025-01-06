import axios from "axios";
import { useEffect, useState } from "react";

export type UseFetchReturn<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

export default function useFetch<T, R = T>(
  endpoint: string,
  revalidateInterval?: number,
  transform?: (data: T) => R
): UseFetchReturn<R> {
  const [data, setData] = useState<R | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(endpoint, { cancelToken: source.token });
        const transformedData = transform ? transform(response.data) : (response.data as unknown as R);
        setData(transformedData);
        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const intervalId = revalidateInterval
      ? setInterval(fetchData, revalidateInterval)
      : null;

    return () => {
      source.cancel('Component unmounted');
      if (intervalId) clearInterval(intervalId);
    };
  }, [endpoint, revalidateInterval, transform]);

  return { data, isLoading, error };
}

