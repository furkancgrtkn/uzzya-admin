/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "src/components/FormElements/Input";
import FormFooter from "src/components/FormFooter";
import FormHeader from "src/components/FormHeader";
import { AttributeTypeType } from "src/hooks/api/attributes/types";
import axiosInstance from "src/utils/axiosInstance";
import * as yup from "yup";

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
  onSuccess,
  onCancel,
  attributeType,
}: {
  onSuccess: () => void;
  onCancel?: () => void;
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
      await axiosInstance.post("/admin/attribute/type/upsert", {
        create: {
          ...data,
        },
        update: {
          ...data,
        },
        where: {
          id: attributeType?.id || 0,
        },
      });

      toast.success("İşlem Başarılı");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Hata");
    } finally {
      setPostLoad(false);
    }
  };

  return (
    <form className="flex flex-col h-full" onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        title={attributeType ? "Tipi Güncelle" : "Yeni Tip Oluştur"}
      />
      <div className="grid grid-cols-1 gap-4 p-4">
        <Input
          props={{ ...register("title"), placeholder: "Örn. Renk" }}
          error={errors.title?.message}
          label="Ana Özellik Adı"
        />
      </div>
      <FormFooter
        onCancel={() => {
          if (onCancel) onCancel();
        }}
        loading={postLoad}
      />
    </form>
  );
};
export default UpsertAttributeType;
