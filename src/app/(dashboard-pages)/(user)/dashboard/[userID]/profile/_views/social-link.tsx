import { FormField } from "~/components/common/FormFields";

export const SocialLink = () => {
  return (
    <section className={`space-y-4`}>
      <FormField
        label="X (Twitter)"
        name="twitter_account"
        placeholder="Enter your X account username"
        className={`h-12 bg-low-grey-III`}
      />
      <FormField
        label="Facebook"
        name="facebook_account"
        placeholder="Enter your Facebook account username"
        className={`h-12 bg-low-grey-III`}
      />
      <FormField
        label="Youtube"
        name="youtube_account"
        placeholder="Enter your Youtube account username"
        className={`h-12 bg-low-grey-III`}
      />
    </section>
  );
};
