"use client";

import { UseFormReturn } from "react-hook-form";

import {
  FileUpload,
  FormField,
  Highlights,
  ImageUpload,
  MultiSelect,
  RadioCardGroup,
  RichTextEditor,
  ThumbNailUpload,
} from "~/components/common/FormFields";

export const ProductForm = ({ methods, tags }: { methods: UseFormReturn<ProductFormValues>; tags: [] }) => {
  const productType = methods.watch("product_type");

  return (
    <form className="space-y-[40px]">
      <section>
        <RadioCardGroup
          name="product_type"
          label="Product Type"
          options={[
            {
              value: "digital_product",
              label: "Digital Product",
              description: "Any set of files to download or stream",
              icon: "/images/digital_product_icon.svg",
            },
            {
              value: "skill_selling",
              label: "Skill Selling",
              description: "Let customers hire your services",
              icon: "/images/skill_selling_icon.svg",
            },
          ]}
          required
          className="h-[129px]"
        />
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <FormField
          label="Title"
          name="title"
          placeholder={productType === "digital_product" ? "Product name" : "Skill name"}
          className={`h-12 bg-low-grey-III`}
          required
        />
        <FormField
          label="Category"
          name="category"
          type="select"
          placeholder="Select category"
          options={[
            { value: "Product", label: "Product" },
            // { value: "skill", label: "Skill" },
          ]}
          className={`h-12 bg-low-grey-III`}
          required
        />
        <FormField
          label="Price"
          name="price"
          type="number"
          placeholder="₦ 0.00"
          className={`h-12 bg-low-grey-III`}
          required
        />
        <FormField
          label="Discount Price"
          name="discount_price"
          type="number"
          placeholder="₦ 0.00 (optional)"
          className={`h-12 bg-low-grey-III`}
        />
      </section>
      <section>
        <RichTextEditor label="Description" name="description" placeholder="Enter description of your product" />
      </section>
      {productType === "digital_product" && (
        <section>
          <FileUpload
            name="assets"
            label="Product Files"
            required
            maxFiles={4}
            acceptedFormats="application/pdf, video/mp4"
            maxFileSize={100 * 1024 * 1024}
          />
        </section>
      )}
      <section>
        <ImageUpload
          name="cover_photos"
          label="Cover Photo"
          required
          maxFiles={4}
          acceptedFormats="image/jpeg, image/png"
          maxFileSize={2 * 1024 * 1024}
        />
      </section>
      {productType === "skill_selling" && (
        <section className="grid gap-4 lg:grid-cols-2">
          <Highlights name="resource_link" label="Resource Link" addButtonText={`Add more resource link`} />
          <FormField
            label="Portfolio Link"
            name="portfolio_link"
            placeholder="Enter portfolio link"
            className={`h-12 bg-low-grey-III`}
          />
        </section>
      )}
      <section className="grid gap-4 lg:grid-cols-2">
        <Highlights name="highlights" label="Highlights" />
        <ThumbNailUpload
          name="thumbnail"
          label="Thumbnail"
          required
          acceptedFormats="image/jpeg, image/png"
          maxFileSize={2 * 1024 * 1024}
        />
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <MultiSelect
          className={`h-12 bg-low-grey-III`}
          label="Tags"
          name="tags"
          options={tags}
          placeholder="Choose options"
          required
        />
      </section>
    </form>
  );
};
