/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "next/navigation";

import { template } from "~/features/funnel";
import { FunnelFormModal } from "./funnel-form-modal";

export const FunnelControls = ({ template, editor }: { template: template; editor: any }) => {
  const searchParameters = useSearchParams();
  const title = searchParameters.get("funnel-title") as string;
  return (
    <section className="flex items-center justify-between px-8 pt-2">
      <h4 className="text-2xl font-semibold">{template?.id || title}</h4>
      <div>
        <FunnelFormModal editor={editor} />
      </div>
    </section>
  );
};
