/* eslint-disable unicorn/prefer-spread */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import fileIcon from "@/icons/Property_2_Selected-file_ybygib.svg";
import uploadIcon from "@/icons/Property_2_Uploaded-file_sxo5a6.svg";
import Image from "next/image";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/utils/utils";

import "react-quill/dist/quill.snow.css"; // Import Quill styles

import { CameraIcon, InfoIcon, PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import { MdCancel } from "react-icons/md";

import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import CustomButton from "./common-button/common-button";

interface FormFieldProperties {
  label?: string;
  name: string;
  type?: "text" | "textarea" | "select" | "number" | "password" | "email";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { value: string; label: string }[];
  className?: string;
  containerClassName?: string;
  leftAddon?: React.ReactNode; // Add left icon or button
  rightAddon?: React.ReactNode; // Add right icon or button
}

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  options = [],
  className = "",
  containerClassName,
  leftAddon,
  rightAddon,
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
          const inputClassName = cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive",
            className,
          );

          const inputWithAddons = (
            <div className={cn(`flex items-center gap-2`, containerClassName)}>
              {leftAddon && <div className="flex items-center">{leftAddon}</div>}
              {type === "textarea" ? (
                <Textarea
                  {...field}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={cn(inputClassName, "resize-y")}
                />
              ) : type === "select" ? (
                <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
                  <SelectTrigger className={cn(inputClassName, "w-full")}>
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
              ) : type === "number" ? (
                <input
                  {...field}
                  type="number"
                  placeholder={placeholder}
                  disabled={disabled}
                  className={inputClassName}
                  value={field.value || ""}
                  onChange={(event) => field.onChange(event.target.valueAsNumber)}
                />
              ) : (
                <Input
                  {...field}
                  type={type}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={inputClassName}
                />
              )}
              {rightAddon && <div className="flex items-center">{rightAddon}</div>}
            </div>
          );

          return inputWithAddons;
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

