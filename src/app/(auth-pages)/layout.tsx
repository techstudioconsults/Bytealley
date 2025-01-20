import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`bg-[url('/images/bg-light.svg')] bg-cover bg-center`}>
      {children}
    </div>
  );
};

export default AuthLayout;
