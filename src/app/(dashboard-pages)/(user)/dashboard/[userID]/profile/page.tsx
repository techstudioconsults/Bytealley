"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import CustomButton from "~/components/common/common-button/common-button";
import { useSession } from "~/hooks/use-session";
import { ProfileFormData, profileSchema } from "~/schemas";
import { ProfileInformation } from "./_views/profile-infomation";
import { ProfilePicture } from "./_views/profile-picture";
import { SocialLink } from "./_views/social-link";

const Profile = () => {
  const { user, updateUserInfo } = useSession();
  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user?.name,
      username: user?.username || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      bio: user?.bio || "",
      logo: user?.logo,
      facebook_account: user?.facebook_account || "",
      twitter_account: user?.twitter_account || "",
      youtube_account: user?.youtube_account || "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleSubmitForm = async (data: ProfileFormData) => {
    if (data.logo instanceof File) {
      await updateUserInfo(data);
    } else {
      const formData = {
        ...data,
        logo: null,
      };
      await updateUserInfo(formData);
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
        <section className={`space-y-8`}>
          <section className={`grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-16`}>
            <div className={`col-span-2 space-y-4`}>
              <h4 className={`text-lg lg:text-2xl`}>Profile Information</h4>
              <p className={`text-sm text-mid-grey-II lg:text-[16px]`}>
                Update your profile info with the correct details.
              </p>
            </div>
            <div className={`col-span-3 space-y-4`}>
              <ProfileInformation />
            </div>
          </section>
          <section className={`grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-16`}>
            <div className={`col-span-2 space-y-4`}>
              <h4 className={`text-lg lg:text-2xl`}>Logo</h4>
              <p className={`text-sm text-mid-grey-II lg:text-[16px]`}>Update your profile picture.</p>
            </div>
            <div className={`col-span-3`}>
              <ProfilePicture />
            </div>
          </section>
          <section className={`grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-16`}>
            <div className={`col-span-2 space-y-4`}>
              <h4 className={`text-lg lg:text-2xl`}>Social Link</h4>
              <p className={`text-sm text-mid-grey-II lg:text-[16px]`}>Update your social presence online.</p>
            </div>
            <div className={`col-span-3 space-y-4`}>
              <SocialLink />
            </div>
          </section>
          <section className={`grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-16`}>
            <div className={`col-span-2 space-y-4`}></div>
            <div className={`col-span-3`}>
              <div className={`flex items-center gap-4 pt-6`}>
                <CustomButton
                  size={`xl`}
                  variant={`outline`}
                  className="w-full border-mid-danger text-mid-danger"
                  onClick={(event) => {
                    event.preventDefault();
                    reset();
                  }}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  size={`xl`}
                  variant={`primary`}
                  type="submit"
                  className="w-full"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  Send Message
                </CustomButton>
              </div>
            </div>
          </section>
        </section>
      </form>
    </FormProvider>
  );
};

export default Profile;
