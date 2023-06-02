import React, { useState, useEffect } from "react";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { switchNetwork, signTypedData } from "@wagmi/core";
import { formatEther, parseEther } from "viem";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { bidsModalHide } from "../../redux/modalSlice";
import { useApprove } from "../../hooks/marketplace";

import { replacePinataUrl } from "../../utils";
import { apiGetNftMetadata, apiOfferNft } from "../../utils/api";

import CustomButton from "../CustomButton";
import Dropdown from "../Dropdown";
import {
  MARKETPLACE_CONTRACT_ADDRESS,
  CHAIN_ID,
  WCORE_TOKEN_ADDRESS,
  WOOF_TOKEN_ADDRESS,
} from "../../config/env";

const BidsModal = () => {
  const { bidsModal } = useAppSelector((state) => state.modal);
  const userAccount = useAppSelector((state) => state.user);
  const nft = useAppSelector((state) => state.nft);
  const {
    id,
    collection,
    tokenId,
    owner,
    metadataUrl,
    metaData,
    price,
    currency,
    isListed,
  } = nft;
  const dispatch = useAppDispatch();

  const { chain } = useNetwork();
  const { address: myAddress } = useAccount();
  const { data: wcoreBalance } = useBalance({
    address: userAccount.address as `0x${string}`,
    token: WCORE_TOKEN_ADDRESS,
    chainId: CHAIN_ID,
  });
  const { data: woofBalance } = useBalance({
    address: userAccount.address as `0x${string}`,
    token: WOOF_TOKEN_ADDRESS,
    chainId: CHAIN_ID,
  });

  const [offerPrice, setOfferPrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<number>(0);
  const { approve } = useApprove();

  const tokens = [
    {
      name: "WCORE",
      address: WCORE_TOKEN_ADDRESS,
      component: (
        <>
          <img src="/images/tokens/WCORE.png" alt="icon" className="w-4 h-4" />
          <p className="text-sm font-bold">WCORE</p>
        </>
      ),
    },
    {
      name: "WOOF",
      address: WOOF_TOKEN_ADDRESS,
      component: (
        <>
          <img src="/images/tokens/WOOF.png" alt="icon" className="w-4 h-4" />
          <p className="text-sm font-bold">WOOF</p>
        </>
      ),
    },
  ];

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

  const handleHideModal = () => {
    dispatch(bidsModalHide());
  };
  const [metadataInfo, setMetadataInfo] = useState<any>();

  const handleOfferAsset = async () => {
    if (!myAddress) {
      toast.warn("Please connect your wallet!");
      return;
    }
    if (Number(offerPrice) <= 0) {
      toast.warn("Please input positive price.");
      return;
    }
    if (
      selectedToken === 0 &&
      Number(offerPrice) > Number(wcoreBalance?.formatted)
    ) {
      toast.warn("You don't have enough balance.");
      return;
    }
    if (
      selectedToken === 1 &&
      Number(offerPrice) > Number(woofBalance?.formatted)
    ) {
      toast.warn("You don't have enough balance.");
      return;
    }

    try {
      setIsLoading(true);

      if (chain?.id !== CHAIN_ID) {
        await switchNetwork({ chainId: CHAIN_ID });
      }

      const message = {
        collectionAddress: collection?.address as `0x${string}`,
        tokenId: nft?.tokenId,
        price: offerPrice,
        currency: tokens[selectedToken].name,
      } as const;

      const signature = await signTypedData({
        domain,
        message,
        primaryType: "Message",
        types,
      });
      await approve(
        tokens[selectedToken].address,
        userAccount.address as `0x${string}`,
        MARKETPLACE_CONTRACT_ADDRESS,
        parseEther(offerPrice as `${number}`)
      );
      const res = await apiOfferNft({
        userAddress: myAddress,
        message: { domain, types, value: message },
        signature,
      });

      // await offerAsset(
      //   assetAddress,
      //   tokenId,
      //   offerPrice,
      //   MARKETPLACE_CONTRACT_ADDRESS as string
      // );
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

              <div className="relative flex flex-col md:flex-row gap-5 py-4 border-t border-b dark:border-jacarta-600 border-jacarta-100">
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
                    <div className="mb-2">
                      <p>
                        Current Listed Price: {formatEther(BigInt(price))}{" "}
                        {currency}
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="mb-2">
                    <p>Offer for:</p>
                    <div className="relative flex items-center border rounded-lg dark:border-jacarta-600 border-jacarta-100">
                      <div className="flex items-center w-[112px] border-r border-r-jacarta-100 dark:border-r-jacarta-600">
                        <Dropdown
                          dropdownDefault={tokens[selectedToken].component}
                          items={tokens}
                          onSelect={setSelectedToken}
                        />
                      </div>

                      <input
                        type="number"
                        className="focus:ring-accent h-12 w-full flex-[3] border-0 focus:ring-inset bg-transparent"
                        placeholder="Amount"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-1 items-center justify-end text-xs">
                      <p>Balance:</p>
                      {selectedToken === 0 && (
                        <p>{wcoreBalance?.formatted} WCORE</p>
                      )}
                      {selectedToken === 1 && (
                        <p>{woofBalance?.formatted} WOOF</p>
                      )}
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
