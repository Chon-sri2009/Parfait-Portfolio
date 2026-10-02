"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      scriptProps={{
        ...props.scriptProps,
        type: typeof window === "undefined" ? "text/javascript" : "text/plain",
      }}
    >
      {children}
    </NextThemesProvider>
  );
}
