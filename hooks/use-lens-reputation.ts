"use client";

import { useEffect, useState } from "react";
import { Address } from "@/types/common";
import { useAuth } from "@/components/providers/auth-provider";

/**
 * Hook to check if user has minted the LensReputation NFT
 * @returns Object containing the reputation status
 */
export function useLensReputation() {
  const [hasMintedReputation, setHasMintedReputation] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { account, isWalletConnected } = useAuth();

  useEffect(() => {
    const checkReputationNFT = async (userAddress: Address) => {
      setIsLoading(true);
      try {
        // This is a placeholder - you'll implement the actual API call to lensreputation
        // to check if the user has minted the NFT
        // For now, we're returning false so the button will show up
        setHasMintedReputation(true);
      } catch (error) {
        console.error("Error checking LensReputation NFT:", error);
        setHasMintedReputation(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (isWalletConnected && account?.address) {
      checkReputationNFT(account?.address);
    } else {
      setHasMintedReputation(false);
    }
  }, [account, isWalletConnected]);

  return { hasMintedReputation, isLoading };
}
