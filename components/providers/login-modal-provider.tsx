"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { LoginLensAccountsDialog } from "../login-lens-accounts-dialog";

const LoginModalContext = createContext<{ open: () => void; close: () => void } | undefined>(undefined);

export const LoginModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { account: lensAccount, isWalletConnected } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isWalletConnected && !lensAccount) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isWalletConnected, lensAccount]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <LoginModalContext.Provider value={{ open, close }}>
      <LoginLensAccountsDialog isOpen={isOpen} onClose={close} />
      {children}
    </LoginModalContext.Provider>
  );
};

export const useLoginModal = () => {
  const ctx = useContext(LoginModalContext);
  if (!ctx) throw new Error("useLoginModal must be used within LoginModalProvider");
  return ctx;
};