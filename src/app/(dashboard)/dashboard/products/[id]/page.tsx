"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader, Plus, Trash2, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { useParams } from "next/navigation";
import {
  UpdateProductFormData,
  updateProductSchema,
} from "@/components/dashboard/types/updateScema";
import { toast } from "sonner";

const ENGRAVING_TYPES = [
  { id: "Text", label: "Text" },
  { id: "Image", label: "Image" },
  { id: "Coordinates", label: "Coordinates" },
];

const ENGRAVING_FONTS = [
  { id: "Poppies", label: "Poppies" },
  { id: "Lato", label: "Lato" },
  { id: "Monserrate", label: "Monserrate" },
  { id: "Roboto", label: "Roboto" },
];

export default function ProductForm() {
  // get params
  const { id } = useParams();
  // console.log(id);
  const [colorInputs, setColorInputs] = useState<
    { hex: string; name: string }[]
  >([{ hex: "", name: "" }]);

  // get all category
  const { data, isLoading } = useGetAllCategoriesQuery({});
  // console.log(data?.data?.data, "cateory data");

  //   get product by id
  const { data: productData } = useGetProductByIdQuery(id as string);
  const product = productData?.data;
  //   console.log(product);

  // create product
  const [updateProduct, { isLoading: productLoading }] =
    useUpdateProductMutation();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
  });

  useEffect(() => {
    reset({
      title: product?.title,
      price: product?.price,
      discount: product?.discount,
      categoryId: product?.categoryId,
      customizable: product?.customizable,
      engravingType: product?.engravingType,
      engravingFont: product?.engravingFont,
      descriptions: product?.descriptions,
      sizeAndMaterials: product?.sizeAndMaterials,
      shipping: product?.shipping,
      stocks: product?.stocks || 0,
      images: [],
      isFeatured: product?.isFeatured || false,
    });
  }, [product, reset]);

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({
    control,
    name: "faq",
  });

  const isCustomizable = watch("customizable");
  const watchEngravingType = watch("engravingType");
  const watchEngravingFont = watch("engravingFont");
  const watchImages = watch("images");

  useEffect(() => {
    if (product) {
      setColorInputs(
        product.colors.map((color: any) => ({
          hex: color.hexaCode,
          name: color.title,
        }))
      );
      setValue(
        "faq",
        product.faq.map((item: any) => ({
          question: item.question,
          answer: item.answer,
        }))
      );
      setValue("images", product.images);
    }
  }, [product, setValue]);

  const addColorInput = () => {
    setColorInputs([...colorInputs, { hex: "", name: "" }]);
  };

  const removeColorInput = (index: number) => {
    setColorInputs(colorInputs.filter((_, i) => i !== index));
  };

  // submit
  const onSubmit = async (data: any) => {
    const newData = {
      ...data,
      colors: colorInputs.map((color) => ({
        hexaCode: color.hex,
        title: color.name,
      })),
    };
    console.log(newData, data);
    const formData = new FormData();
    formData.append("data", JSON.stringify(newData));

    if (Array.isArray(newData.images)) {
      if (newData.images.every((img: any) => img instanceof File)) {
        newData.images.forEach((file: any) => {
          formData.append("image", file);
        });
      }
    }
    try {
      const res = await updateProduct({ productId: id, payload: formData });
      // console.log(res);
      toast.success("Product get successfully")
    } catch (error) {
      console.log(error);
    }

    // Here you would typically call your API to create or update the product
    // For example:
    // if (id) {
    //   await updateProduct(id, newData);
    // } else {
    //   await createProduct(newData);
    // }
  };

  const handleEngravingTypeChange = (checked: boolean, value: string) => {
    const currentTypes = watchEngravingType || [];
    if (checked) {
      setValue("engravingType", [...currentTypes, value]);
    } else {
      setValue(
        "engravingType",
        currentTypes.filter((type: any) => type !== value)
      );
    }
  };

  const handleEngravingFontChange = (checked: boolean, value: string) => {
    const currentFonts = watchEngravingFont || [];
    if (checked) {
      setValue("engravingFont", [...currentFonts, value]);
    } else {
      setValue(
        "engravingFont",
        currentFonts.filter((font: any) => font !== value)
      );
    }
  };

  const checkAttachment = useCallback((file: File) => {
    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      return {
        code: "not-image",
        message: "File is not an image",
      };
    }
    // Check if the file size is less than 5MB
    if (file.size > 5 * 1024 * 1024) {
      return {
        code: "file-too-large",
        message: "File is larger than 5MB",
      };
    }
    return null;
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue("images", acceptedFiles);
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
    multiple: true,
    validator: checkAttachment,
  });
  const removeImage = () => {
    setValue("images", []);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto ">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Product Name</Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                className="bg-transparent border-gray-200"
                defaultValue={product?.title}
                required
                id="title"
                {...field}
              />
            )}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price</Label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  className="bg-transparent border-gray-200"
                  defaultValue={product?.price}
                  id="price"
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseFloat(e.target.value))
                  }
                />
              )}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="discount">Discount Percentage</Label>
            <Controller
              name="discount"
              control={control}
              render={({ field }) => (
                <Input
                  className="bg-transparent border-gray-200"
                  defaultValue={product?.discount}
                  id="discount"
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseFloat(e.target.value))
                  }
                />
              )}
            />
            {errors.discount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discount.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="categoryId">Product Category</Label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select
                defaultValue={product?.categoryId}
                onValueChange={field.onChange}
                value={field.value || product?.categoryId}
              >
                <SelectTrigger className="bg-transparent border-gray-200">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {data?.data?.data?.map(
                    (category: { id: string; title: string }) => (
                      <SelectItem value={category?.id}>
                        {category?.title}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            name="customizable"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value || product?.customizable}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (!checked) {
                    setValue("engravingType", []);
                    setValue("engravingFont", []);
                  }
                }}
              />
            )}
          />
          <Label>Customizable Product</Label>
        </div>

        {true && (
          <div className="space-y-6 p-4 border border-gray-200 rounded-lg">
            <div className="space-y-4">
              <Label className="text-base font-medium">Engraving Types</Label>
              <div className="grid grid-cols-2 gap-4">
                {ENGRAVING_TYPES.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`engraving-type-${type.id.toLowerCase()}`}
                      checked={watchEngravingType?.includes(type.id)}
                      onCheckedChange={(checked) =>
                        handleEngravingTypeChange(checked as boolean, type.id)
                      }
                    />
                    <Label htmlFor={`engraving-type-${type.id.toLowerCase()}`}>
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-base font-medium">Engraving Fonts</Label>
              <div className="grid grid-cols-2 gap-4">
                {ENGRAVING_FONTS.map((font) => (
                  <div key={font.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`engraving-font-${font.id.toLowerCase()}`}
                      checked={watchEngravingFont?.includes(font.id)}
                      onCheckedChange={(checked) =>
                        handleEngravingFontChange(checked as boolean, font.id)
                      }
                    />
                    <Label htmlFor={`engraving-font-${font.id.toLowerCase()}`}>
                      {font.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label className="block mb-2">Select Finish</Label>
          {colorInputs.map((color, index) => (
            <div key={index} className="flex gap-2">
              <Input
                className="bg-transparent border-gray-200"
                type="text"
                placeholder="Color name"
                defaultValue={color.name}
                onChange={(e) => {
                  const newInputs = [...colorInputs];
                  newInputs[index].name = e.target.value;
                  setColorInputs(newInputs);
                }}
              />
              <Input
                type="color"
                defaultValue={color.hex}
                onChange={(e) => {
                  const newInputs = [...colorInputs];
                  newInputs[index].hex = e.target.value;
                  setColorInputs(newInputs);
                }}
                className="w-20 h-10 p-1 bg-transparent border-gray-200"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeColorInput(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            className="bg-transparent"
            onClick={addColorInput}
            variant="outline"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Finish
          </Button>
        </div>

        <div className="space-y-4">
          <Label>Product Image</Label>
          <div
            {...getRootProps()}
            className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-gray-200 hover:border-primary"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Drag 'n' drop an image here, or click to select a file
            </p>
            <p className="text-xs text-gray-400">
              Supports: JPG, JPEG, PNG, GIF
            </p>
          </div>
          {watchImages && watchImages.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {watchImages.map((file: any, index: number) => (
                <div key={index} className="relative group">
                  <img
                    src={
                      typeof file === "string"
                        ? file
                        : URL.createObjectURL(file)
                    }
                    alt={`Uploaded product image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      const newImages = [...watchImages];
                      newImages.splice(index, 1);
                      setValue("images", newImages);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="descriptions">Description</Label>
          <Controller
            name="descriptions"
            control={control}
            render={({ field }) => (
              <Textarea
                className="bg-transparent border-gray-200"
                id="descriptions"
                defaultValue={product?.descriptions}
                {...field}
              />
            )}
          />
          {errors.descriptions && (
            <p className="text-red-500 text-sm mt-1">
              {errors.descriptions.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="sizeAndMaterials">Size & Materials</Label>
          <Controller
            name="sizeAndMaterials"
            control={control}
            render={({ field }) => (
              <Textarea
                className="bg-transparent border-gray-200"
                defaultValue={product?.sizeAndMaterials}
                id="sizeAndMaterials"
                {...field}
              />
            )}
          />
          {errors.sizeAndMaterials && (
            <p className="text-red-500 text-sm mt-1">
              {errors.sizeAndMaterials.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="shipping">Shipping</Label>
          <Controller
            name="shipping"
            control={control}
            render={({ field }) => (
              <Textarea
                className="bg-transparent border-gray-200"
                defaultValue={product?.shipping}
                id="shipping"
                {...field}
              />
            )}
          />
          {errors.shipping && (
            <p className="text-red-500 text-sm mt-1">
              {errors.shipping.message}
            </p>
          )}
        </div>
        {/* stocks */}
        <div>
          <Label htmlFor="stocks">stocks</Label>
          <Controller
            name="stocks"
            control={control}
            render={({ field }) => (
              <Input
                className="bg-transparent border-gray-200"
                defaultValue={product?.stocks}
                id="stocks"
                type="number"
                {...field}
                onChange={(e) =>
                  field.onChange(Number.parseFloat(e.target.value))
                }
              />
            )}
          />
          {errors.stocks && (
            <p className="text-red-500 text-sm mt-1">{errors.stocks.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>FAQ</Label>
            <Button
              type="button"
              className="bg-transparent"
              onClick={() => appendFaq({ question: "", answer: "" })}
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" /> Add FAQ
            </Button>
          </div>
          {faqFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <Controller
                name={`faq.${index}.question`}
                control={control}
                render={({ field }) => (
                  <Input
                    className="bg-transparent border-gray-200"
                    placeholder="Question"
                    defaultValue={field.value}
                    {...field}
                  />
                )}
              />
              {errors.faq?.[index]?.question && (
                <p className="text-red-500 text-sm">
                  {errors.faq[index]?.question?.message}
                </p>
              )}
              <Controller
                name={`faq.${index}.answer`}
                control={control}
                render={({ field }) => (
                  <Textarea
                    className="bg-transparent border-gray-200"
                    placeholder="Answer"
                    defaultValue={field.value}
                    {...field}
                  />
                )}
              />
              {errors.faq?.[index]?.answer && (
                <p className="text-red-500 text-sm">
                  {errors.faq[index]?.answer?.message}
                </p>
              )}
              <Button
                type="button"
                onClick={() => removeFaq(index)}
                variant="destructive"
                size="sm"
              >
                Remove FAQ
              </Button>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            name="isFeatured"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <Label>Featured Product</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          className="bg-transparent"
          variant="outline"
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button disabled={productLoading} onClick={handleSubmit(onSubmit)}>
          {productLoading && <Loader />} Post
        </Button>
      </div>
    </div>
  );
}
