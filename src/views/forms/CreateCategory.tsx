/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "src/components/Button";
import Input from "src/components/FormElements/Input";
import Select from "src/components/FormElements/Select";
import PageHeader from "src/components/PageHeader";
import axiosInstance from "src/utils/axiosInstance";
import * as yup from "yup";
import { Category } from "src/hooks/api/category/types";

interface CreateCategoryRequest {
  title: string;
  slug: string;
  parent_id: string;
}

const schema = yup
  .object()
  .shape({
    title: yup.string().required("Bu Alan Zorunludur."),
    slug: yup.string().required("Bu Alan Zorunludur."),
    parent_id: yup.string().notRequired().nullable(),
  })
  .required();
const CreateCategory = ({
  categories,
  setRows,
}: {
  categories: Category[] | undefined;
  setRows: () => void;
}) => {
  const [postLoad, setPostLoad] = useState<boolean>(false);
  const [files, setFiles] = useState<any>([]);

  const {
    register,
    clearErrors,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryRequest>({
    resolver: yupResolver(schema),
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const onSubmit: SubmitHandler<CreateCategoryRequest> = async (data) => {
    if (files.length > 0) {
      setPostLoad(true);
      try {
        const { data: cat } = await axiosInstance.post("/category/create", {
          data,
          select: { id: true },
        });
        const formData = new FormData();
        Object.values(files).map((file: any) => {
          formData.append("files", file);
          return null;
        });
        await axiosInstance.post(
          `/upload/images?model=category&id=${cat.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("İşlem Başarılı");
        setRows();
      } catch (error) {
        toast.error("Hata");
      } finally {
        setPostLoad(false);
      }
    } else {
      toast.error("Lütfen Görsel Ekleyiniz");
    }
  };

  useEffect(() => {
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return categories ? (
    <>
      <PageHeader className="pl-4" title={"Kategori Oluştur"} />
      <div className="p-4">
        <form
          className="grid grid-cols-1 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            props={{ ...register("title"), placeholder: "Örn. Altin Kolye" }}
            error={errors.title?.message}
            label="Kategori Adı"
          />

          <Input
            props={{ ...register("slug"), placeholder: "Örn. altin-kolye" }}
            error={errors.slug?.message}
            label="Slug"
          />

          <Select
            label="Üst Kategori"
            clearError={() => clearErrors("parent_id")}
            value={() => {
              return watch("parent_id");
            }}
            setValue={(val) => setValue("parent_id", val)}
            inputProps={{
              ...register("parent_id"),
            }}
            options={categories.map((el) => {
              return {
                id: el.id,
                value: el.id,
                label: el.title,
              };
            })}
            error={errors.parent_id?.message}
          />

          <div className="w-full">
            <div
              className="border cursor-pointer border-slate-400 p-6 rounded overflow-hidden"
              {...getRootProps()}
            >
              <input {...getInputProps()} />

              <p className="text-sm text-slate-800">Görsel Seçiniz (1 Adet)</p>
            </div>
            {files.length > 0 && (
              <div className="flex items-center space-x-3 mt-2">
                {files.map((file: any) => (
                  <div
                    className="w-20 h-20 border border-slate-400 rounded overflow-hidden"
                    key={file.name}
                  >
                    <img
                      src={file.preview}
                      alt=""
                      className="w-full h-full object-cover"
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

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
  ) : null;
};
export default CreateCategory;
