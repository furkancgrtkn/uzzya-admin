import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { AttributeType } from "./types";

export default function useAttributes() {
  const [data, setData] = useState<AttributeType[] | undefined>();
  const [error, setError] = useState<boolean>(false);
  const fetcher = async () => {
    setData(undefined);
    setError(false);
    try {
      const { data } = await axiosInstance.post(`/attribute`, {
        select: {
          id: true,
          value: true,
          attribute_type: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });
      setData(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    reFetch: fetcher,
  };
}
