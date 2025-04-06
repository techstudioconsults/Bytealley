import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const UseEditor = () => {
  const pathName = usePathname();
  const [isEditor, setIsEditor] = useState(false);

  useEffect(() => {
    const init = () => {
      setIsEditor(pathName.includes("editor"));
    };
    init();
  }, [pathName]);

  return { isEditor };
};
