/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import Button from "src/components/Button";
import Input from "src/components/FormElements/Input";
import { MultipleSelect, Select } from "src/components/FormElements/Select";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";
import useAttributes from "src/hooks/api/attributes/useAttributes";
import useCategories from "src/hooks/api/category/useCategories";
import { ProductType } from "src/hooks/api/products/types";
import useProducts from "src/hooks/api/products/useProducts";
import axiosInstance from "src/utils/axiosInstance";

interface CreateEditProductRequest {
  slug: string;
  title: string;
  parent_id: string;
  description: string;
  short_description: string;
  barcode: string;
  brand: string;
  stock: number;
  images: string[];
  thumbnail: string;
  price: number;
  discounted_price: number;
  discount_rate: number;
  category_id: string;
  attributes: string[];
}

const schema = yup
  .object()
  .shape({
    title: yup.string().required("Bu Alan Zorunludur."),
    slug: yup.string().required("Bu Alan Zorunludur."),
    description: yup.string().required("Bu Alan Zorunludur."),
    short_description: yup.string().required("Bu Alan Zorunludur."),
    brand: yup.string().required("Bu Alan Zorunludur."),
    barcode: yup.string().required("Bu Alan Zorunludur."),
    stock: yup.number().required("Bu Alan Zorunludur."),
    price: yup.number().required("Bu Alan Zorunludur."),
    discounted_price: yup.number().required("Bu Alan Zorunludur."),
    discount_rate: yup.number().required("Bu Alan Zorunludur."),
    category_id: yup.string().required("Bu Alan Zorunludur."),
    attributes: yup
      .array()
      .of(yup.string())
      .min(1, "En az bir adet özellik seçmelisiniz.")
      .required("Bu Alan Zorunludur."),
    parent_id: yup.string().notRequired().nullable(),
  })
  .required();
