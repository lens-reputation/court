"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Only show the theme toggle after mounting to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Toggle variant="outline" size="sm" pressed={false} onPressedChange={toggleTheme} aria-label="Toggle theme">
          <Sun className="h-4 w-4" />
        </Toggle>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Toggle
        variant="outline"
        size="sm"
        pressed={theme === "dark"}
        onPressedChange={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Toggle>
    </div>
  );
}
