import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { UniqueOrder } from "./types";

export default function useOrder( id: number) {
  const [data, setData] = useState<UniqueOrder | undefined>();
  const [error, setError] = useState<boolean>(false);
  const fetcher = async (order id: number) => {
    setData(undefined);
    setError(false);
    try {
      const { data } = await axiosInstance.post(`/admin/order/unique`, {
        where: { id: +orderId },
        select: {
          id: true,
          status: true,
          updated_at: true,
          created_at: true,
          uuid: true,
          comment: true,
          rate: true,
          user: {
            select: {
              email: true,
              profile: {
                select: { name: true, phone: true, surname: true },
              },
            },
          },
          shipping: true,
          payment: {
            select: {
              id: true,
              iyzicoJson: true,
              updated_at: true,
            },
          },
          products: {
            select: {
              price: true,
              product: {
                select: {
                  id: true,
                  thumbnail: true,
                  slug: true,
                  barcode: true,
                  stock: true,
                  title: true,
                  category: {
                    select: {
                      title: true,
                      slug: true,
                      id: true,
                    },
                  },
                  attributes: {
                    select: {
                      attribute: {
                        select: {
                          id: true,
                          value: true,
                          attribute_type: true,
                        },
                      },
                    },
                  },
                },
              },
              product_id: true,
              status: true,
              quantity: true,
              discounted_price: true,
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
    if (id) {
      fetcher(id);
    }
  }, [id]);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    reFetch: fetcher,
  };
}
