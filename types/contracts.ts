import { Address } from "@/types/common";
import { Abi } from "viem";

export type DeployedContracts = {
  LensReputation: {
    address: Address;
    abi: Abi;
    inheritedFunctions: Record<string, unknown>;
  };
};
