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

interface CreateEditAttributeTypeRequest {
  title: string;
}

const schema = yup
  .object()
  .shape({
    title: yup.string().required("Bu Alan Zorunludur."),
  })
  .required();
const CreateEditAttributeType = ({
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
  } = useForm<CreateEditAttributeTypeRequest>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (attributeType) {
      setValue("title", attributeType.title);
    }
  }, [attributeType, setValue]);

  const onSubmit: SubmitHandler<CreateEditAttributeTypeRequest> = async (
    data
  ) => {
    setPostLoad(true);
    try {
      if (attributeType) {
        await axiosInstance.post("/attribute/type/update", {
          data,
          where: {
            id: attributeType.id,
          },
        });
      } else {
        await axiosInstance.post("/attribute/type/create", {
          data,
        });
      }
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
      <PageHeader className="pl-4" title={"Kategori Oluştur"} />
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
              Oluştur
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateEditAttributeType;
