import React, { useState, useEffect } from "react";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { switchNetwork } from "@wagmi/core";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { bidsModalHide } from "../../redux/modalSlice";
import { useOfferAsset } from "../../hooks/marketplace";

import { replacePinataUrl } from "../../utils";
import { apiGetNftMetadata } from "../../utils/api";

import CustomButton from "../CustomButton";
import { MARKETPLACE_CONTRACT_ADDRESS, CHAIN_ID } from "../../config/env";

const BidsModal = () => {
  const { bidsModal } = useAppSelector((state) => state.modal);
  const userAccount = useAppSelector((state) => state.user);
  const { address: myAddress } = useAccount();
  const dispatch = useAppDispatch();
  const { data } = useBalance({
    address: userAccount.address as `0x${string}`,
  });
  const { chain } = useNetwork();
  const { offerAsset } = useOfferAsset();
  const [offerPrice, setOfferPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nft = useAppSelector((state) => state.nft);
  const {
    id,
    collection,
    tokenId,
    owner,
    metadataUrl,
    metaData,
    price,
    isListed,
  } = nft;
  const marketplaceContractAddress = MARKETPLACE_CONTRACT_ADDRESS;
  const handleHideModal = () => {
    dispatch(bidsModalHide());
  };
  const [metadataInfo, setMetadataInfo] = useState<any>();

  const handleOfferAsset = async () => {
    if (!myAddress) {
      toast.warn("Please connect your wallet!");
      return;
    }
    if (offerPrice <= 0) {
      toast.warn("Please input positive price.");
      return;
    }
    const assetAddress = collection?.address;
    try {
      setIsLoading(true);
      if (chain?.id !== CHAIN_ID) {
        await switchNetwork({ chainId: CHAIN_ID });
      }
      await offerAsset(
        assetAddress,
        tokenId,
        offerPrice,
        marketplaceContractAddress as string
      );
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (metaData) {
          setMetadataInfo(JSON.parse(metaData));
        } else {
          if (metadataUrl && collection?.address && tokenId !== undefined) {
            const res = await apiGetNftMetadata(
              metadataUrl,
              collection.address,
              tokenId
            );
            setMetadataInfo(res);
          }
        }
      } catch (error) {}
    })();
  }, [metaData, tokenId, collection?.address]);

  return (
    <div>
      <div className={bidsModal ? "modal fade show block" : "modal fade"}>
        <div className="max-w-2xl modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="buyNowModalLabel">
                Make Offer
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleHideModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="w-6 h-6 fill-jacarta-700 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>

            <div className="p-6 modal-body">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold font-display text-jacarta-700 dark:text-white">
                  Item
                </span>
              </div>

              <div className="relative flex py-4 border-t border-b dark:border-jacarta-600 border-jacarta-100">
                <figure className="self-start mr-5">
                  <img
                    src={
                      replacePinataUrl(metadataInfo?.image) ||
                      "/images/default/nft_default.jpg"
                    }
                    alt="image"
                    className="w-full h-[230px] object-cover"
                    loading="lazy"
                  />
                </figure>

                <div className="flex flex-col justify-between">
                  {/* <div>
                    <p className="flex gap-2">
                      Created By:
                      <Link href={`/profile/${collection?.creator?.address}`}>
                        <p className="hover:text-accent-dark font-bold cursor-pointer">
                          {collection?.creator?.name ||
                            shortenAddress(collection?.creator?.address)}
                        </p>
                      </Link>
                    </p>
                    <div className="flex flex-wrap items-center">
                      <span className="block mr-1 text-sm dark:text-jacarta-300 text-jacarta-500">
                        Creator Earnings: {collection?.royalty} %
                      </span>
                      <span data-tippy-content="The creator of this collection will receive 5% of the sale total from future sales of this item.">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="w-4 h-4 dark:fill-jacarta-300 fill-jacarta-700"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
                        </svg>
                      </span>
                    </div>
                  </div> */}

                  <h3 className="mb-1 text-base font-semibold font-display text-jacarta-700 dark:text-white">
                    {metadataInfo?.name || "Unnamed"}
                  </h3>
                  {isListed ? (
                    <div>
                      <p>
                        Current Listed Price: {ethers.utils.formatEther(price)}{" "}
                        {data?.symbol}
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}

                  <div>
                    <p>Offer for:</p>
                    <div className="relative flex items-center mb-2 overflow-hidden border rounded-lg dark:border-jacarta-600 border-jacarta-100">
                      <div className="flex items-center justify-center flex-1 px-2">
                        <img
                          src="/svg/core-icon.svg"
                          alt="icon"
                          className="w-4 h-4 mr-1 icon"
                        />
                        <p className="text-sm font-bold">{data?.symbol}</p>
                      </div>

                      <input
                        type="number"
                        className="focus:ring-accent h-12 w-full flex-[3] border-0 focus:ring-inset bg-transparent"
                        placeholder="Amount"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <CustomButton onClick={handleOfferAsset} disabled={isLoading}>
                    Make Offer
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsModal;
