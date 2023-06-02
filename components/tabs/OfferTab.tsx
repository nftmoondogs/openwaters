import React, { useState } from "react";
import Link from "next/link";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { switchNetwork, signTypedData, fetchBalance } from "@wagmi/core";
import { formatEther, zeroAddress } from "viem";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import { shortenAddress, isOwner } from "../../utils";
import { apiGetOfferSignature, apiOfferNft } from "../../utils/api";
import { useApproveForAll, useAcceptOffer } from "../../hooks/marketplace";

import CustomButton from "../CustomButton";
import {
  CHAIN_ID,
  MARKETPLACE_CONTRACT_ADDRESS,
  WOOF_TOKEN_ADDRESS,
  WCORE_TOKEN_ADDRESS,
} from "../../config/env";
import { useAppSelector } from "../../redux/store";

const OfferTab = ({
  offers,
  nftInfo,
}: {
  offers: GetOfferResponse;
  nftInfo: NFT;
}) => {
  const { tokenId, collection } = nftInfo;
  const { chain } = useNetwork();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { approveForAll } = useApproveForAll();
  const { acceptOffer } = useAcceptOffer();
  const userAccount = useAppSelector((state) => state.user);
  const myAddress = userAccount.address;
  const domain = {
    name: "Openwaters",
    version: "1",
    chainId: 1116,
    verifyingContract: MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
  } as const;

  const types = {
    Message: [
      { name: "collectionAddress", type: "address" },
      { name: "tokenId", type: "string" },
      { name: "price", type: "string" },
      { name: "currency", type: "string" },
    ],
  } as const;

  const handleAcceptOffer = async (index: number) => {
    if (!myAddress) {
      toast.warn("Please connect your wallet!");
      return;
    }
    const assetAddress = collection?.address;
    const collectionOwnerAddress = collection?.creator.address;
    const collectionFee = collection?.royalty;
    const offererAddress = offers.offers[index].offerer.address;
    const price = offers.offers[index].price;
    const tokenAddress =
      offers.offers[index]?.currency === "WOOF"
        ? WOOF_TOKEN_ADDRESS
        : offers.offers[index]?.currency === "WCORE"
        ? WCORE_TOKEN_ADDRESS
        : zeroAddress;
    try {
      setIsLoading(true);
      if (chain?.id !== CHAIN_ID) {
        await switchNetwork({ chainId: CHAIN_ID });
      }
      const signature = await apiGetOfferSignature(
        myAddress,
        collection.address,
        tokenId,
        tokenAddress,
        offererAddress
      );

      await approveForAll(MARKETPLACE_CONTRACT_ADDRESS as string, assetAddress);

      await acceptOffer(
        signature,
        collectionOwnerAddress,
        collectionFee,
        assetAddress,
        tokenId,
        tokenAddress,
        offererAddress,
        price,
        MARKETPLACE_CONTRACT_ADDRESS
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
    try {
      setIsLoading(true);
      if (chain?.id !== CHAIN_ID) {
        await switchNetwork({ chainId: CHAIN_ID });
      }

      const message = {
        collectionAddress: nftInfo?.collection?.address as `0x${string}`,
        tokenId: nftInfo?.tokenId,
        price: "0",
        currency: "WCORE",
      } as const;

      const signature = await signTypedData({
        domain,
        message,
        primaryType: "Message",
        types,
      });

      const res = await apiOfferNft({
        userAddress: myAddress,
        message: { domain, types, value: message },
        signature,
      });

      setIsLoading(false);
      window.location.reload();
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  // const filteredOffers = offers?.offers.filter(async (item, index) => {
  //   const tokenAddress =
  //     item.currency === "WOOF"
  //       ? WOOF_TOKEN_ADDRESS
  //       : item.currency === "WCORE"
  //       ? WCORE_TOKEN_ADDRESS
  //       : zeroAddress;
  //   const offererAddress = item.offerer.address;
  //   const balance = await fetchBalance({
  //     address: offererAddress as `0x${string}`,
  //     token: tokenAddress,
  //     chainId: CHAIN_ID,
  //   });
  //   console.log("why", BigInt(item.price) < (balance?.value ?? 0));
  //   return BigInt(item.price) < (balance?.value ?? 0);
  // });
  // console.log(filteredOffers);
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
            offers.offers.map((item, index) => {
              const { id, offerer, price, currency, createdAt } = item;
              return (
                <div className="contents" role="row" key={id}>
                  <div
                    className="flex items-center px-4 py-4 border-t dark:border-jacarta-600 border-jacarta-100 whitespace-nowrap gap-1"
                    role="cell"
                  >
                    <img
                      src={`/images/tokens/${currency}.png`}
                      alt="icon"
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium tracking-tight text-green">
                      {formatEther(BigInt(price))} {currency}
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
