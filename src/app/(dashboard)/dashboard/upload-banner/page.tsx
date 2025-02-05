/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import blankImage from "@/assets/blankImge.svg";
import { Button } from "@/components/ui/button";
import image from "@/assets/images/image (13).png";
import { XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUploadFileMutation } from "@/redux/api/bannerApi";
import { toast } from "sonner";

// Dummy previous banners

// Define Zod schema for validation
const bannerSchema = z.object({
  data: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    section: z.string().min(3, "Title must be at least 3 characters long"),
    type: z.string().min(3, "Title must be at least 3 characters long"),

  }),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
});

// Define TypeScript types for the form
type BannerFormData = z.infer<typeof bannerSchema>;

const UploadBanner = () => {
  const [files, setFiles] = useState<File[]>([]);

  // Initialize form with React Hook Form and Zod validation
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BannerFormData>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      data: {
        title: "",
        section: "hero",
        type: "IMAGE",

      },
      images: [],
    },
  });

  // Handle file selection
  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setValue("images", [...files, ...acceptedFiles]); // Update form state
  };

  // Configure the dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  // Handle removing an image
  const handleRemoved = (e: any, index: number) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setValue(
      "images",
      files.filter((_, i) => i !== index)
    ); // Update form state
  };

  // Handle form submission
    const [uploadFile] = useUploadFileMutation()
  
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: BannerFormData) => {
    console.log("Form Submitted", data);
    let formData = new FormData()
    formData.append("data", JSON.stringify(data.data))

    data.images.forEach((file) => {
      formData.append("image", file)
    });
    for (const [key, value] of formData.entries()) {
      if (key === "data") {
        console.log(`${key}:`, JSON.parse(value as string));

      } else {
        console.log(`${key}:`, value);

      }
    }
      try {
        setIsLoading(true)
        const res = await uploadFile(formData)
        // console.log("Response new is ", res);

        if (res.data.success === true) {
          console.log("Response is", res);
          toast.success("Upload file successfully");
          formData = new FormData()
          setFiles([])
        } else {
          toast.error("File cannot upload. Try again");
        }
      } catch (error) {
        console.error("Error during file upload:", error);
        toast.error("An unexpected error occurred.");
      } finally {
        setIsLoading(false)
      }
  
  };

  return (
    <div>
      <div className="container py-12 p-6">
        <div className="my-5">
          {/* <h3 className="mb-8 text-center text-2xl sm:text-2xl md:text-3xl font-bold">
            Previous Banners
          </h3> */}
          <div className="flex flex-wrap justify-center gap-4 my-12">
            {
              files.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4">
                  {files.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -top-6 right-1/2 translate-x-1/2">
                        <XIcon
                          color="red"
                          className="cursor-pointer"
                          onClick={(e) => handleRemoved(e, index)}
                        />
                      </div>
                      <Image
                        src={URL.createObjectURL(file)}
                        width={100}
                        height={100}
                        alt={`uploaded-${index}`}
                        className="mx-auto w-32 h-32 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </div>

        {/* Upload Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-6 max-w-3xl mx-auto"
        >
          <h3 className="mb-8 text-center text-2xl sm:text-2xl md:text-3xl font-bold">
            Select Banners
          </h3>
          <Label htmlFor="banner-title" className="text-lg font-semibold -mb-3">
            Banner title
          </Label>
          <Input
            type="text"
            id="banner-title"
            placeholder="Enter Banner Title"
            {...register("data.title")}
            className="w-full border p-2 text-black"
          />
          {errors.data?.title && (
            <p className="text-red-500 text-sm">{errors.data?.title.message}</p>
          )}

          {/* Drag and Drop Section */}
          <div
            {...getRootProps()}
            className="border-dashed border-2 py-12 md:py-20 lg:py-28 rounded-sm border-gray-300 p-6 text-center cursor-pointer"
          >
            <input {...getInputProps()} />

            <div>
              <div className="mt-4">
                <Image
                  src={blankImage}
                  alt="uploaded"
                  width={60}
                  height={60}
                  className="mx-auto w-20 h-20"
                />
                <p className="text-center text-bg_primary">
                  Drag & drop files here
                </p>
              </div>
            </div>

          </div>

          {/* Show validation error for images */}
          {errors.images && (
            <p className="text-red-500 text-sm text-center">
              {errors.images.message}
            </p>
          )}

          {/* Submit Button */}
          <div className="flex justify-center gap-8 flex-wrap mt-5">
            <Button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-6 w-full text-white border hover:border-bg_primary rounded text-lg bg-bg_primary 
    ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:text-bg_primary hover:bg-transparent border-[#2C3E50] duration-300"}`}
            >
              {isLoading ? "Uploading..." : "Upload Styles"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBanner;
