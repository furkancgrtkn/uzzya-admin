import { AttributeTypeType } from "./types";
import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";

export default function useAttributeTypes() {
  const [data, setData] = useState<AttributeTypeType[] | undefined>();
  const [error, setError] = useState<boolean>(false);
  const fetcher = async () => {
    try {
      const { data } = await axiosInstance.post(`/attribute/type`, {
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
    setData(undefined);
    setError(false);
    fetcher();
  }, []);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