export function Highlights({
  name,
  label,
  placeholder = "Enter information",
  description = "Write key description of your product",
  addButtonText = "Add more highlight",
  maxFields = 10,
  className = "",
}: HighlightsProperties) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className={`max-w-[552px] space-y-4 ${className}`}>
      <Label className="text-sm font-medium">
        {label}
        <div className="flex items-center gap-1 text-mid-grey-II">
          <InfoIcon className="h-4 w-4" />
          <span className="text-xs font-semibold">{description}</span>
        </div>
      </Label>

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2">
          <Controller
            name={`${name}.${index}`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="h-12 flex-1 bg-low-grey-III"
              />
            )}
          />
          <CustomButton
            isIconOnly
            icon={<MdCancel className="h-4 w-4" />}
            variant="ghost"
            type="button"
            size="icon"
            onClick={() => remove(index)}
          />
        </div>
      ))}

      {fields.length < maxFields && (
        <CustomButton
          isLeftIconVisible
          size="xl"
          icon={<PlusIcon className="mr-2 h-4 w-4" />}
          type="button"
          variant="outline"
          onClick={(event) => {
            event.preventDefault();
            append("");
          }}
          className="w-full border-primary text-primary"
        >
          {addButtonText}
        </CustomButton>
      )}

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
  acceptedFormats = "image/jpeg, image/png",
  maxFileSize = 2 * 1024 * 1024, // Default to 2MB
}: ImageUploadProperties) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const fileInputReference = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    fileInputReference.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Convert FileList to an array and slice to respect maxFiles
      const newFiles = Array.from(files).slice(0, maxFiles - (field.value?.length || 0));
      // Validate file size and type
      const validFiles = newFiles.filter((file) => {
        if (file.size > maxFileSize) {
          alert(`File "${file.name}" exceeds the maximum size of ${maxFileSize / 1024 / 1024}MB.`);
          return false;
        }
        if (!acceptedFormats.includes(file.type)) {
          alert(`File "${file.name}" is not a supported format. Accepted formats: ${acceptedFormats}.`);
          return false;
        }
        return true;
      });

      // Create new previews for the valid files
      const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
      // Append new previews to the existing previews
      setPreviews((previousPreviews) => [...previousPreviews, ...newPreviews].slice(0, maxFiles));
      // Append new files to the existing files in the form state
      const updatedFiles = field.value ? [...field.value, ...validFiles] : validFiles;
      field.onChange(updatedFiles.slice(0, maxFiles)); // Ensure we don't exceed maxFiles
    }
  };

  const handleRemoveFile = (index: number, field: any) => {
    const updatedPreviews = previews.filter((_, index_) => index_ !== index);
    const updatedFiles = field.value.filter((_: any, index_: number) => index_ !== index);
    setPreviews(updatedPreviews);
    field.onChange(updatedFiles);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <section className="flex flex-col justify-between lg:flex-row lg:items-center">
          <div className="">
            <Label className="text-sm font-medium">
              {label}
              {required && <span className="ml-1 text-destructive">*</span>}
            </Label>
            <p className="text-xs text-mid-grey-II">
              Upload the photos to promote your product, a maximum of {maxFiles} photos.
            </p>
          </div>
          {previews.length > 0 && previews.length < maxFiles && (
            <CustomButton
              variant="outline"
              className="border-primary text-primary"
              isLeftIconVisible
              icon={<Image src={uploadIcon} alt="upload" width={16} height={16} />}
              type="button"
              onClick={handleButtonClick}
            >
              Add Photos
            </CustomButton>
          )}
        </section>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <div
              className={cn(
                "flex cursor-pointer flex-wrap gap-4",
                error && "border-destructive",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <input
                ref={fileInputReference}
                type="file"
                multiple
                accept={acceptedFormats}
                disabled={disabled}
                onChange={(event) => handleFileChange(event, field)}
                className="hidden"
              />

              {previews.length === 0 && (
                <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-md border bg-low-purple">
                  <CustomButton
                    variant="outline"
                    className="border-primary text-primary"
                    isLeftIconVisible
                    icon={<Image src={uploadIcon} alt="upload" width={16} height={16} />}
                    type="button"
                    onClick={handleButtonClick}
                  >
                    Add Photos
                  </CustomButton>
                  <div className="flex items-center gap-1 text-mid-grey-II">
                    <InfoIcon className="h-4 w-4" />
                    <span className="text-xs font-semibold">Upload images (jpg, png)</span>
                  </div>
                </div>
              )}

              {previews.map((preview, index) => (
                <div key={index} className="relative h-[200px] w-[368px]">
                  <Image src={preview} alt={`Preview ${index + 1}`} fill className="rounded-lg object-cover" />
                  <CustomButton
                    isIconOnly
                    icon={<MdCancel className="h-4 w-4" />}
                    variant="ghost"
                    type="button"
                    size="icon"
                    className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm"
                    onClick={(event) => {
                      event.preventDefault();
                      handleRemoveFile(index, field);
                    }}
                  />
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

export function FileUpload({
  label = "Product",
  name,
  required = false,
  disabled = false,
  className = "",
  maxFiles = 4,
  acceptedFormats = "application/pdf",
  maxFileSize = 100 * 1024 * 1024, // Default to 100MB
}: FileUploadProperties) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const fileUploadInputReference = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<{ name: string; size: number; type: string }[]>([]);

  const handleButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    fileUploadInputReference.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Convert FileList to an array and slice to respect maxFiles
      const newFiles = Array.from(files).slice(0, maxFiles - (field.value?.length || 0));
      // Validate file size and type
      const validFiles = newFiles.filter((file) => {
        if (file.size > maxFileSize) {
          alert(`File "${file.name}" exceeds the maximum size of ${maxFileSize / 1024 / 1024}MB.`);
          return false;
        }
        if (!acceptedFormats.includes(file.type)) {
          alert(`File "${file.name}" is not a supported format. Accepted formats: ${acceptedFormats}.`);
          return false;
        }
        return true;
      });

      // Create new previews for the valid files
      const newPreviews = validFiles.map((file) => ({ name: file.name, size: file.size, type: file.type }));
      // Append new previews to the existing previews
      setPreviews((previousPreviews) => [...previousPreviews, ...newPreviews].slice(0, maxFiles));
      // Append new files to the existing files in the form state
      const updatedFiles = field.value ? [...field.value, ...validFiles] : validFiles;
      field.onChange(updatedFiles.slice(0, maxFiles)); // Ensure we don't exceed maxFiles
    }
  };

  const handleRemoveFile = (index: number, field: any) => {
    const updatedPreviews = previews.filter((_, index_) => index_ !== index);
    const updatedFiles = field.value.filter((_: any, index_: number) => index_ !== index);
    setPreviews(updatedPreviews);
    field.onChange(updatedFiles);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <section className="flex flex-col justify-between lg:flex-row lg:items-center">
          <div className="">
            <Label className="text-sm font-medium">
              {label}
              {required && <span className="ml-1 text-destructive">*</span>}
            </Label>
            <p className="text-xs text-mid-grey-II">
              Upload the actual product you want to sell. Upload the product file.
            </p>
          </div>
          {previews.length > 0 && previews.length < maxFiles && (
            <CustomButton
              variant="outline"
              className="border-primary text-primary"
              isLeftIconVisible
              icon={<Image src={uploadIcon} alt="upload" width={16} height={16} />}
              type="button"
              onClick={handleButtonClick}
            >
              Upload Files
            </CustomButton>
          )}
        </section>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <div
              className={cn(
                "flex cursor-pointer flex-wrap gap-4",
                error && "border-destructive",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <input
                ref={fileUploadInputReference}
                type="file"
                multiple
                accept={acceptedFormats}
                disabled={disabled}
                onChange={(event) => handleFileChange(event, field)}
                className="hidden"
              />

              {previews.length === 0 && (
                <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-md border bg-low-purple">
                  <CustomButton
                    variant="outline"
                    className="border-primary text-primary"
                    isLeftIconVisible
                    icon={<Image src={uploadIcon} alt="upload" width={16} height={16} />}
                    type="button"
                    onClick={handleButtonClick}
                  >
                    Upload Files
                  </CustomButton>
                  <div className="flex items-center gap-1 text-mid-grey-II">
                    <InfoIcon className="h-4 w-4" />
                    <span className="text-xs font-semibold">
                      File can be an image, video, document in various formats (jpg, png, mp4, pdf etc). Min: 100MB
                    </span>
                  </div>
                </div>
              )}

              {previews.map((preview, index) => (
                <section
                  key={index}
                  className="relative flex min-h-[94px] max-w-[560px] items-center gap-4 rounded-md bg-low-purple p-6"
                >
                  <Image src={fileIcon} alt={`Preview ${index + 1}`} width={72} height={72} />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold">{preview.name}</span>
                    <span className="text-xs text-mid-grey-II">{(preview.size / 1024 / 1024).toFixed(2)}MB</span>
                  </div>
                  <CustomButton
                    isIconOnly
                    icon={<MdCancel className="h-4 w-4" />}
                    variant="ghost"
                    type="button"
                    size="icon"
                    className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm"
                    onClick={(event) => {
                      event.preventDefault();
                      handleRemoveFile(index, field);
                    }}
                  />
                </section>
              ))}
            </div>
          </div>
        )}
      />

      {error && <p className="text-sm text-destructive">{error.message?.toString()}</p>}
    </div>
  );
}

export function ThumbNailUpload({
  label = "Thumbnail",
  name,
  required = false,
  disabled = false,
  className = "",
  acceptedFormats = "image/jpeg, image/png",
  maxFileSize = 2 * 1024 * 1024,
}: ThumbNailUploadProperties) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const thumbnailUploadInputReference = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    thumbnailUploadInputReference.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size
      if (file.size > maxFileSize) {
        alert(`File size must be less than ${maxFileSize / 1024 / 1024}MB.`);
        return;
      }

      // Validate file type
      if (!acceptedFormats.includes(file.type)) {
        alert(`File type must be one of: ${acceptedFormats}.`);
        return;
      }

      // Create a preview URL for the file
      setPreview(URL.createObjectURL(file));
      // Update the form state with the file
      field.onChange(file);
    }
  };

  const handleRemoveFile = (field: any) => {
    setPreview(null); // Clear the preview
    field.onChange(null); // Clear the file in the form state
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <section className="flex flex-col justify-between lg:flex-row lg:items-center">
          <div className="">
            <Label className="text-sm font-medium">
              {label}
              {required && <span className="ml-1 text-destructive">*</span>}
            </Label>
            <p className="text-xs text-mid-grey-II">
              This image will appear in the explore page. Upload a square image of 2MB or less.
            </p>
          </div>
          {preview && (
            <CustomButton
              variant="outline"
              className="border-primary text-primary"
              isLeftIconVisible
              icon={<CameraIcon className="h-4 w-4" />}
              type="button"
              onClick={handleButtonClick}
            >
              Replace Image
            </CustomButton>
          )}
        </section>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <div
              className={cn(
                "flex flex-wrap gap-4",
                error && "border-destructive",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <input
                ref={thumbnailUploadInputReference}
                type="file"
                accept={acceptedFormats}
                disabled={disabled}
                onChange={(event) => handleFileChange(event, field)}
                className="hidden"
              />

              {!preview && (
                <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-md border bg-low-purple">
                  <CustomButton
                    variant="outline"
                    className="border-primary text-primary"
                    isLeftIconVisible
                    icon={<CameraIcon className="h-4 w-4" />}
                    type="button"
                    onClick={handleButtonClick}
                  >
                    Upload Image
                  </CustomButton>
                </div>
              )}

              {preview && (
                <div className="relative h-[200px] w-[200px]">
                  <Image src={preview} alt="Thumbnail Preview" fill className="rounded-lg object-cover" />
                  <CustomButton
                    isIconOnly
                    icon={<MdCancel className="h-4 w-4" />}
                    variant="ghost"
                    type="button"
                    size="icon"
                    className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm"
                    onClick={() => handleRemoveFile(field)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      />

      {error && <p className="text-sm text-destructive">{error.message?.toString()}</p>}
    </div>
  );
}

export function MultiSelect({
  label,
  name,
  options,
  placeholder = "Select options",
  required = false,
  // disabled = false,
  className = "",
}: {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}) {
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
          const selectedValues = field.value || [];

          const handleSelect = (value: string) => {
            const newSelectedValues = selectedValues.includes(value)
              ? selectedValues.filter((v: string) => v !== value) // Deselect if already selected
              : [...selectedValues, value]; // Select if not already selected
            field.onChange(newSelectedValues);
          };

          return (
            <>
              <Select>
                <SelectTrigger className={cn(error && "border-destructive", className)}>
                  <SelectValue placeholder={placeholder}>
                    {selectedValues.length > 0 ? `${selectedValues.length} selected` : placeholder}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2 p-2"
                      onClick={() => handleSelect(option.value)}
                    >
                      <Checkbox
                        checked={selectedValues.includes(option.value)}
                        onCheckedChange={() => handleSelect(option.value)}
                      />
                      <label className="text-sm">{option.label}</label>
                    </div>
                  ))}
                </SelectContent>
              </Select>

              {/* Display selected values below the input */}
              {selectedValues.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedValues.map((value: string) => {
                    const label = options.find((opt) => opt.value === value)?.label;
                    return label ? (
                      <Badge key={value} className="text-xs">
                        {label}
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </>
          );
        }}
      />

      {error && <p className="text-sm text-destructive">{error.message?.toString()}</p>}
    </div>
  );
}
