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
import useCategory from "src/hooks/api/categories/useCategory";

interface UpdateCategoryRequest {
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
const UpdateCategory = () => {
  const [postLoad, setPostLoad] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string | undefined>();

  const {
    register,
    clearErrors,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCategoryRequest>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<UpdateCategoryRequest> = async (data) => {
    setPostLoad(true);
    try {
      const { data: cat } = await axiosInstance.post("/category/update", {
        data: {
          ...data,
          image: currentImage,
        },
        where: { id: category?.id },
        select: { id: true },
      });
      if (files.length > 0) {
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
      }
      toast.success("İşlem Başarılı");
      router.replace("/categories");
    } catch (error) {
      toast.error("Hata");
    } finally {
      setPostLoad(false);
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
  const { data: category, isError: categoryError } = useCategory(
    router.query.id as string
  );

  useEffect(() => {
    if (category) {
      setValue("title", category.title);
      setValue("parent_id", category.parent?.id);
      setValue("slug", category.slug);
      setCurrentImage(category.image);
    }
  }, [category, setValue]);

  if (isError || categoryError) {
    return <div>Error</div>;
  }
  return (
    <>
      <PageHeader className="pl-4" title={"Kategori Oluştur"} />
      <div className="p-4">
        {categories && category ? (
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
              options={categories
                .filter((el) => el.id !== category.id)
                .map((el: any) => {
                  return {
                    id: el.id,
                    value: el.id,
                    label: el.title,
                  };
                })}
              error={errors.parent_id?.message}
            />

            <div className="w-full flex">
              <div className="mr-2">
                <img
                  className="min-w-[96px] border border-slate-400 rounded overflow-hidden w-24 h-24 object-cover"
                  src={`${process.env.NEXT_APP_API_URL}/${currentImage}`}
                  alt=""
                />
              </div>
              <div
                className="border w-full cursor-pointer border-slate-400 p-6 rounded overflow-hidden"
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                <p className="text-sm text-slate-800">
                  Görsel Seçiniz (1 Adet)
                </p>
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
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};
export default UpdateCategory;

UpdateCategory.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
