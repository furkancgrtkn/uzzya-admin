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
import { UniqueOrderProduct } from "src/hooks/api/order/types";
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
      className={`flex bg-white flex-col p-2 border rounded border-brand-black-secondaryLight ${
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
  data: UniqueOrderProduct;
  className?: string;
}) => {
  return (
    <div
      className={`flex bg-white flex-col p-2 border rounded border-brand-black-secondaryLight ${
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
      <div className="flex mt-2 flex-wrap items-center">
        {data.product.attributes.map((e) => (
          <div
            key={e.attribute.id}
            className="text-sm py-0.5 px-1.5 mr-1 mb-1 border border-brand-black-secondaryLight rounded"
          >
            {e.attribute.attribute_type.title}: {e.attribute.value}
          </div>
        ))}
      </div>
      <div className="text-sm mt-1">G??nderim Durumu : {data.status}</div>
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
      await axiosInstance.post("/admin/order/update/shipping", {
        id: order?.id,
        tracking_number: data.tracking_number,
        productIds: order?.products.map((e) => e.product_id),
      });

      toast.success("????lem Ba??ar??l??");
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
            Al??c?? bilgileri
          </Header>
          <InfoBox title="Al??c?? ??smi" value={order?.user.profile.name} />
          <InfoBox title="Al??c?? Soyismi" value={order.user.profile.surname} />
          <InfoBox title="Telefon Numaras??" value={order?.user.profile.phone} />
          <InfoBox title="Email" value={order?.user.email} />
          <Header className="col-span-2" variant="h6">
            Sipari?? bilgileri
          </Header>
          <InfoBox title="Durum" value={order?.status} />
          <InfoBox
            title="Tarih"
            value={new Date(order?.created_at).toLocaleDateString()}
          />
          <InfoBox
            title="G??ncellenme Tarihi"
            value={new Date(order?.updated_at).toLocaleDateString()}
          />
          <InfoBox title="Puan" value={order?.rate || "-"} />
          <InfoBox
            title="Yorum"
            value={order?.comment || "-"}
            className="col-span-2"
          />
          <Header className="col-span-2" variant="h6">
            Teslimat Adresi
          </Header>
          <InfoBox title="??ehir" value={order?.shipping.city} />
          <InfoBox title="??lke" value={order.shipping.country} />
          <InfoBox title="Posta Kodu" value={order?.shipping.post_code} />
          <InfoBox title="Adres" value={order?.shipping.address} />
          <InfoBox
            title="??ehir (Fatura)"
            value={order?.shipping.billing_city}
          />
          <InfoBox
            title="??lke (Fatura)"
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
            title="G??ncelleme Tarihi"
            value={new Date(order?.shipping.updated_at).toLocaleDateString()}
          />

          <InfoBox
            className="col-span-2"
            title="Takip Numaras??"
            value={order?.shipping.tracking_number || "-"}
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="col-span-2 bg-white pt-5 pb-3 px-4 border border-brand-black-secondaryLight rounded flex flex-col"
          >
            <Input
              label="Takip Numaras??"
              props={{
                ...register("tracking_number"),
                placeholder: "Takip Numaras??",
                defaultValue: order.shipping.tracking_number,
              }}
              error={errors.tracking_number?.message}
            />
            <Button
              loading={postLoad}
              type="submit"
              className="font-medium px-3 py-1.5 ml-auto mt-3 rounded text-sm bg-brand-palette-primary border border-brand-palette-primary  text-white"
            >
              {order.shipping.tracking_number ? "G??ncelle" : "G??nderimi Onayla"}
            </Button>
          </form>
          <Header className="col-span-2" variant="h6">
            ??deme Bilgileri
          </Header>
          <InfoBox
            title="??denen Miktar"
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
            title="??yzico Kesintisi"
            value={order?.payment.iyzicoJson.iyziCommissionFee + " TRY"}
          />
          <InfoBox
            title="G??ncelleme Tarihi"
            value={new Date(order?.payment.updated_at).toLocaleDateString()}
          />
          <Header className="col-span-2" variant="h6">
            ??r??nler
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
