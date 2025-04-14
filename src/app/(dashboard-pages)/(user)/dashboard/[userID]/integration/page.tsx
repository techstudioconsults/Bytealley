"use client";

import mailchimp from "@/images/mailchimp.svg";
import mailerlite from "@/images/mailerlite.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { BlurImage } from "~/components/miscellaneous/blur-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { IntegrationModal } from "./_components/integration-modal";

const IntegrationPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  const currentTab = searchParameters.get("tab") || "all-integrations";

  const onTabChange = (value: string) => {
    const parameters = new URLSearchParams(searchParameters);
    parameters.set("tab", value);
    router.replace(`${pathname}?${parameters.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="border-bottom mb-8 flex h-fit w-full flex-col-reverse gap-4 rounded-none bg-transparent p-0 sm:h-[58px] sm:flex-row sm:items-center sm:justify-between lg:h-[58px]">
        <section className="flex h-full w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap sm:gap-0">
          <TabsTrigger
            value="all-integrations"
            className="relative h-full min-w-[100px] shrink-0 rounded-none border-transparent px-3 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:px-4"
          >
            All Integrations
            <span
              className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 bg-primary transition-transform duration-200 data-[state=active]:scale-x-100"
              data-state={currentTab === "all-integrations" ? "active" : "inactive"}
            />
          </TabsTrigger>
          {/* <TabsTrigger
            value="linked"
            className="relative h-full min-w-[80px] shrink-0 rounded-none border-transparent px-3 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:px-4"
          >
            Linked
            <span
              className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 bg-primary transition-transform duration-200 data-[state=active]:scale-x-100"
              data-state={currentTab === "linked" ? "active" : "inactive"}
            />
          </TabsTrigger> */}
        </section>
      </TabsList>

      {/* tab content */}
      <TabsContent className={`space-y-4`} value="all-integrations">
        <p className={`font-semibold`}>Email Integration</p>
        <section className={`flex items-center gap-7`}>
          <IntegrationModal
            type={`MailerLite`}
            trigger={
              <div
                className={`flex max-w-[190px] flex-col items-center justify-between gap-4 rounded-lg border-default p-3`}
              >
                <BlurImage src={mailerlite} alt={`mailerlite`} />
                <p className={`text-mid-grey-II`}>Mailerlite</p>
              </div>
            }
          />
          <IntegrationModal
            type={`MailChimp`}
            trigger={
              <div
                className={`flex max-w-[190px] flex-col items-center justify-between gap-4 rounded-lg border-default p-3`}
              >
                <BlurImage src={mailchimp} alt={`mailchimp`} />
                <p className={`text-mid-grey-II`}>Mailchimp</p>
              </div>
            }
          />
        </section>
      </TabsContent>
      {/* <TabsContent value="linked">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum odio veniam iusto, tempora aut delectus distinctio
        tenetur reprehenderit, sit nobis, sed numquam praesentium earum quo. Dolore eius accusantium enim illo.
      </TabsContent> */}
    </Tabs>
  );
};

export default IntegrationPage;