const CreateEditProduct = ({
  setRows,
  product,
}: {
  setRows: () => void;
  product?: ProductType;
}) => {
  const [postLoad, setPostLoad] = useState<boolean>(false);
  const [files, setFiles] = useState<any>([]);
  const [currentImages, setCurrentImages] = useState<string[] | undefined>();
  const [currentThumbnail, setCurrentThumnail] = useState<string | undefined>();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateEditProductRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      attributes: [],
    },
  });

  const { data: categories } = useCategories();
  const { data: attributes } = useAttributes();
  const { data: products } = useProducts();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 10,
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

  const onSubmit: SubmitHandler<CreateEditProductRequest> = async (data) => {
    setPostLoad(true);
    try {
      if (product) {
        const { data: cat } = await axiosInstance.post("/product/update", {
          data: {
            ...data,
            images: currentImages,
            thumbnail: currentThumbnail,
          },
          where: { id: product?.id },
          select: { id: true },
        });
        if (files.length > 0) {
          const formData = new FormData();
          Object.values(files).map((file: any) => {
            formData.append("files", file);
            return null;
          });
          await axiosInstance.post(
            `/upload/images?model=product&id=${cat.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
      } else {
        if (files.length > 0) {
          const { data: prod } = await axiosInstance.post("/product/create", {
            data,
            select: { id: true },
          });
          const formData = new FormData();
          Object.values(files).map((file: any) => {
            formData.append("files", file);
            return null;
          });
          await axiosInstance.post(
            `/upload/images?model=product&id=${prod.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          toast.error("Lütfen Görsel Ekleyiniz");
          return;
        }
      }
      toast.success("İşlem Başarılı");
      setRows();
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
    if (product) {
      setValue("title", product.title);
      setValue("parent_id", product.parent_id);
      setValue("slug", product.slug);
      setValue("description", product.description);
      setValue("short_description", product.short_description);
      setValue("barcode", product.barcode);
      setValue("brand", product.brand);
      setValue("stock", product.stock);
      setValue("price", product.price);
      setValue("discounted_price", product.discounted_price);
      setValue("discount_rate", product.discount_rate);
      setValue("category_id", product.category.id);
      setValue(
        "attributes",
        product.attributes.map((attr) => attr.attribute.id)
      );

      setCurrentImages(product.images);
      setCurrentThumnail(product.thumbnail);
    }
  }, [product, setValue]);

  return attributes && categories && products ? (
    <>
      <PageHeader className="pl-4" title={"Ürün Oluştur"} />
      <div className="p-4">
        <form
          className="grid grid-cols-1 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <>
            <fieldset className="grid grid-cols-2 gap-4">
              <Input
                props={{
                  ...register("title"),
                  placeholder: "Örn. Altin Kolye",
                }}
                error={errors.title?.message}
                label="Ürün Adı"
              />

              <Input
                props={{ ...register("slug"), placeholder: "Örn. altin-kolye" }}
                error={errors.slug?.message}
                label="Slug"
              />
            </fieldset>

            <Input
              props={{
                ...register("description"),
                placeholder: "Örn. altin-kolye",
              }}
              error={errors.description?.message}
              label="Açıklama"
            />

            <Input
              props={{
                ...register("short_description"),
                placeholder: "Örn. altin-kolye",
              }}
              error={errors.short_description?.message}
              label="Kısa Açıklama"
            />

            <fieldset className="grid grid-cols-2 gap-4">
              <Input
                props={{
                  ...register("barcode"),
                  placeholder: "Örn. altin-kolye",
                }}
                error={errors.barcode?.message}
                label="Barkod"
              />

              <Input
                props={{
                  ...register("brand"),
                  placeholder: "Örn. altin-kolye",
                }}
                error={errors.brand?.message}
                label="Marka"
              />
            </fieldset>

            <fieldset className="grid grid-cols-2 gap-4">
              <Input
                props={{
                  ...register("stock"),
                  placeholder: "Örn. altin-kolye",
                }}
                error={errors.stock?.message}
                label="Stok"
              />

              <Input
                props={{
                  ...register("price"),
                  placeholder: "Örn. altin-kolye",
                }}
                error={errors.price?.message}
                label="İndirimsiz Fiyat"
              />
            </fieldset>

            <fieldset className="grid grid-cols-2 gap-4">
              <Input
                props={{
                  ...register("discounted_price"),
                  placeholder: "Örn. altin-kolye",
                }}
                error={errors.discounted_price?.message}
                label="İndirimli Fiyat"
              />

              <Input
                props={{
                  ...register("discount_rate"),
                  placeholder: "Örn. altin-kolye",
                }}
                error={errors.discount_rate?.message}
                label="İndirimli Oranı"
              />
            </fieldset>

            <Controller
              control={control}
              name="parent_id"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Select
                  label="Ana Ürün"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  selected={value}
                  disabled={!products}
                  options={
                    products?.map((el) => {
                      return {
                        value: el.id,
                        label: el.title,
                        filterValue: el.title,
                      };
                    })!
                  }
                  error={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="category_id"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Select
                  label="Kategori"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  selected={value}
                  disabled={!categories}
                  options={
                    categories?.map((el) => {
                      return {
                        value: el.id,
                        label: el.title,
                        filterValue: el.title,
                      };
                    })!
                  }
                  error={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="attributes"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <MultipleSelect
                  label="Özellikler"
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
                  options={
                    attributes.map((el) => {
                      return {
                        value: el.id,
                        label: (
                          <span>
                            {el.value}{" "}
                            <span className="text-xs opacity-50">
                              {el.attribute_type.title}
                            </span>{" "}
                          </span>
                        ),
                        filterValue: el.value,
                      };
                    })!
                  }
                  error={error?.message}
                />
              )}
            />
            {console.log(errors)}
            <div className="flex flex-col w-full">
              {currentImages && currentThumbnail && (
                <div className="flex overflow-x-auto items-center space-x-3 mb-2">
                  {currentImages?.map((dt) => (
                    <div key={dt} className="flex flex-col">
                      <button
                        onClick={() => {
                          if (dt !== currentThumbnail) {
                            setCurrentImages(
                              currentImages.filter((el) => el !== dt)
                            );
                          }
                        }}
                        disabled={dt === currentThumbnail}
                        className="ml-auto mb-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <FontAwesomeIcon
                          className="w-3 h-3 text-slate-800"
                          icon={faClose}
                        />
                      </button>
                      <img
                        className="min-w-[96px] border border-slate-400 rounded overflow-hidden w-24 h-24 object-cover"
                        src={`${process.env.NEXT_APP_API_URL}/${dt}`}
                        alt=""
                      />
                      {currentThumbnail === dt ? (
                        <span className="text-[10px] text-center mt-1.5">
                          Kapak Fotoğrafı
                        </span>
                      ) : (
                        <button
                          onClick={() => setCurrentThumnail(dt)}
                          className="text-[10px] mt-1.5"
                        >
                          Seç
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div
                className="border border-slate-400 p-6 rounded overflow-hidden"
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                <p className="text-sm text-slate-800">Görsel Seçiniz</p>
              </div>
              {files.length > 0 && (
                <div className="flex items-center space-x-3 mt-2">
                  {files.map((file: any) => (
                    <div
                      onClick={() => {
                        setFiles(files.filter((el: any) => el !== file));
                      }}
                      className="w-20 cursor-pointer h-20 border border-slate-400 rounded overflow-hidden"
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
          </>
        </form>
      </div>
    </>
  ) : (
    <Loading />
  );
};
export default CreateEditProduct;