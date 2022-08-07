/* eslint-disable @next/next/no-img-element */
import { FC, ReactElement, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "src/components/Button";
import Input from "src/components/FormElements/Input";
import Label from "src/components/FormElements/Label";
import Select from "src/components/FormElements/Select";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";
import axiosInstance from "src/utils/axiosInstance";
import * as yup from "yup";
import Default from "src/components/Layout/Default";
import { useRouter } from "next/router";
import useCategories from "src/hooks/api/categories/useCategories";

interface CreateCategoryRequest {
  title: string;
  slug: string;
  parentId: string;
}

const schema = yup
  .object()
  .shape({
    title: yup.string().required("Bu Alan Zorunludur."),
    slug: yup.string().required("Bu Alan Zorunludur."),
    parent_id: yup.string().notRequired().nullable(),
  })
  .required();
const CreateCategory = () => {
  const [postLoad, setPostLoad] = useState<boolean>(false);

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
  const router = useRouter();
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
      } catch (error) {
        toast.error("Hata");
      } finally {
        setPostLoad(false);
      }
    } else {
      toast.error("Lütfen Görsel Ekleyiniz");
    }
  };
  const [files, setFiles] = useState<any>([]);

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

  useEffect(() => {
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);
  const { data: categories, isError } = useCategories();
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <PageHeader title={"Kategori Oluştur"} />
      {categories ? (
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

          <div className="w-full flex flex-col">
            <Label className="mb-0.5" htmlFor="parentId">
              Üst Kategori
            </Label>
            <Select
              clearError={() => clearErrors("parentId")}
              value={() => {
                return watch("parentId");
              }}
              setValue={(val) => setValue("parentId", val)}
              inputProps={{
                ...register("parentId"),
              }}
              options={categories.map((el: any) => {
                return {
                  id: el.id,
                  value: el.id,
                  label: el.title,
                };
              })}
              error={errors.parentId?.message}
            />
          </div>

          <div className="w-full">
            <div
              className="border border-slate-400 p-6 rounded overflow-hidden"
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
              className="font-medium text-white bg-brand-green"
            >
              Oluştur
            </Button>
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default CreateCategory;

CreateCategory.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
