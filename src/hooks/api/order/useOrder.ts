import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";
import { UniqueOrder } from "./types";

export default function useOrder(id: string) {
  const [data, setData] = useState<UniqueOrder | undefined>();
  const [error, setError] = useState<boolean>(false);
  const fetcher = async (orderId: string) => {
    setData(undefined);
    setError(false);
    try {
      const { data } = await axiosInstance.post(`/order/unique/foradmin`, {
        id: +orderId,
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
