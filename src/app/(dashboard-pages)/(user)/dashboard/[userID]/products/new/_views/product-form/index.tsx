import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

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
import { ProductFormSchema } from "~/schemas";

export const ProductForm = () => {
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      product_type: "",
      title: "",
      category: "",
      price: 0,
      discount: 0,
      description: "",
      data: [],
      cover_photo: [],
      highlights: [],
      thumbnail: null,
      resource_link: [],
      portfolio_link: "",
      tags: [],
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    if (data.product_type === "digital_product") {
      // Handle digital product submission
      const digitalProductData = {
        title: data.title,
        category: data.category,
        price: data.price,
        discount: data.discount,
        description: data.description,
        data: data.data,
        cover_photo: data.cover_photo,
        highlights: data.highlights,
        thumbnail: data.thumbnail,
        tags: data.tags,
      };
      console.log("Digital Product Data:", digitalProductData);
      // Submit digitalProductData to your API or perform other actions
    } else if (data.product_type === "skill_selling") {
      // Handle skill selling submission
      const skillSellingData = {
        title: data.title,
        category: data.category,
        price: data.price,
        discount: data.discount,
        description: data.description,
        cover_photo: data.cover_photo,
        resource_link: data.resource_link,
        portfolio_link: data.portfolio_link,
        highlights: data.highlights,
        thumbnail: data.thumbnail,
        tags: data.tags,
      };
      console.log("Skill Selling Data:", skillSellingData);
      // Submit skillSellingData to your API or perform other actions
    }
  };

  const productType = methods.watch("product_type");

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-[40px]">
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
          <FormField label="Title" name="title" placeholder="Skill name" className={`h-12 bg-low-grey-III`} required />
          <FormField
            label="Category"
            name="category"
            type="select"
            placeholder="Select category"
            options={[
              { value: "product", label: "Product" },
              { value: "skill", label: "Skill" },
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
            name="discount"
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
              name="data"
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
            name="cover_photo"
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
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" },
            ]}
            placeholder="Choose options"
            required
          />
        </section>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};
