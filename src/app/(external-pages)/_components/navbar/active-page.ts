"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const ActivePage = (path: string) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Normalize both the current path and the comparison path
    const normalizedPathname = pathname.toLowerCase().trim();
    let normalizedComparisonPath = path.toLowerCase().trim();

    // Convert spaces to hyphens to match URL patterns
    normalizedComparisonPath = normalizedComparisonPath.replaceAll(/\s+/g, "-");

    // Remove leading/trailing slashes for consistent comparison
    normalizedComparisonPath = normalizedComparisonPath.replaceAll(/^\/|\/$/g, "");

    // Check if the pathname includes the normalized comparison path
    // Also check for exact matches when path is at the start or end
    setIsActive(
      normalizedPathname === normalizedComparisonPath ||
        normalizedPathname.startsWith(`${normalizedComparisonPath}/`) ||
        normalizedPathname.includes(`/${normalizedComparisonPath}`) ||
        normalizedPathname.endsWith(`/${normalizedComparisonPath}`),
    );
  }, [pathname, path]);

  return isActive;
};
