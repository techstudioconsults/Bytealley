import { FormProvider, useForm } from "react-hook-form";

import { FormField, ImageUpload, RadioCardGroup, RichTextEditor } from "~/components/common/FormFields";

// import { cn } from "~/utils/utils";

export const ProductForm = () => {
  const methods = useForm<ProductFormValues>({
    defaultValues: {
      product_type: "",
      title: "",
      category: "",
      price: 0,
      discount: 0,
      description: "",
      cover_photo: [],
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log(data);
  };
  //   className={cn(methods.watch("productType") === "skill" ? "block" : "hidden")}

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
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
        <section>
          <ImageUpload label="Cover photo" name="cover_photo" />
        </section>
      </form>
    </FormProvider>
  );
};
