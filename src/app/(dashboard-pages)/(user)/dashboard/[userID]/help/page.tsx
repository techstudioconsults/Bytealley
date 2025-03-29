"use client";

import { FaqAccordion } from "~/components/common/faq-accordion";
import { WithDependency } from "~/HOC/withDependencies";
import { HelpService } from "~/services/help.service";
import { dependencies } from "~/utils/dependencies";
import { ContactUsForm } from "./_views/contact-form";

const Help = ({ helpService }: { helpService: HelpService }) => {
  return (
    <section className={`space-y-8`}>
      <section className={`grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-16`}>
        <div className={`col-span-2 space-y-4`}>
          <h4 className={`text-lg lg:text-2xl`}>Frequently Asked Questions</h4>
          <p className={`text-sm text-mid-grey-II lg:text-[16px]`}>Check for frequently asked questions</p>
        </div>
        <div className={`col-span-3`}>
          <FaqAccordion service={helpService} />
        </div>
      </section>
      <section className={`grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-16`}>
        <div className={`col-span-2 space-y-4`}>
          <h4 className={`text-lg lg:text-2xl`}>Contact Support</h4>
        </div>
        <div className={`col-span-3`}>
          <ContactUsForm service={helpService} />
        </div>
      </section>
    </section>
  );
};

const HelpPage = WithDependency(Help, {
  helpService: dependencies.HELP_SERVICE,
});

export default HelpPage;
