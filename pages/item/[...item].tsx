import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAccount, useNetwork } from "wagmi";
import { switchNetwork } from "@wagmi/core";
import { ethers } from "ethers";

import { useAppDispatch } from "../../redux/store";
import { bidsModalShow, listModalShow } from "../../redux/modalSlice";
import { setNft } from "../../redux/nftSlice";
import { useBuyAsset } from "../../hooks/marketplace";

import {
  isOwner,
  checkOffered,
  shortenAddress,
  replacePinataUrl,
} from "../../utils";
import {
  apiGetNft,
  apiGetBuySignature,
  apiGetOffersForAsset,
  apiGetNftHistory,
  apiGetNftMetadata,
} from "../../utils/api";

import Meta from "../../components/Meta";
import CustomButton from "../../components/CustomButton";
import ItemsTabs from "../../components/tabs/Tabs";
import {
  CDN_URL,
  CHAIN_ID,
  MARKETPLACE_CONTRACT_ADDRESS,
} from "../../config/env";
import { toast } from "react-toastify";

const Item = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { item } = router.query;
  const collectionAddress = item && item[0];
  const tokenId = item && item[1];
  const [nftInfo, setNftInfo] = useState<any>({});
  const [nftHistory, setNftHistory] = useState<Transaction[]>([]);
  const [imageModal, setImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offers, setOffers] = useState<GetOfferResponse>({
    offers: [],
    count: 0,
  });
  const { address: myAddress } = useAccount();
  const { chain } = useNetwork();
  const { buyAsset } = useBuyAsset();
  const [metadataInfo, setMetadataInfo] = useState<any>();
  const marketplaceContractAddress = MARKETPLACE_CONTRACT_ADDRESS;

  const handleOpenListModal = () => {
    dispatch(listModalShow());
    dispatch(setNft({ ...nftInfo }));
  };
  const handleOpenBidModal = () => {
    dispatch(bidsModalShow());
    dispatch(setNft({ ...nftInfo }));
  };

  const handleBuyAsset = async () => {
    const collectionOwnerAddress = nftInfo?.collection?.creator?.address;
    const collectionFee = nftInfo?.collection?.royalty;
    const assetAddress = nftInfo?.collection?.address;
    const price = nftInfo?.price;
    try {
      if (!myAddress) {
        toast.warn("Please connect your wallet!");
        return;
      }
      setIsLoading(true);
      if (chain?.id !== CHAIN_ID) {
        await switchNetwork({ chainId: CHAIN_ID });
      }
      const signature = await apiGetBuySignature(
        myAddress as string,
        assetAddress
      );
      await buyAsset(
        signature,
        collectionOwnerAddress,
        collectionFee,
        assetAddress,
        tokenId as string,
        marketplaceContractAddress as string,
        price
      );
      setIsLoading(false);
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (collectionAddress && tokenId !== undefined) {
          const res = await apiGetNft(
            collectionAddress as string,
            tokenId as string
          );
          setNftInfo(res);
        }
      } catch (error) {}
    })();
  }, [collectionAddress, tokenId]);

  useEffect(() => {
    (async () => {
      try {
        if (collectionAddress && tokenId !== undefined) {
          const res = await apiGetOffersForAsset(collectionAddress, tokenId);
          setOffers(res);
        }
      } catch (error) {}
    })();
  }, [collectionAddress, tokenId]);

  useEffect(() => {
    (async () => {
      try {
        if (collectionAddress && tokenId !== undefined) {
          const res = await apiGetNftHistory(collectionAddress, tokenId);
          setNftHistory(res.transactions);
        }
      } catch (error) {}
    })();
  }, [collectionAddress, tokenId]);

  useEffect(() => {
    (async () => {
      try {
        if (nftInfo?.metaData) {
          setMetadataInfo(JSON.parse(nftInfo.metaData));
        } else {
          if (
            nftInfo?.metadataUrl &&
            nftInfo?.collection?.address &&
            nftInfo?.tokenId !== undefined
          ) {
            const res = await apiGetNftMetadata(
              nftInfo.metadataUrl,
              nftInfo.collection.address,
              nftInfo.tokenId
            );
            setMetadataInfo(res);
          }
        }
      } catch (error) {}
    })();
  }, [nftInfo]);

  return (
    <>
      <Meta
        title={`${item && (item[1] as string)} | ${
          item && (item[0] as string)
        } || Moondogs | NFT Marketplace`}
      />
      {/*  <!-- Item --> */}
      <section className="relative pt-12 pb-24 mt-24 lg:mt-24 lg:pt-24 lg:pb-24">
        <picture className="absolute inset-0 pointer-events-none -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full"
          />
        </picture>
        <div className="container">
          {/* <!-- Item --> */}

          <div className="md:flex md:flex-wrap">
            {/* <!-- Image --> */}
            <figure className="w-full mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2">
              <button className="w-full " onClick={() => setImageModal(true)}>
                <img
                  src={
                    replacePinataUrl(metadataInfo?.image) ||
                    "/images/default/nft_default.jpg"
                  }
                  alt={nftInfo?.collection?.name || "Unnamed"}
                  className="w-full cursor-pointer rounded-2xl"
                />
              </button>

              {/* <!-- Modal --> */}
              <div
                className={imageModal ? "modal fade show block" : "modal fade"}
              >
                <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
                  <img
                    src={
                      replacePinataUrl(metadataInfo?.image) ||
                      "/images/default/nft_default.jpg"
                    }
                    alt={nftInfo?.collection?.name || "Unnamed"}
                    className="h-full w-full object-contain rounded-2xl"
                  />
                </div>

                <button
                  type="button"
                  className="absolute btn-close top-6 right-6"
                  onClick={() => setImageModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="w-6 h-6 fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                  </svg>
                </button>
              </div>
              {/* <!-- end modal --> */}
            </figure>

            {/* <!-- Details --> */}
            <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
              {/* <!-- Collection / Likes / Actions --> */}
              <div className="flex mb-3">
                {/* <!-- Collection --> */}
                <div className="flex items-center">
                  <Link href={`/collection/${nftInfo?.collection?.address}`}>
                    <a className="mr-2 text-sm font-bold text-accent">
                      {nftInfo?.collection?.name || "Unnamed"}
                    </a>
                  </Link>
                </div>

                {/* <!-- Likes / Actions --> */}
                {/* <div className="relative flex items-stretch ml-auto space-x-2">
                  <Likes
                    like={nftInfo?.likedByUsers?.length}
                    classes="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 flex items-center space-x-1 rounded-xl border bg-white py-2 px-4"
                  />
                </div> */}
              </div>

              <h1 className="mb-4 text-4xl font-semibold font-display text-jacarta-700 dark:text-white">
                {metadataInfo?.name || "Unnamed"}
              </h1>
              {nftInfo?.isListed && (
                <div className="flex items-center mb-8 space-x-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="-ml-1">
                      <img
                        src="/svg/core-icon.svg"
                        alt="icon"
                        className="w-4 h-4 mr-1 icon"
                      />
                    </span>
                    <span className="text-sm font-medium tracking-tight text-green">
                      {ethers.utils.formatEther(nftInfo?.price) || 0} CORE
                    </span>
                  </div>
                </div>
              )}

              <p className="mb-10 dark:text-jacarta-300">
                {metadataInfo?.description}
              </p>

              {/* <!-- Creator / Owner --> */}
              <div className="flex flex-wrap mb-8">
                <div className="flex mb-4 mr-8">
                  <figure className="mr-4 shrink-0">
                    <img
                      src={
                        nftInfo?.collection?.creator?.profileImage
                          ? `${CDN_URL}/${nftInfo?.collection?.creator?.profileImage}`
                          : "/images/default/profile_avatar_default.png"
                      }
                      alt={nftInfo?.collection?.creator?.name || "Unnamed"}
                      loading="lazy"
                      className="rounded-2lg w-[48px] h-[48px] object-cover"
                    />
                  </figure>
                  <div className="flex flex-col justify-center">
                    <span className="block text-sm text-jacarta-400 dark:text-white">
                      Creator{" "}
                      <strong>{nftInfo?.collection?.royalty}% royalties</strong>
                    </span>
                    <Link
                      href={`/profile/${nftInfo?.collection?.creator?.address}`}
                    >
                      <span className="text-sm font-bold hover:text-accent cursor-pointer">
                        {nftInfo?.collection?.creator?.name ||
                          shortenAddress(nftInfo?.collection?.creator?.address)}
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="flex mb-4">
                  <figure className="mr-4 shrink-0">
                    <img
                      src={
                        nftInfo?.owner?.profileImage
                          ? `${CDN_URL}/${nftInfo?.owner?.profileImage}`
                          : "/images/default/profile_avatar_default.png"
                      }
                      alt={nftInfo?.owner?.name || "Unnamed"}
                      className="rounded-2lg w-[48px] h-[48px] object-cover"
                      loading="lazy"
                    />
                  </figure>
                  <div className="flex flex-col justify-center">
                    <span className="block text-sm text-jacarta-400 dark:text-white">
                      Owned by
                    </span>
                    <Link href={`/profile/${nftInfo?.owner?.address}`}>
                      <span className="text-sm font-bold hover:text-accent cursor-pointer">
                        {nftInfo?.owner?.name ||
                          shortenAddress(nftInfo?.owner?.address)}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* <!-- Bid --> */}
              <div className="flex items-center gap-3 mt-8">
                {isOwner(nftInfo, myAddress as string) ? (
                  nftInfo?.isListed ? (
                    <CustomButton onClick={handleOpenListModal}>
                      Edit Listing
                    </CustomButton>
                  ) : (
                    <CustomButton onClick={handleOpenListModal}>
                      List for Sale
                    </CustomButton>
                  )
                ) : (
                  <>
                    {nftInfo?.isListed && (
                      <CustomButton
                        onClick={handleBuyAsset}
                        disabled={isLoading}
                      >
                        Buy Now
                      </CustomButton>
                    )}
                    {/* {!checkOffered(offers.offers, myAddress as string) && (
                      <CustomButton onClick={handleOpenBidModal}>
                        Make Offer
                      </CustomButton>
                    )} */}
                  </>
                )}
              </div>
            </div>
          </div>
          <ItemsTabs
            offers={offers}
            nftHistory={nftHistory}
            nftInfo={nftInfo}
          />
        </div>
      </section>
    </>
  );
};

export default Item;
