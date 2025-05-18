"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LoginLensAccountsDialog } from "../login-lens-accounts-dialog";
import { useAuth } from "@/components/providers/auth-provider";

const LoginModalContext = createContext<{ open: () => void; close: () => void } | undefined>(undefined);

export const LoginModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { account: lensAccount, isWalletConnected, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show the modal when wallet is connected, there's no Lens account,
    // and we're not in a loading process (like during logout)
    if (isWalletConnected && !lensAccount && !isLoading) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isWalletConnected, lensAccount, isLoading]);

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
