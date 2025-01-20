import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`bg-[url('/images/bg-dark.svg')] bg-cover bg-center`}>
      {children}
    </div>
  );
};

export default AuthLayout;
