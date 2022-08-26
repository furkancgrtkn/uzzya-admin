/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "src/components/FormElements/Input";
import { MultipleSelect, Select } from "src/components/FormElements/Select";
import FormFooter from "src/components/FormFooter";
import FormHeader from "src/components/FormHeader";
import { AttributeTypeType } from "src/hooks/api/attributes/types";
import { Category } from "src/hooks/api/category/types";
import axiosInstance from "src/utils/axiosInstance";
import * as yup from "yup";

interface UpsertCategoryRequest {
  title: string;
  slug: string;
  parent_id: string;
  filters: string[];
}

const schema = yup
  .object()
  .shape({
    title: yup.string().required("Bu Alan Zorunludur."),
    slug: yup.string().required("Bu Alan Zorunludur."),
    parent_id: yup.string().notRequired().nullable(),
    filters: yup
      .array()
      .of(yup.string())
      .min(1, "En az bir adet özellik seçmelisiniz.")
      .required("Bu Alan Zorunludur."),
  })
  .required();
const UpsertCategory = ({
  categories,
  onSuccess,
  category,
  onCancel,
  attributeTypes,
}: {
  categories: Category[] | undefined;
  onSuccess: () => void;
  onCancel?: () => void;
  attributeTypes: AttributeTypeType[];
  category: Category | undefined;
}) => {
  const [postLoad, setPostLoad] = useState<boolean>(false);
  const [files, setFiles] = useState<any>([]);
  const [currentImage, setCurrentImage] = useState<string | undefined>();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpsertCategoryRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      filters: [],
    },
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

  const onSubmit: SubmitHandler<UpsertCategoryRequest> = async (data) => {
    setPostLoad(true);
    try {
      const { data: cat } = await axiosInstance.post("/category/upsert", {
        create: {
          ...data,
          filters: {
            create: data.filters.map((e) => {
              return { attribute_type: { connect: { id: e } } };
            }),
          },
        },
        update: {
          ...data,
          image: currentImage,
          filters: {
            deleteMany: {},
            create: data.filters.map((e) => {
              return { attribute_type: { connect: { id: e } } };
            }),
          },
        },
        where: { id: category?.id || "" },
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
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Hata");
    } finally {
      setPostLoad(false);
    }
  };

  useEffect(() => {
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    if (category) {
      setValue("title", category.title);
      setValue("parent_id", category.parent?.id);
      setValue("slug", category.slug);
      setCurrentImage(category.image);
      setValue(
        "filters",
        category.filters.map((attr) => attr.attribute_type.id)
      );
    }
  }, [category, setValue]);

  return categories ? (
    <form className="flex flex-col h-full" onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        title={category ? "Kategoriyi Güncelle" : "Yeni Kategori Oluştur"}
      />
      <div className="grid grid-cols-2 gap-4 p-4">
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

        <Controller
          control={control}
          name="parent_id"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select
              label="Üst Kategori"
              onChange={(e) => {
                onChange(e);
              }}
              selected={value}
              options={categories.map((el) => {
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

        <Controller
          control={control}
          name="filters"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <MultipleSelect
              label="Filtreler"
              onChange={(e) => {
                if (typeof e === "string") {
                  if (value.includes(e)) {
                    onChange(value.filter((el) => el !== e));
                  } else {
                    onChange([...value, e]);
                  }
                } else {
                  onChange(e);
                }
              }}
              selecteds={value}
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
        <div className="w-full col-span-2">
          {currentImage && (
            <div className="mb-2">
              <img
                className="min-w-[96px] border border-brand-black-secondaryLight rounded overflow-hidden w-24 h-24 object-cover"
                src={`${process.env.NEXT_APP_API_URL}/${currentImage}`}
                alt=""
              />
            </div>
          )}
          <div
            className="border cursor-pointer border-brand-black-secondaryLight p-6 rounded overflow-hidden"
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            <p className="text-sm text-brand-black-primary">
              Görsel Seçiniz (1 Adet)
            </p>
          </div>
          {files.length > 0 && (
            <div className="flex items-center space-x-3 mt-2">
              {files.map((file: any) => (
                <div
                  className="w-20 h-20 border border-brand-black-secondaryLight rounded overflow-hidden"
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
      </div>
      <FormFooter
        onCancel={() => {
          if (onCancel) onCancel();
        }}
        loading={postLoad}
      />
    </form>
  ) : null;
};
export default UpsertCategory;
