import { Category } from "./types";
import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";

export default function useCategory(slug: string) {
  const [data, setData] = useState<Category | undefined>();
  const [error, setError] = useState<boolean>(false);
  const fetcher = async (whereslug: string) => {
    try {
      const { data } = await axiosInstance.post(`/category/unique`, {
        where: {
          slug: whereslug,
        },

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
    if (slug) {
      setData(undefined);
      setError(false);
      fetcher(slug);
    }
  }, [slug]);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
