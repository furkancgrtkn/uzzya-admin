import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { AttributeTypeType } from "./types";

export default function useAttributeTypes() {
  const [data, setData] = useState<AttributeTypeType[] | undefined>();
  const [error, setError] = useState<boolean>(false);
  const fetcher = async () => {
    setData(undefined);
    setError(false);
    try {
      const { data } = await axiosInstance.post(`/admin/attribute/type`, {
        select: {
          id: true,
          title: true,
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
