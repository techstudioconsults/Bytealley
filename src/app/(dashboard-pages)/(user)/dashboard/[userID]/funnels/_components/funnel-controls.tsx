/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

import CustomButton from "~/components/common/common-button/common-button";
import { FunnelService, template } from "~/features/funnel";
import { WithDependency } from "~/HOC/withDependencies";
import { useSession } from "~/hooks/use-session";
import { dependencies } from "~/utils/dependencies";
import { Toast } from "~/utils/notificationManager";
import { FunnelFormModal } from "./funnel-form-modal";

interface BaseFunnelControlsProperties {
  template: template;
  editor: any;
  funnelService: FunnelService;
}

const BaseFunnelControls = ({ template, editor, funnelService }: BaseFunnelControlsProperties) => {
  const router = useRouter();
  const { user } = useSession();
  const searchParameters = useSearchParams();
  const [isPublishPending, startPublishTransition] = useTransition();
  const [isDraftPending, startDraftTransition] = useTransition();
  const funnelTitle = searchParameters.get("funnel-title") as string;
  const funnelID = searchParameters.get("funnelID") as string;
  const [initialFunnel, setInitialFunnel] = useState<IFunnel | null>(null);

  const getFunnelIfExist = useCallback(async () => {
    if (funnelID) {
      const response = await funnelService.getFunnelByID(funnelID);
      if (response) {
        setInitialFunnel(response.data as IFunnel);
      }
    }
  }, [funnelID, funnelService]);

  useEffect(() => {
    if (funnelID) {
      getFunnelIfExist();
    }
  }, [funnelID, getFunnelIfExist]);

  // Generate the edited funnel content
  const generateEditedFunnel = useCallback(() => {
    const pages = editor.Pages.getAll();
    if (pages.length === 0) return null;

    const templates = pages.map((page: any) => {
      const pageId = page.getId();
      const pageName = page.get("name") || `Page ${pageId}`;
      editor.Pages.select(pageId);
      const html = editor.getHtml();
      const css = editor.getCss();
      return {
        id: pageId,
        name: pageName,
        content: `<!DOCTYPE html>
                <html lang="en">
                <head><style>${css}</style></head>
                <body>${html}</body>
                </html>`,
        style: ``,
      };
    });

    return { pages: templates.filter(Boolean) };
  }, [editor]);

  const handleEditAndSave = useCallback(async () => {
    const updatedFunnel = generateEditedFunnel();
    if (!updatedFunnel || !initialFunnel) return;

    const response = await funnelService.updateFunnel({
      id: initialFunnel.id,
      status: "draft",
      title: initialFunnel.title,
      thumbnail: initialFunnel.thumbnail,
      created_at: initialFunnel.created_at,
      template: JSON.stringify(updatedFunnel),
    });

    if (response) {
      Toast.getInstance().showToast({
        title: "Funnel Updated",
        description: `Funnel "${initialFunnel.title}" has been saved as a draft.`,
        variant: "default",
      });
      router.push(`/dashboard/${user?.id}/funnels`);
    }
  }, [funnelService, generateEditedFunnel, initialFunnel, router, user?.id]);

  const handleEditAndPublish = useCallback(async () => {
    const updatedFunnel = generateEditedFunnel();
    if (!updatedFunnel || !initialFunnel) return;

    const response = await funnelService.updateFunnel({
      id: initialFunnel.id,
      status: "published",
      title: initialFunnel.title,
      thumbnail: initialFunnel.thumbnail,
      created_at: initialFunnel.created_at,
      template: JSON.stringify(updatedFunnel),
    });

    if (response) {
      Toast.getInstance().showToast({
        title: "Funnel Published",
        description: `Funnel "${initialFunnel.title}" has been published successfully!`,
        variant: "default",
      });
      router.push(`/dashboard/${user?.id}/funnels`);
    }
  }, [funnelService, generateEditedFunnel, initialFunnel, router, user?.id]);

  return (
    <section className="funnel-step-1 flex items-center justify-between px-8 pt-2">
      <h4 className="funnel-title text-2xl font-semibold">{template?.id || funnelTitle}</h4>
      {funnelTitle ? (
        <div className="flex items-center justify-between gap-4">
          <CustomButton
            isDisabled={isDraftPending || isPublishPending}
            isLoading={isDraftPending}
            onClick={() => startDraftTransition(handleEditAndSave)}
            variant="outline"
            className="border-mid-primary text-mid-primary save-draft-btn w-full"
          >
            Save Edit and Continue
          </CustomButton>
          <CustomButton
            isDisabled={isPublishPending || isDraftPending}
            isLoading={isPublishPending}
            onClick={() => startPublishTransition(handleEditAndPublish)}
            variant="primary"
            className="publish-btn w-full"
          >
            Save Edit & Publish
          </CustomButton>
        </div>
      ) : (
        <FunnelFormModal editor={editor} />
      )}
    </section>
  );
};

export const FunnelControls = WithDependency(BaseFunnelControls, {
  funnelService: dependencies.FUNNEL_SERVICE,
});
