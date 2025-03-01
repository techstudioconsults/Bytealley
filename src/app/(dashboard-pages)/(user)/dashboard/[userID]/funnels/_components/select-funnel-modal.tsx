"use client";

import template1 from "@/images/template-1.png";
import template2 from "@/images/template-2.png";
import template3 from "@/images/template-3.png";
import { LucidePlusCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import CustomButton from "~/components/common/common-button/common-button";
import { ReusableDialog } from "~/components/common/Dialog";
import { FunnelService } from "~/features/funnel";
import { WithDependency } from "~/HOC/withDependencies";
import { useSession } from "~/hooks/use-session";
import { ProductService } from "~/services/product.service";
import { dependencies } from "~/utils/dependencies";
import { TemplateCard } from "./template-card";

const BaseSelectFunnelModal = ({ productService }: { productService: ProductService }) => {
  //   const [isPending, starttransition] = useTransition();
  const { user } = useSession();
  const [isProduct, setProduct] = useState(false);

  useEffect(() => {
    const doProductExist = async () => {
      const response = await productService.getAllProducts({ status: `published` });
      if (response) {
        setProduct(response.data.length > 0);
      }
    };
    doProductExist();
  }, [productService]);

  return (
    <ReusableDialog
      trigger={
        <CustomButton
          isLeftIconVisible
          icon={<LucidePlusCircle />}
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
        >
          New Funnel
        </CustomButton>
      }
      className={`lg:min-w-[817px] lg:p-8`}
      headerClassName={`text-4xl`}
      title={isProduct ? `Choose a Template` : ""}
      description={isProduct ? `Select a template to continue` : ""}
    >
      {isProduct ? (
        <section className={`grid w-full grid-cols-1 justify-between gap-4 border p-2 lg:grid-cols-3`}>
          <TemplateCard image={template1.src} text={"Sales Template"} />
          <TemplateCard image={template2.src} text={"Webinar Template"} />
          <TemplateCard image={template3.src} text={"Lead Template"} />
        </section>
      ) : (
        <section className={`text-center`}>
          <Image className={`mx-auto`} src={`/images/alert.png`} alt={`alert`} width={70} height={70} />
          <h4>You Haven’t Created any Product yet</h4>
          <p className={`my-3 text-mid-grey-II`}>You must create a product in order to create a funnel</p>
          <CustomButton
            href={`/dashboard/${user?.id}/products/new`}
            variant={`outline`}
            size={`xl`}
            className={`w-full border-primary text-xl text-mid-purple`}
          >
            Create A Product
          </CustomButton>
        </section>
      )}
    </ReusableDialog>
  );
};

export const SelectFunnelModal = WithDependency(BaseSelectFunnelModal, {
  funnelService: dependencies.FUNNEL_SERVICE,
  productService: dependencies.PRODUCT_SERVICE,
});
