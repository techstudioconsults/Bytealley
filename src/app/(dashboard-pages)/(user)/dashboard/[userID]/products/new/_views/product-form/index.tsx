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
import { cn } from "~/utils/utils";

export const ProductForm = () => {
  const methods = useForm<ProductFormValues>({
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
    console.log(data);
  };
  //   className={cn(methods.watch("productType") === "skill" ? "block" : "hidden")}

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-[40px]">
        <section>
          <RadioCardGroup
            name="product_type"
            label="Product Type"
            options={[
              {
                value: "digital",
                label: "Digital Product",
                description: "Any set of files to download or stream",
                icon: "/images/digital_product_icon.svg",
              },
              {
                value: "skill",
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
            required
          />
        </section>
        <section>
          <RichTextEditor label="Description" name="description" placeholder="Enter description of your product" />
        </section>
        <section className={cn(methods.watch("product_type") === "digital" ? "block" : "hidden")}>
          <FileUpload label="Digital Product" name="data" />
        </section>
        <section>
          <ImageUpload required label="Cover photo" name="cover_photo" />
        </section>
        <section
          className={cn(methods.watch("product_type") === "skill" ? "block" : "hidden", "grid gap-4 lg:grid-cols-2")}
        >
          <Highlights name="resource_link" label="Resource Link" addButtonText={`Add more resource link`} />
          <FormField
            label="Portfolio Link"
            name="portfolio_link"
            placeholder="Enter portfolio link"
            className={`h-12 bg-low-grey-III`}
          />
        </section>
        <section className="grid gap-4 lg:grid-cols-2">
          <Highlights name="highlights" label="Highlights" />
          <ThumbNailUpload name="thumbnail" />
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
