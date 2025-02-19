import { ThumbNailUpload } from "~/components/common/FormFields";

export const ProfilePicture = () => {
  return (
    <>
      <ThumbNailUpload name="logo" acceptedFormats="image/jpeg, image/png" maxFileSize={2 * 1024 * 1024} />
    </>
  );
};
