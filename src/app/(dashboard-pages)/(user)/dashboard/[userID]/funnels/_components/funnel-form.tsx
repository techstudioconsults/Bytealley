"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import CustomButton from "~/components/common/common-button/common-button";
import { FormField, MultiSelect, ThumbNailUpload } from "~/components/common/FormFields";
import { WithDependency } from "~/HOC/withDependencies";
import { FunnelFormData, funnelSchema } from "~/schemas";
import { ProductService } from "~/services/product.service";
import { dependencies } from "~/utils/dependencies";

const BaseFunnelForm = ({ productService }: { productService: ProductService }) => {
  const [products, setProducts] = useState<{ value: string; label: string; thumbnail: string | File | null }[]>([]);
  const methods = useForm<FunnelFormData>({
    resolver: zodResolver(funnelSchema),
    defaultValues: {
      title: "",
      products: "",
      thumbnail: null,
      asset: null,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleSubmitForm = async (data: FunnelFormData) => {
    // const response = await settingsService.submitKYCDocument(data);
    // if (response) {
    //   Toast.getInstance().showToast({
    //     title: "KYC Update",
    //     description: `Your KYC information has been uploaded successfully.`,
    //     variant: "default",
    //   });
    //   reset();
    // }
  };

  useEffect(() => {
    const doProductExist = async () => {
      const response = await productService.getAllProducts({ status: `published` });
      if (response) {
        const formatedProduct = response.data.map((product) => {
          return {
            value: product.id,
            label: product.title,
            thumbnail: product.thumbnail,
          };
        });
        setProducts(formatedProduct);
      }
    };
    doProductExist();
  }, [productService]);

  return (
    <section>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
          <FormField label="Title" name="title" placeholder="Funnel name" className={`h-12 bg-low-grey-III`} required />

          <ThumbNailUpload
            label={`Thumbnail`}
            labelText={``}
            name="thumbnail"
            acceptedFormats="image/jpeg, image/png"
            maxFileSize={2 * 1024 * 1024}
          />

          <MultiSelect
            className={`h-12 bg-low-grey-III`}
            label="Products"
            name="productId"
            options={products}
            placeholder="Choose a product"
            required
          />

          <div className={`flex items-center gap-4 pt-6`}>
            <CustomButton
              size={`xl`}
              variant={`outline`}
              className="w-full border-mid-danger text-mid-danger"
              onClick={(event) => {
                event.preventDefault();
                reset();
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton size={`xl`} variant={`primary`} type="submit" className="w-full">
              Save Changes
            </CustomButton>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export const FunnelForm = WithDependency(BaseFunnelForm, {
  funnelService: dependencies.FUNNEL_SERVICE,
  productService: dependencies.PRODUCT_SERVICE,
});
