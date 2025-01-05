import axios from "axios";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useFetch(enpoint: string, revalidateInterval?: number, callback?: (data: any) => void) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useIsomorphicLayoutEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${enpoint}`);
        let data = await response.data;
        if (callback) {
            data = callback(data);
        }
        setData(data);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    const intervalId = setInterval(() => {
        fetchData();
    }, revalidateInterval);
    return () => clearInterval(intervalId);
  }, []);

  return { data, isLoading, error };
}