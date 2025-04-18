// // components/theme-toggle.tsx
// "use client";

// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

// import { Button } from "~/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "~/components/ui/dropdown-menu";

// export function ThemeToggle() {
//   const { setTheme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// components/theme-switch.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-6 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />;
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-gray-700"
      onClick={toggleTheme}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
          isDark ? "translate-x-6" : "translate-x-1"
        }`}
      >
        {isDark ? <Moon className="h-5 w-5 text-mid-grey-III" /> : <Sun className="h-5 w-5 text-mid-warning" />}
      </span>
    </button>
  );
}
