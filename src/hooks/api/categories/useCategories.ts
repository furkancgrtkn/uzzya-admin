import { Categories } from "./types";
import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";

export default function useCategories() {
  const [data, setData] = useState<Categories[] | undefined>();
  const [error, setError] = useState<boolean>(false);
  const fetcher = async () => {
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
