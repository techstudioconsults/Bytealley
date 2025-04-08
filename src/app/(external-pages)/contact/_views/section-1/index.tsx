import { Mail, Phone } from "lucide-react"; // Using Lucide icons for simplicity

import { Wrapper } from "~/components/layout/wrapper";
import { ContactUsForm } from "../../_components/contact-form";

export const ContactSection = () => {
  return (
    <div className="bg-low-warning py-20">
      <Wrapper className="px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="my-auto space-y-8">
            <h2 className="font-nr text-h2 leading-tight text-high-warning sm:text-h2-sm md:text-h2-md">
              Reach Out To Us
            </h2>
            <p className="text-xl">
              Reach out to us for any queries or support. Our team is here to help you with your shopping experience and
              ensure your satisfaction.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-gray-100">
                  <Mail className="h-8 w-8" />
                </div>
                <p className="text-lg font-semibold">info@trybytealley.com</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-gray-100">
                  <Phone className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-lg font-semibold">+2347012345678</p>
                  <p className="text-lg font-semibold">+2347012345678</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ContactUsForm />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
