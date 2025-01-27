import uploadIcon from "@/icons/Property_2_Uploaded-file_sxo5a6.svg";
import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/utils/utils";

import "react-quill/dist/quill.snow.css"; // Import Quill styles

import { InfoIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import CustomButton from "./common-button/common-button";

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  options = [],
  className = "",
}: FormFieldProperties) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          if (type === "textarea") {
            return (
              <Textarea
                {...field}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(error && "border-destructive", className)}
              />
            );
          }

          if (type === "select") {
            return (
              <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
                <SelectTrigger className={cn(error && "border-destructive", className)}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }

          return (
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(error && "border-destructive", className)}
            />
          );
        }}
      />

      {error && <p className="text-sm text-destructive">{error.message?.toString()}</p>}
    </div>
  );
}

export function RadioCardGroup({
  label,
  name,
  options,
  required = false,
  disabled = false,
  className = "",
}: RadioCardGroupProperties) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className="space-y-4">
      {label && (
        <Label className="font-semibold">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      )}

      <div className="flex flex-col gap-4 lg:flex-row">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              {options.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex w-full cursor-pointer items-start rounded-lg border p-4 transition-colors",
                    field.value === option.value
                      ? "border-none bg-low-purple shadow-[2px_2px_0px_0.5px_#6D5DD3]"
                      : "border-low-grey-III hover:border-primary/50",
                    disabled && "cursor-not-allowed opacity-50",
                    className,
                  )}
                >
                  <input
                    type="radio"
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                    disabled={disabled}
                    className="sr-only" // Hide the default radio input
                  />
                  <div className="flex flex-col space-y-1">
                    {option.icon && <Image src={option.icon} alt={`ico`} width={52} height={52} />}
                    <span className="text-sm font-bold">{option.label}</span>
                    {option.description && <span className="text-xs text-mid-grey-II">{option.description}</span>}
                  </div>
                </label>
              ))}
            </>
          )}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error.message?.toString()}</p>}
    </div>
  );
}

export function RichTextEditor({
  label = "Description",
  name,
  placeholder = "Enter description of your product",
  required = false,
  disabled = false,
  className = "",
}: RichTextEditorProperties) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  // Define toolbar options for the rich text editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactQuill
            {...field}
            theme="snow" // Use the "snow" theme for a clean UI
            modules={modules} // Add toolbar options
            placeholder={placeholder}
            readOnly={disabled}
            className={cn(error && "border-destructive", className)}
          />
        )}
      />

      {error && <p className="text-sm text-destructive">{error.message?.toString()}</p>}
    </div>
  );
}

export function ImageUpload({
  label = "Cover photo",
  name,
  required = false,
  disabled = false,
  className = "",
  maxFiles = 4,
  acceptedFormats = { "image/jpeg": [], "image/png": [] },
}: ImageUploadProperties) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
      setPreviews((previousPreviews) => [...previousPreviews, ...newPreviews].slice(0, maxFiles));
    },
    [maxFiles],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFormats,
    maxFiles,
    disabled,
  });

  return (
    <div className="space-y-2">
      {label && (
        <section className="flex flex-col justify-between lg:flex-row lg:items-center">
          <div className="">
            <Label className="text-sm font-medium">
              {label}
              {required && <span className="ml-1 text-destructive">*</span>}
            </Label>
            <p className="text-xs text-mid-grey-II">
              Upload the photos to promote your product, a maximum of 4 photos. Images should be horizontal, at least
              1280x720px, and 72 DPI (dots per inch)
            </p>
          </div>
          {previews.length > 0 && (
            <div {...getRootProps()}>
              <CustomButton
                variant={`outline`}
                className={`border-primary text-primary`}
                isLeftIconVisible
                icon={<Image src={uploadIcon} alt="upload" width={16} height={16} />}
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                Add Photos
              </CustomButton>
            </div>
          )}
        </section>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <div
              {...getRootProps()}
              className={cn(
                "flex cursor-pointer flex-wrap gap-4 rounded-lg",
                error && "border-destructive",
                disabled && "cursor-not-allowed opacity-50",
                className,
              )}
            >
              <input {...field} {...getInputProps()} />

              {previews.length === 0 && (
                <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2 border bg-low-purple">
                  <div>
                    <CustomButton
                      variant={`outline`}
                      className={`border-primary text-primary`}
                      isLeftIconVisible
                      icon={<Image src={uploadIcon} alt="upload" width={16} height={16} />}
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Add Photos
                    </CustomButton>
                  </div>
                  <div className="flex items-center gap-1 text-mid-grey-II">
                    <InfoIcon className="h-4 w-4" />
                    <span className="text-xs font-semibold"> Upload images various formats (jpg, png)</span>
                  </div>
                </div>
              )}
              {previews.map((preview, index) => (
                <div key={index} className="relative h-[200px] w-[368px]">
                  <Image src={preview} alt={`Preview ${index + 1}`} fill className={cn("rounded-lg object-cover")} />
                </div>
              ))}
            </div>
          </div>
        )}
      />

      {error && <p className="text-sm text-destructive">{error.message?.toString()}</p>}
    </div>
  );
}
