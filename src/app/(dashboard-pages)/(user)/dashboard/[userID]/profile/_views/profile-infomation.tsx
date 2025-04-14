import Link from "next/link";

import { FormField } from "~/components/common/FormFields";
import { useSession } from "~/hooks/use-session";

export const ProfileInformation = () => {
  const { user } = useSession();
  return (
    <>
      <FormField
        label="Full name"
        name="full_name"
        placeholder="Enter your full name"
        className={`h-12 bg-mid-grey-I`}
        required
      />
      <FormField
        label="Username"
        name="username"
        placeholder="Enter a unique username"
        className={`h-12 bg-low-grey-III`}
        required
      />
      <FormField
        label="Email"
        labelDetailedNode={
          <div className={`flex items-center justify-between`}>
            <span className={`text-xs text-mid-grey-II`}>This email is linked to your account</span>
            <Link href={`/dashboard/${user?.id}/settings`} className={`text-xs font-semibold text-mid-purple`}>
              Change Account Email
            </Link>
          </div>
        }
        name="email"
        type="email"
        placeholder="name@example.com"
        className={`h-12 bg-mid-grey-I`}
        disabled
        required
      />
      <FormField
        label="Contact Number"
        name="phone_number"
        placeholder="Enter your phone number"
        className={`h-12 border-none bg-transparent`}
        containerClassName={`bg-low-grey-III border-default pl-3 rounded-lg`}
        leftAddon={"+234"}
        required
      />
      <FormField
        label="Bio"
        name="bio"
        type="textarea"
        placeholder="Say something nice about yourself"
        className={`h-[10rem] bg-low-grey-III`}
        required
      />
    </>
  );
};
