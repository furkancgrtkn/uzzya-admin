/* eslint-disable @next/next/no-img-element */
import { ReactElement, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "src/components/Button";
import Input from "src/components/FormElements/Input";
import Default from "src/components/Layout/Default";
import Loading from "src/components/Loading";
import Header from "src/components/Typography/Header";
import { Product } from "src/hooks/api/order/types";
import useOrder from "src/hooks/api/order/useOrder";
import axiosInstance from "src/utils/axiosInstance";
import * as yup from "yup";

interface UpdateShippingForm {
  tracking_number: string;
}

const schema = yup
  .object()
  .shape({
    tracking_number: yup.string().required("Bu Alan Zorunludur."),
  })
  .required();
const InfoBox = ({
  title,
  value,
  className,
}: {
  title: string;
  value: any;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col p-2 border rounded border-brand-black-secondaryLight ${
        className || ""
      }`}
    >
      <div className="text-xs mb-0.5">{title}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
};

const ProductCard = ({
  data,
  className,
}: {
  data: Product;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col p-2 border rounded border-brand-black-secondaryLight ${
        className || ""
      }`}
    >
      <img
        src={`${process.env.NEXT_APP_API_URL}/${data.product.thumbnail}`}
        className="mb-3 w-full aspect-square"
        alt=""
      />
      <div className="flex mb-1 items-center justify-between">
        <div>{data.product.title}</div>
        <div className="text-sm">
          {data.price} TRY / {data.quantity} Adet
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm">Barkod: {data.product.barcode}</div>
        <div className="text-sm">Stok: {data.product.stock}</div>
      </div>
      <div className="flex mt-2 flex-wrap    items-center justify-between">
        {data.product.attributes.map((e) => (
          <div
            key={e.attribute_id}
            className="text-sm py-0.5 px-1.5     mr-1 mb-1 bg-slate-200 rounded"
          >
            {e.attribute.attribute_type.title}: {e.attribute.value}
          </div>
        ))}
      </div>
      <div className="text-sm mt-1">Gönderim Durumu : {data.status}</div>
    </div>
  );
};
const Orders = () => {
  const router = useRouter();
  const [postLoad, setPostLoad] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateShippingForm>({
    resolver: yupResolver(schema),
  });
  const {
    data: order,
    isError,
    reFetch,
  } = useOrder(router.query.detail as string);
  console.log(order);
  const onSubmit: SubmitHandler<UpdateShippingForm> = async (data) => {
    setPostLoad(true);
    try {
      await axiosInstance.post("/order/update/shipping", {
        id: order?.id,
        tracking_number: data.tracking_number,
        productIds: order?.products.map((e) => e.product_id),
      });

      toast.success("İşlem Başarılı");
      if (order?.id) {
        reFetch(order.id.toString());
      }
    } catch (error) {
      toast.error("Hata");
    } finally {
      setPostLoad(false);
    }
  };

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      {order ? (
        <div className="px-4 pt-4 pb-8 grid grid-cols-2 gap-4">
          <Header className="col-span-2" variant="h6">
            Alıcı bilgileri
          </Header>
          <InfoBox title="Alıcı İsmi" value={order?.name} />
          <InfoBox title="Alıcı Soyismi" value={order.surname} />
          <InfoBox title="Telefon Numarası" value={order?.phone} />
          <InfoBox title="Email" value={order?.email} />
          <Header className="col-span-2" variant="h6">
            Sipariş bilgileri
          </Header>
          <InfoBox title="Durum" value={order?.status} />
          <InfoBox
            title="Tarih"
            value={new Date(order?.created_at).toLocaleDateString()}
          />
          <InfoBox title="Iyzico Token" value={order?.token} />
          <InfoBox title="Puan" value={order?.rate || "-"} />
          <InfoBox
            title="Yorum"
            value={order?.comment || "-"}
            className="col-span-2"
          />
          <Header className="col-span-2" variant="h6">
            Teslimat Adresi
          </Header>
          <InfoBox title="Şehir" value={order?.shipping.city} />
          <InfoBox title="Ülke" value={order.shipping.country} />
          <InfoBox title="Posta Kodu" value={order?.shipping.post_code} />
          <InfoBox title="Adres" value={order?.shipping.address} />
          <InfoBox
            title="Şehir (Fatura)"
            value={order?.shipping.billing_city}
          />
          <InfoBox
            title="Ülke (Fatura)"
            value={order.shipping.billing_country}
          />
          <InfoBox
            title="Posta Kodu (Fatura)"
            value={order?.shipping.billing_post_code}
          />
          <InfoBox
            title="Adres (Fatura)"
            value={order?.shipping.billing_address}
          />
          <InfoBox title="Teslimat Durumu" value={order?.shipping.status} />
          <InfoBox
            title="Güncelleme Tarihi"
            value={new Date(order?.shipping.updated_at).toLocaleDateString()}
          />

          <InfoBox
            className="col-span-2"
            title="Takip Numarası"
            value={order?.shipping.tracking_number || "-"}
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="col-span-2 flex flex-col"
          >
            <Input
              props={{
                ...register("tracking_number"),
                placeholder: "Takip Numarası",
                defaultValue: order.shipping.tracking_number,
              }}
              error={errors.tracking_number?.message}
            />
            <Button
              loading={postLoad}
              type="submit"
              className="ml-auto mt-1 bg-brand-green text-white text-sm px-2 py-1 rounded font-medium"
            >
              {order.shipping.tracking_number ? "Güncelle" : "Gönderimi Onayla"}
            </Button>
          </form>
          <Header className="col-span-2" variant="h6">
            Ödeme Bilgileri
          </Header>
          <InfoBox
            title="Ödenen Miktar"
            value={order?.payment.iyzicoJson.paidPrice + " TRY"}
          />
          <InfoBox
            title="Durum"
            value={order?.payment.iyzicoJson.paymentStatus}
          />
          <InfoBox title="Bin" value={order?.payment.iyzicoJson.binNumber} />
          <InfoBox
            title="Son 4 Hane"
            value={order?.payment.iyzicoJson.lastFourDigits}
          />
          <InfoBox
            title="İyzico Kesintisi"
            value={order?.payment.iyzicoJson.iyziCommissionFee + " TRY"}
          />
          <InfoBox
            title="Güncelleme Tarihi"
            value={new Date(order?.payment.updated_at).toLocaleDateString()}
          />
          <Header className="col-span-2" variant="h6">
            Ürünler
          </Header>
          <div className="grid grid-cols-3 gap-4 col-span-2">
            {order.products.map((e) => (
              <ProductCard key={e.product_id} data={e} />
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Orders;

Orders.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
