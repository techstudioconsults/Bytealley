import { template } from "~/features/funnel";
import { FunnelFormModal } from "./funnel-form-modal";

export const FunnelControls = ({ template }: { template: template }) => {
  return (
    <section className="flex items-center justify-between px-8 pt-2">
      <h4 className="text-2xl font-semibold">{template?.id}</h4>
      <div>
        <FunnelFormModal />
      </div>
    </section>
  );
};
