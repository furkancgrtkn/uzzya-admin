import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { ProductType } from "./types";

export default function useProducts() {
  const [data, setData] = useState<ProductType[] | undefined>();
  const [error, setError] = useState<boolean>(false);
  const fetcher = async () => {
    setData(undefined);
    setError(false);
    try {
      const { data } = await axiosInstance.post(`/product/foradmin`, {
        select: {
          id: true,
          title: true,
          images: true,
          slug: true,
          published: true,
          description: true,
          price: true,
          parent_id: true,
          short_description: true,
          brand: true,
          barcode: true,
          stock: true,
          thumbnail: true,
          discounted_price: true,
          discount_rate: true,
          category: {
            select: {
              id: true,
              title: true,
            },
          },
          variants: {
            select: {
              id: true,
            },
          },
          attributes: {
            select: {
              attribute: {
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
              },
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
