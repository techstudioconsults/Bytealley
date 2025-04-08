import { ThumbNailUpload } from "~/components/common/FormFields";

export const ProfilePicture = ({ initialValue }: { initialValue: string }) => {
  return (
    <>
      <ThumbNailUpload
        initialValue={initialValue}
        name="logo"
        acceptedFormats="image/jpeg, image/png image/webp"
        maxFileSize={2 * 1024 * 1024}
      />
    </>
  );
};
