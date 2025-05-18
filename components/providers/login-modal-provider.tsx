"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { LoginLensAccountsDialog } from "../login-lens-accounts-dialog";
import { useAuth } from "@/components/providers/auth-provider";

const LoginModalContext = createContext<{ open: () => void; close: () => void } | undefined>(undefined);

export const LoginModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { account: lensAccount, isWalletConnected, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [preventAutoOpen, setPreventAutoOpen] = useState(false);
  const prevLensAccountRef = useRef(lensAccount);

  // Detect when a logout happens (lensAccount changes from non-null to null)
  useEffect(() => {
    if (prevLensAccountRef.current && !lensAccount) {
      // Logout detected, prevent modal from opening automatically
      setPreventAutoOpen(true);
      // Reset the prevention after a short delay
      const timer = setTimeout(() => {
        setPreventAutoOpen(false);
      }, 2000); // 2 seconds should be enough for logout to complete
      return () => clearTimeout(timer);
    }
    prevLensAccountRef.current = lensAccount;
  }, [lensAccount]);

  useEffect(() => {
    // Only show the modal when wallet is connected, there's no Lens account,
    // we're not in a loading process, and we're not preventing auto-open
    if (isWalletConnected && !lensAccount && !isLoading && !preventAutoOpen) {
      console.log("open login modal");
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isWalletConnected, lensAccount, isLoading, preventAutoOpen]);

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
