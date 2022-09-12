/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "src/components/FormElements/Input";
import { Select } from "src/components/FormElements/Select";
import FormFooter from "src/components/FormFooter";
import FormHeader from "src/components/FormHeader";
import {
  AttributeType,
  AttributeTypeType,
} from "src/hooks/api/attributes/types";
import axiosInstance from "src/utils/axiosInstance";
import * as yup from "yup";

interface UpsertAttributeRequest {
  attribute_type_id: number;
  value: string;
}

const schema = yup
  .object()
  .shape({
    value: yup.string().required("Bu Alan Zorunludur."),
    attribute_type_id: yup.number().required("Bu Alan Zorunludur."),
  })
  .required();
const UpsertAttribute = ({
  onSuccess,
  attributeTypes,
  attribute,
  onCancel,
}: {
  onSuccess?: () => void;
  onCancel?: () => void;
  attributeTypes: AttributeTypeType[];
  attribute?: AttributeType;
}) => {
  const [postLoad, setPostLoad] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UpsertAttributeRequest>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (attribute) {
      setValue("value", attribute.value);
      setValue("attribute_type_id", attribute.attribute_type.id);
    }
  }, [attribute, setValue]);

  const onSubmit: SubmitHandler<UpsertAttributeRequest> = async (data) => {
    setPostLoad(true);
    try {
      await axiosInstance.post("/admin/attribute/upsert", {
        create: {
          ...data,
        },
        update: {
          ...data,
        },
        where: {
          id: attribute?.id || 0,
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
        title={attribute ? "Özelliği Güncelle" : "Yeni Özellik Oluştur"}
      />
      <div className="grid grid-cols-2 gap-4 p-4">
        <Input
          props={{ ...register("value"), placeholder: "Örn. Renk" }}
          error={errors.value?.message}
          label="Özellik Adı"
        />

        <Controller
          control={control}
          name="attribute_type_id"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select
              label="Özellik Tipi"
              onChange={(e) => {
                onChange(e);
              }}
              selected={value}
              options={attributeTypes.map((el) => {
                return {
                  value: el.id,
                  label: el.title,
                  filterValue: el.title,
                };
              })}
              error={error?.message}
            />
          )}
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
export default UpsertAttribute;
