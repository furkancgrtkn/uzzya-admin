/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import Button from "src/components/Button";
import Input from "src/components/FormElements/Input";
import PageHeader from "src/components/PageHeader";
import { AttributeTypeType } from "src/hooks/api/attributes/types";
import axiosInstance from "src/utils/axiosInstance";

interface UpsertAttributeTypeRequest {
  title: string;
}

const schema = yup
  .object()
  .shape({
    title: yup.string().required("Bu Alan Zorunludur."),
  })
  .required();
const UpsertAttributeType = ({
  setRows,
  attributeType,
}: {
  setRows: () => void;
  attributeType?: AttributeTypeType;
}) => {
  const [postLoad, setPostLoad] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpsertAttributeTypeRequest>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (attributeType) {
      setValue("title", attributeType.title);
    }
  }, [attributeType, setValue]);

  const onSubmit: SubmitHandler<UpsertAttributeTypeRequest> = async (data) => {
    setPostLoad(true);
    try {
      await axiosInstance.post("/attribute/type/upsert", {
        data,
        create: {
          ...data,
        },
        update: {
          ...data,
        },
        select: {
          id: true,
        },
        where: {
          id: attributeType?.id || "",
        },
      });

      toast.success("İşlem Başarılı");
      setRows();
    } catch (error) {
      toast.error("Hata");
    } finally {
      setPostLoad(false);
    }
  };

  return (
    <>
      <PageHeader
        className="pl-4"
        title={
          attributeType ? "Özellik Tipini Güncelle" : "Özellik Tipi Oluştur"
        }
      />
      <div className="p-4">
        <form
          className="grid grid-cols-1 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            props={{ ...register("title"), placeholder: "Örn. Renk" }}
            error={errors.title?.message}
            label="Ana Özellik Adı"
          />

          <div className="flex justify-end w-full">
            <Button
              loading={postLoad}
              type="submit"
              className="font-medium px-3 py-2 rounded text-white bg-brand-green"
            >
              {attributeType ? "Güncelle" : "Oluştur"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default UpsertAttributeType;
