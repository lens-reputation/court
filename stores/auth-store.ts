import { Account, AuthenticatedUser } from "@lens-protocol/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  account: Account | null;
  walletAddress: string | null;
  isWalletConnected: boolean;
  lensSession: AuthenticatedUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  // Actions
  setAccount: (account: Account | null) => void;
  setWalletAddress: (address: string | null) => void;
  setIsWalletConnected: (connected: boolean) => void;
  setLensSession: (session: AuthenticatedUser | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      account: null,
      walletAddress: null,
      isWalletConnected: false,
      lensSession: null,
      isLoggedIn: false,
      isLoading: false,

      // Actions
      setAccount: account => set({ account }),
      setWalletAddress: address => set({ walletAddress: address }),
      setIsWalletConnected: connected => set({ isWalletConnected: connected }),
      setLensSession: session => set({ lensSession: session }),
      setIsLoggedIn: loggedIn => set({ isLoggedIn: loggedIn }),
      setIsLoading: loading => set({ isLoading: loading }),
    }),
    {
      name: "lens-judge-auth",
      // You might want to only persist certain fields
      partialize: state => ({
        account: state.account,
        isLoggedIn: state.isLoggedIn,
        lensSession: state.lensSession,
      }),
    },
  ),
);
