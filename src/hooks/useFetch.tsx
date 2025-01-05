import { useState } from "react";

export default function useFetch({
    enpoint,
    headers,
    method,
    body,
}: {
    enpoint: string;
    headers: Record<string, string>;
    method: string;
    body: Array<{ key: string; value: string }>;
}) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchData = async () => {
        setIsLoading(true);
        try {  
            const response = await fetch(`${enpoint}`, {
                method,
                headers: headers,
                body: JSON.stringify(body)
            })
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error as string);
        } finally {
            setIsLoading(false);
        }
    }

    return { fetchData, data, isLoading, error };
}