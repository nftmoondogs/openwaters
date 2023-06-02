import { useCallback } from "react";
import { zeroAddress } from "viem";
import { usePublicClient, useWalletClient, erc20ABI, erc721ABI } from "wagmi";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import { toast } from "react-toastify";

import { marketplaceAbi } from "../abi/MarketplaceABI";

export const useApprove = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const approve = useCallback(
    async (
      tokenAddress: `0x${string}`,
      ownerAddress: `0x${string}`,
      spenderAddress: `0x${string}`,
      amount: bigint
    ) => {
      try {
        if (walletClient && publicClient) {
          const allowance = await readContract({
            address: tokenAddress,
            abi: erc20ABI,
            functionName: "allowance",
            args: [ownerAddress, spenderAddress],
          });
          if (allowance < amount) {
            const { hash } = await writeContract({
              address: tokenAddress,
              abi: erc20ABI,
              functionName: "approve",
              args: [spenderAddress, amount + allowance],
            });

            await waitForTransaction({ hash });
          }
        }
      } catch (error: any) {
        toast.error(error.error.message);
        console.log(error.error);
        throw new Error(error);
      }
    },
    [publicClient, walletClient]
  );
  return { approve };
};

export const useApproveForAll = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const approveForAll = useCallback(
    async (contractAddress: string, assetAddress: string) => {
      try {
        if (walletClient && publicClient) {
          const isApproved = await readContract({
            address: assetAddress as `0x${string}`,
            abi: erc721ABI,
            functionName: "isApprovedForAll",
            args: [
              walletClient.account.address,
              contractAddress as `0x${string}`,
            ],
          });
          if (!isApproved) {
            const { hash } = await writeContract({
              address: assetAddress as `0x${string}`,
              abi: erc721ABI,
              functionName: "setApprovalForAll",
              args: [contractAddress as `0x${string}`, true],
            });
            await waitForTransaction({ hash });
          }
        }
      } catch (error: any) {
        toast.error(error.message);
        console.log(error);
        throw new Error(error);
      }
    },
    [publicClient, walletClient]
  );
  return { approveForAll };
};

export const useBuyAsset = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const buyAsset = useCallback(
    async (
      signature: string,
      collectionOwnerAddress: string,
      collectionFee: number | string,
      assetAddress: string,
      tokenId: string,
      contractAddress: string,
      tokenAddress: string,
      sellerAddress: string,
      price: string
    ) => {
      try {
        if (walletClient && publicClient) {
          let value;
          if (tokenAddress === zeroAddress) {
            value = BigInt(price);
          } else {
            value = 0n;
          }

          const { hash } = await writeContract({
            address: contractAddress as `0x${string}`,
            abi: marketplaceAbi,
            functionName: "buyItem",
            args: [
              signature as `0x${string}`,
              collectionOwnerAddress as `0x${string}`,
              Number(collectionFee) * 100,
              assetAddress as `0x${string}`,
              BigInt(tokenId),
              tokenAddress as `0x${string}`,
              sellerAddress as `0x${string}`,
              BigInt(price),
            ],
            value,
          });

          await waitForTransaction({ hash });
        }
      } catch (error: any) {
        // toast.error(error.data.message);
        console.log(error);
        throw new Error(error);
      }
    },
    [publicClient, walletClient]
  );

  return { buyAsset };
};

export const useAcceptOffer = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const acceptOffer = useCallback(
    async (
      signature: string,
      collectionOwner: string,
      collectionFee: string | number,
      assetAddress: string,
      tokenId: string,
      tokenAddress: string,
      offererAddress: string,
      offerPrice: string,
      contractAddress: string
    ) => {
      try {
        if (walletClient && publicClient) {
          const { hash } = await writeContract({
            address: contractAddress as `0x${string}`,
            abi: marketplaceAbi,
            functionName: "acceptOffer",
            args: [
              signature as `0x${string}`,
              collectionOwner as `0x${string}`,
              Number(collectionFee) * 100,
              assetAddress as `0x${string}`,
              BigInt(tokenId),
              tokenAddress as `0x${string}`,
              offererAddress as `0x${string}`,
              BigInt(offerPrice),
            ],
          });

          await waitForTransaction({ hash });
        }
      } catch (error: any) {
        toast.error(error.message);
        console.log(error.error);
        throw new Error(error);
      }
    },
    [publicClient, walletClient]
  );

  return { acceptOffer };
};
