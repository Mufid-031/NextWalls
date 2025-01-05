import React from "react";
import useFetch from "./useFetch";

export default function useForm({ 
    enpoint, 
    headers, 
    method, 
    body
}: { 
    enpoint: string; 
    headers: Record<string, string>; 
    method: string; 
    body: Array<{ key: string; value: string }> 
}) {
    const formData = new FormData();
    body.forEach(({ key, value }) => {
        formData.append(key, value);
    });
    const { fetchData } = useFetch({ enpoint, headers, method, body });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchData();
  };

  return { handleSubmit };
}
