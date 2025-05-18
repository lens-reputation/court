"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>  
      {children}
      <Toaster position="bottom-right" closeButton />
    </>
  );
};
