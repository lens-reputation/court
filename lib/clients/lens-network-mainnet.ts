import { createPublicClient, http } from "viem";
import { lensMainnet } from "@/lib/chains/lens-mainnet";

export const mainnetNetworkClient = createPublicClient({
  chain: lensMainnet,
  transport: http(),
});
