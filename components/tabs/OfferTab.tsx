import React, { useState } from "react";
import Link from "next/link";
import { useAccount, useNetwork } from "wagmi";
import { switchNetwork } from "@wagmi/core";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import { shortenAddress, isOwner } from "../../utils";
import { apiGetBuySignature } from "../../utils/api";
import {
  useApprove,
  useAcceptOffer,
  useCancelOffer,
} from "../../hooks/marketplace";

import CustomButton from "../CustomButton";
import { CHAIN_ID, MARKETPLACE_CONTRACT_ADDRESS } from "../../config/env";
import { ethers } from "ethers";

const OfferTab = ({
  offers,
  nftInfo,
}: {
  offers: GetOfferResponse;
  nftInfo: NFT;
}) => {
  const { tokenId } = nftInfo;
  const { address: myAddress } = useAccount();
  const { chain } = useNetwork();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { approve } = useApprove();
  const { acceptOffer } = useAcceptOffer();
  const { cancelOffer } = useCancelOffer();
  const marketplaceContractAddress = MARKETPLACE_CONTRACT_ADDRESS;

  const handleAcceptOffer = async (index: number) => {
    if (!myAddress) {
      toast.warn("Please connect your wallet!");
      return;
    }
    const assetAddress = nftInfo?.collection?.address;
    const collectionOwnerAddress = nftInfo?.collection?.creator.address;
    const collectionFee = nftInfo?.collection?.royalty;
    const offererAddress = offers.offers[index].offerer.address;
    try {
      setIsLoading(true);
      if (chain?.id !== CHAIN_ID) {
        await switchNetwork({ chainId: CHAIN_ID });
      }
      const signature = await apiGetBuySignature(
        myAddress as string,
        nftInfo?.collection.address
      );
      await approve(marketplaceContractAddress as string, assetAddress);
      await acceptOffer(
        signature,
        assetAddress,
        tokenId as string,
        collectionOwnerAddress,
        collectionFee,
        offererAddress,
        marketplaceContractAddress as string
      );
      setIsLoading(false);
      window.location.reload();
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const handleCancelOffer = async () => {
    if (!myAddress) {
      toast.warn("Please connect your wallet!");
      return;
    }
    const assetAddress = nftInfo?.collection?.address;
    try {
      setIsLoading(true);
      if (chain?.id !== CHAIN_ID) {
        await switchNetwork({ chainId: CHAIN_ID });
      }
      await cancelOffer(
        assetAddress,
        tokenId as string,
        marketplaceContractAddress as string
      );
      setIsLoading(false);
      window.location.reload();
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <!-- Offers --> */}
      <div
        className="tab-pane fade show active"
        id="offers"
        role="tabpanel"
        aria-labelledby="offers-tab"
      >
        <div
          role="table"
          className="grid w-full grid-cols-4 overflow-y-auto text-sm bg-white border rounded-lg rounded-tl-none scrollbar-custom dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 max-h-72 dark:text-white"
        >
          <div className="contents" role="row">
            <div
              className="sticky top-0 px-4 py-2 dark:bg-jacarta-600 bg-light-base"
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                Price
              </span>
            </div>
            <div
              className="sticky top-0 px-4 py-2 dark:bg-jacarta-600 bg-light-base"
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                From
              </span>
            </div>
            <div
              className="sticky top-0 px-4 py-2 dark:bg-jacarta-600 bg-light-base"
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                Date
              </span>
            </div>
            <div
              className="sticky top-0 px-4 py-2 dark:bg-jacarta-600 bg-light-base"
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                Action
              </span>
            </div>
          </div>
          {offers.count ? (
            offers?.offers.map((item, index) => {
              const {
                id,
                collectionAddress,
                tokenId,
                offerer,
                price,
                txHash,
                timestamp,
                createdAt,
              } = item;
              return (
                <div className="contents" role="row" key={id}>
                  <div
                    className="flex items-center px-4 py-4 border-t dark:border-jacarta-600 border-jacarta-100 whitespace-nowrap gap-1"
                    role="cell"
                  >
                    <img src="/svg/core-icon.svg" alt="icon" />
                    <span className="text-sm font-medium tracking-tight text-green">
                      {ethers.utils.formatEther(price)}{" "}
                      {chain?.nativeCurrency?.symbol}
                    </span>
                  </div>
                  <div
                    className="flex items-center px-4 py-4 border-t dark:border-jacarta-600 border-jacarta-100"
                    role="cell"
                  >
                    <Link href={`/profile/${offerer?.address}`}>
                      <span className="hover:text-accent cursor-pointer">
                        {offerer?.name || shortenAddress(offerer?.address)}
                      </span>
                    </Link>
                  </div>
                  <div
                    className="flex items-center px-4 py-4 border-t dark:border-jacarta-600 border-jacarta-100"
                    role="cell"
                  >
                    {new Date(createdAt).toLocaleDateString()}
                  </div>
                  <div
                    className="flex items-center px-4 py-4 border-t dark:border-jacarta-600 border-jacarta-100"
                    role="cell"
                  >
                    {isOwner(nftInfo, myAddress as string) ? (
                      <CustomButton
                        className="w-full"
                        onClick={() => handleAcceptOffer(index)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <ClipLoader size={16} color="#ffffff" />
                        ) : (
                          "Accept"
                        )}
                      </CustomButton>
                    ) : (
                      item.offerer.address.toUpperCase() ===
                        myAddress?.toUpperCase() && (
                        <CustomButton
                          className="w-full"
                          onClick={handleCancelOffer}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <ClipLoader size={16} color="#ffffff" />
                          ) : (
                            "Cancel"
                          )}
                        </CustomButton>
                      )
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center px-4 py-4 border-t dark:border-jacarta-600 border-jacarta-100 whitespace-nowrap">
              No Offers
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OfferTab;
