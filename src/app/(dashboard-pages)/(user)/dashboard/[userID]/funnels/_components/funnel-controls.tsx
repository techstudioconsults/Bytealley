/* eslint-disable @typescript-eslint/no-explicit-any */
import { template } from "~/features/funnel";
import { FunnelFormModal } from "./funnel-form-modal";

export const FunnelControls = ({ template, editor }: { template: template; editor: any }) => {
  return (
    <section className="flex items-center justify-between px-8 pt-2">
      <h4 className="text-2xl font-semibold">{template?.id}</h4>
      <div>
        <FunnelFormModal editor={editor} />
      </div>
    </section>
  );
};
