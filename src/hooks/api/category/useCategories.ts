import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { Category } from "./types";

export default function useCategories() {
  const [data, setData] = useState<Category[] | undefined>();
  const [error, setError] = useState<boolean>(false);
  const fetcher = async () => {
    setData(undefined);
    setError(false);
    try {
      const { data } = await axiosInstance.post(`/category`, {
        select: {
          id: true,
          title: true,
          image: true,
          slug: true,
          parent: {
            select: {
              id: true,
              title: true,
            },
          },
          children: {
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
