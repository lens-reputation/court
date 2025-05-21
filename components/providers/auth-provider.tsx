"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { client } from "@/lib/clients/lens-protocol-mainnet";
import { fetchAccount } from "@lens-protocol/client/actions";
import { signMessageWith } from "@lens-protocol/client/viem";
import {
  Account,
  AuthenticatedUser,
  evmAddress,
  useAuthenticatedUser,
  useLogin,
  useLogout,
} from "@lens-protocol/react";
import { useQuery } from "@tanstack/react-query";
import { useAccount, useDisconnect, useWalletClient } from "wagmi";

interface AuthContextProps {
  account: Account | null;
  walletAddress: string | null;
  isWalletConnected: boolean;
  lensSession: AuthenticatedUser | null;
  isLoggedIn: boolean;
  isAnonymous: boolean;
  isLoading: boolean;
  login: (address: string, onLogedInSuccess?: () => void) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { address: walletAddress, status: walletStatus } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: lensSession } = useAuthenticatedUser();
  const { execute: loginLens } = useLogin();
  const { execute: logoutLens } = useLogout();
  const walletClient = useWalletClient();

  const { data: lensAccount, isLoading: isLensAccountLoading } = useQuery({
    queryKey: ["lensAccount", lensSession?.address],
    queryFn: () => {
      if (!lensSession?.address) {
        throw new Error("Lens session address is undefined");
      }
      return fetchAccount(client, { address: evmAddress(lensSession.address) });
    },
    enabled: !!lensSession?.address,
    staleTime: 1000 * 60 * 5,
  });

  // Login with Lens
  const login = useCallback(
    async (address: string, onLogedInSuccess?: () => void) => {
      if (walletStatus !== "connected") {
        console.error("Wallet is not connected");
        return;
      }

      if (!walletClient || !walletClient.data) {
        console.error("Wallet client data is not available");
        return;
      }

      setIsLoading(true);
      try {
        const authenticated = await loginLens({
          accountOwner: {
            account: evmAddress(address),
            owner: evmAddress(walletAddress),
          },
          signMessage: signMessageWith(walletClient.data),
        });

        if (authenticated.isErr()) {
          throw new Error("Authentication failed");
        }

        const result = await fetchAccount(client, { address: evmAddress(address) });
        if (result.isOk()) {
          setAccount(result.value);
        } else {
          console.error("Failed to fetch account:", result.error);
        }
        if (onLogedInSuccess) {
          onLogedInSuccess();
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error during login:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [walletStatus, walletAddress, walletClient, loginLens, setIsLoggedIn, setAccount],
  );

  // Logout from wallet and Lens
  const logout = useCallback(() => {
    // Set loading state to true at the beginning of the logout process
    setIsLoading(true);
    try {
      if (walletStatus === "connected") {
        disconnect();
      }
      if (account) {
        logoutLens();
        setAccount(null);
      }
      setIsLoggedIn(false);
      setIsAnonymous(false);
    } catch (error) {
      console.error("Error during logout process:", error);
    } finally {
      setIsLoading(false);
    }
  }, [walletStatus, account, logoutLens, disconnect]);

  // Effect for managing authentication state and loading status
  useEffect(() => {
    // Update loading state based on Lens account loading
    setIsLoading(true);

    // Set login status based on wallet and lens session
    setIsLoggedIn(walletStatus === "connected" && !!lensSession?.address);

    // Handle Lens account data
    if (lensAccount) {
      lensAccount.match(
        account => setAccount(account),
        error => console.error("Failed to resolve lensAccount:", error),
      );
    }
    setIsLoading(false);
  }, [lensAccount, isLensAccountLoading, walletStatus, lensSession]);

  // Separate effect for handling wallet disconnection
  useEffect(() => {
    if (walletStatus === "disconnected" && lensSession) {
      logout();
    }
  }, [walletStatus, lensSession, logout]);

  return (
    <AuthContext.Provider
      value={{
        account,
        walletAddress: walletAddress || null,
        isWalletConnected: walletStatus === "connected",
        lensSession: lensSession || null,
        isLoggedIn,
        isAnonymous,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
