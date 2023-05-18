import { useCallback } from "react";
import { ethers, BigNumber, ContractInterface } from "ethers";
import { useProvider, useSigner } from "wagmi";
import { readContractABI } from "../utils/contract";
import { toast } from "react-toastify";

export const useApprove = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const approve = useCallback(
    async (contractAddress: string, assetAddress: string) => {
      try {
        if (signer && provider) {
          const abi = await readContractABI("/contracts/ERC721.abi");
          const contract = new ethers.Contract(assetAddress, abi, signer);

          const isApproved = await contract.isApprovedForAll(
            await signer.getAddress(),
            contractAddress
          );
          if (!isApproved) {
            const tx = await contract.setApprovalForAll(contractAddress, true);
            await tx.wait();
          }
        }
      } catch (error: any) {
        toast.error(error.error.message);
        console.log(error.error);
        throw new Error(error);
      }
    },
    [provider, signer]
  );

  return { approve };
};

export const useListAsset = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const listAsset = useCallback(
    async (
      assetAddress: string,
      tokenId: number | string,
      contractAddress: string,
      price: number | string | BigNumber
    ) => {
      try {
        if (signer && provider) {
          const abi: ContractInterface = (await readContractABI(
            "/contracts/MarketplaceContract.abi"
          )) as ContractInterface;

          const contract = new ethers.Contract(contractAddress, abi, signer);
          const tx = await contract.listItem(
            assetAddress,
            tokenId,
            ethers.utils.parseEther(price.toString())
          );
          await tx.wait();
        }
      } catch (error: any) {
        toast.error(error.error.message);
        console.log(error.error);
        throw new Error(error);
      }
    },
    [provider, signer]
  );

  return { listAsset };
};

export const useEditList = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const editList = useCallback(
    async (
      assetAddress: string,
      tokenId: string | number,
      newPrice: number | string | BigNumber,
      contractAddress: string
    ) => {
      try {
        if (signer && provider) {
          const abi: ContractInterface = (await readContractABI(
            "/contracts/MarketplaceContract.abi"
          )) as ContractInterface;

          const contract = new ethers.Contract(contractAddress, abi, signer);

          const tx = await contract.updateListing(
            assetAddress,
            tokenId,
            ethers.utils.parseEther(newPrice.toString())
          );

          await tx.wait();
        }
      } catch (error: any) {
        toast.error(error.error.message);
        console.log(error.error);
        throw new Error(error);
      }
    },
    [provider, signer]
  );

  return { editList };
};

export const useCancelList = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const cancelList = useCallback(
    async (
      assetAddress: string,
      tokenId: number | string,
      contractAddress: string
    ) => {
      try {
        if (signer && provider) {
          const abi: ContractInterface = (await readContractABI(
            "/contracts/MarketplaceContract.abi"
          )) as ContractInterface;

          const contract = new ethers.Contract(contractAddress, abi, signer);

          const tx = await contract.cancelListing(assetAddress, tokenId);

          await tx.wait();
        }
      } catch (error: any) {
        toast.error(error.error.message);
        console.log(error.error);
        throw new Error(error);
      }
    },
    [signer, provider]
  );

  return { cancelList };
};

export const useBuyAsset = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const buyAsset = useCallback(
    async (
      signature: string,
      collectionOwnerAddress: string,
      collectionFee: number | string,
      assetAddress: string,
      tokenId: number | string,
      contractAddress: string,
      amount: number | string
    ) => {
      try {
        if (signer && provider) {
          const abi = await readContractABI(
            `/contracts/MarketplaceContract.abi`
          );
          const contract = new ethers.Contract(contractAddress, abi, signer);
          const tx = await contract.buyItem(
            signature,
            collectionOwnerAddress,
            Number(collectionFee) * 100,
            assetAddress,
            tokenId,
            {
              value: amount,
            }
          );
          await tx.wait();
        }
      } catch (error: any) {
        toast.error(error.data.message);
        console.log(error.error);
        throw new Error(error);
      }
    },
    [provider, signer]
  );

  return { buyAsset };
};

export const useOfferAsset = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const offerAsset = useCallback(
    async (
      assetAddress: string,
      tokenId: string | number,
      amount: number | string | BigNumber,
      contractAddress: string
    ) => {
      try {
        if (signer && provider) {
          const abi: ContractInterface = (await readContractABI(
            "/contracts/MarketplaceContract.abi"
          )) as ContractInterface;

          const contract = new ethers.Contract(contractAddress, abi, signer);
          const tx = await contract.makeOffer(
            assetAddress,
            tokenId,
            ethers.utils.parseEther(amount.toString()),
            { value: ethers.utils.parseEther(amount.toString()) }
          );
          await tx.wait();
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.data.message);
        throw new Error(error);
      }
    },
    [provider, signer]
  );

  return { offerAsset };
};

export const useCancelOffer = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const cancelOffer = useCallback(
    async (
      assetAddress: string,
      tokenId: string | number,
      contractAddress: string
    ) => {
      try {
        if (signer && provider) {
          const abi: ContractInterface = (await readContractABI(
            "/contracts/MarketplaceContract.abi"
          )) as ContractInterface;

          const contract = new ethers.Contract(contractAddress, abi, signer);
          const tx = await contract.cancelOffer(assetAddress, tokenId);
          await tx.wait();
        }
      } catch (error: any) {
        toast.error(error.error.message);
        console.log(error.error);
        throw new Error(error);
      }
    },
    [provider, signer]
  );

  return { cancelOffer };
};

export const useAcceptOffer = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const acceptOffer = useCallback(
    async (
      signature: string,
      assetAddress: string,
      tokenId: string | number,
      collectionOwner: string,
      collectionFee: string | number,
      offererAddress: string,
      contractAddress: string
    ) => {
      try {
        if (signer && provider) {
          const abi: ContractInterface = (await readContractABI(
            "/contracts/MarketplaceContract.abi"
          )) as ContractInterface;

          const contract = new ethers.Contract(contractAddress, abi, signer);
          const tx = await contract.acceptOffer(
            signature,
            assetAddress,
            tokenId,
            collectionOwner,
            Number(collectionFee) * 100,
            offererAddress
          );
          await tx.wait();
        }
      } catch (error: any) {
        toast.error(error.error.message);
        console.log(error.error);
        throw new Error(error);
      }
    },
    [provider, signer]
  );

  return { acceptOffer };
};
