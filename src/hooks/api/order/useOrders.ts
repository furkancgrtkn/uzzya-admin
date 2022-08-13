import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { Order } from "./types";

export default function useOrders() {
  const [data, setData] = useState<Order[] | undefined>();
  const [error, setError] = useState<boolean>(false);
  const fetcher = async () => {
    setData(undefined);
    setError(false);
    try {
      const { data } = await axiosInstance.post(`/order`, {
        select: {
          id: true,
          email: true,
          status: true,
          updated_at: true,
          comment: true,
          rate: true,
          payment: {
            select: {
              id: true,
              iyzicoJson: true,
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