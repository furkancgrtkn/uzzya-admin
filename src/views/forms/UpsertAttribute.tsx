/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import Button from "src/components/Button";
import Input from "src/components/FormElements/Input";
import { Select } from "src/components/FormElements/Select";
import PageHeader from "src/components/PageHeader";
import {
  AttributeType,
  AttributeTypeType,
} from "src/hooks/api/attributes/types";
import axiosInstance from "src/utils/axiosInstance";

interface UpsertAttributeRequest {
  attribute_type_id: string;
  value?: string;
}

const schema = yup
  .object()
  .shape({
    attribute_type_id: yup.string().required("Bu Alan Zorunludur."),
    value: yup.string().required("Bu Alan Zorunludur."),
  })
  .required();
const UpsertAttribute = ({
  setRows,
  attributeTypes,
  attribute,
}: {
  setRows: () => void;
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
      await axiosInstance.post("/attribute/upsert", {
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
          id: attribute?.id || "",
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
        title={attribute ? "Özelliği Güncelle" : "Özellik Oluştur"}
      />
      <div className="p-4">
        <form
          className="grid grid-cols-1 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
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

          <div className="flex justify-end w-full">
            <Button
              loading={postLoad}
              type="submit"
              className="font-medium px-3 py-2 rounded text-white bg-brand-green"
            >
              {attribute ? "Güncelle" : "Oluştur"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default UpsertAttribute;
