"use client";

import { useEffect, useState } from "react";
import { Address } from "@/types/common";
import { useAccount } from "wagmi";

/**
 * Hook to check if user has minted the LensReputation NFT
 * @returns Object containing the reputation status
 */
export function useLensReputation() {
  const [hasMintedReputation, setHasMintedReputation] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const checkReputationNFT = async (userAddress: Address) => {
      setIsLoading(true);
      try {
        // This is a placeholder - you'll implement the actual API call to lensreputation
        // to check if the user has minted the NFT
        // For now, we're returning false so the button will show up
        setHasMintedReputation(false);
      } catch (error) {
        console.error("Error checking LensReputation NFT:", error);
        setHasMintedReputation(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (isConnected && address) {
      checkReputationNFT(address);
    } else {
      setHasMintedReputation(false);
      setIsLoading(false);
    }
  }, [address, isConnected]);

  return { hasMintedReputation, isLoading };
}
