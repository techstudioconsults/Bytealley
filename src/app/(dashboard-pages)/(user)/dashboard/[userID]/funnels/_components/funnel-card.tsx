"use client";

// Required for client-side interactivity in Next.js
// import { Eye, MinusCircleIcon, MoreVertical, Pencil, Settings, Trash } from "lucide-react";
import Image from "next/image";

import { Badge } from "~/components/ui/badge";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// import Loading from "~/app/Loading";
// import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "~/components/ui/dropdown-menu";
import { cn, formatDate, formatTime } from "~/utils/utils";

interface FunnelCardProperties {
  template: {
    id: string;
    title: string;
    thumbnail: string;
    created_at: string;
    status: string;
    url?: string;
    template?: string;
  };
}

export const FunnelCard = ({ template }: FunnelCardProperties) => {
  //   const router = useRouter();

  const { title, thumbnail, created_at, status } = template;

  //   const handleDelete = async () => {
  //     try {
  //       await deleteFunnel(template.id);
  //     } catch (err) {
  //       toast({
  //         title: "Error deleting funnel",
  //         description: "An error occurred while deleting the funnel.",
  //         variant: "destructive",
  //       });
  //     }
  //   };

  //   const handlePreview = () => {
  //     window.open(template.url, "_blank", "noopener,noreferrer");
  //   };

  //   const handleEdit = () => {
  //     router.push(`/dashboard/funnels/editor/${template.id}`, {
  //       state: { title: template.title, thumbnail: template.thumbnail, template: template.template, id: template.id },
  //     });
  //   };

  //   const handleReturnToDraft = async () => {
  //     try {
  //       await updateFunnel("", template.title, "draft", "", template.id);
  //       toast({
  //         title: "Funnel Update",
  //         description: "Funnel has been moved to draft successfully.",
  //       });
  //     } catch (err) {
  //       toast({
  //         title: "Error updating funnel",
  //         description: "Failed to update the funnel. Please try again.",
  //         variant: "destructive",
  //       });
  //     }
  //   };

  return (
    <div className="max-w-[419px] rounded-lg border border-gray-200 p-6">
      <Card className="h-[150px] overflow-hidden rounded-md bg-purple-200">
        <Image
          src={thumbnail || `/images/question_mark.png`}
          alt="template"
          width={419}
          height={150}
          className="h-full w-full object-cover"
        />
      </Card>
      <div className="my-3 flex items-center justify-between font-bold">
        <div>
          <p className="text-lg">{title}</p>
          <div className="flex items-center text-sm text-gray-400">
            <span>{formatDate(created_at)}</span>
            <span className="mx-1">•</span>
            <span>{formatTime(created_at)}</span>
          </div>
        </div>
        {/* <DropdownActionDraft
          hasUrl={!!template.url}
          onReturn={handleReturnToDraft}
          onEdit={handleEdit}
          onPreview={handlePreview}
          onDelete={handleDelete}
          isLoading={isLoading}
          template={template}
        /> */}
      </div>
      <Badge
        className={cn(
          "rounded-sm",
          status === "draft" ? "bg-low-warning text-mid-warning" : "bg-low-success text-mid-success",
        )}
      >
        {status}
      </Badge>
      {/* {isLoading && (
        <div className="mt-4 flex items-center justify-center">
          <Loading text={`Loading order table...`} className={`w-fill h-fit p-20`} />
          <p className="ml-2 text-sm">Processing...</p>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error.message || "An error occurred. Please try again."}</p>} */}
    </div>
  );
};

// interface DropdownActionDraftProperties {
//   template: string;
//   hasUrl: boolean;
//   onEdit: () => void;
//   onPreview: () => void;
//   onDelete: () => void;
//   onReturn: () => void;
//   isLoading: boolean;
// }

// const DropdownActionDraft = ({
//     template,
//   hasUrl,
//   onEdit,
//   onPreview,
//   onDelete,
//   onReturn,
//   isLoading,
// }: DropdownActionDraftProperties) => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon">
//           <MoreVertical className="h-5 w-5" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent>
//         {!hasUrl && (
//           <>
//             <DropdownMenuItem onClick={onEdit} disabled={isLoading}>
//               <Pencil className="mr-2 h-4 w-4" />
//               <span>Edit Funnel Template</span>
//             </DropdownMenuItem>
//             <Link href="/dashboard/funnels/settings" passHref>
//               <DropdownMenuItem>
//                 <Settings className="mr-2 h-4 w-4" />
//                 <span>Settings</span>
//               </DropdownMenuItem>
//             </Link>
//           </>
//         )}
//         {hasUrl && (
//           <>
//             <DropdownMenuItem onClick={onPreview} disabled={isLoading}>
//               <Eye className="mr-2 h-4 w-4" />
//               <span>Preview</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={onReturn} disabled={isLoading}>
//               <MinusCircleIcon className="mr-2 h-4 w-4" />
//               <span>Return To Draft</span>
//             </DropdownMenuItem>
//           </>
//         )}
//         <DropdownMenuItem onClick={onDelete} disabled={isLoading} className="text-red-500">
//           <Trash className="mr-2 h-4 w-4" />
//           <span>Delete</span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

export default FunnelCard;
