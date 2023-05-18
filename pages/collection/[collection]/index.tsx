import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

import { useAppSelector } from "../../../redux/store";
import { isCreator, shortenAddress } from "../../../utils";
import {
  apiGetCollection,
  apiGetCollectionNfts,
  apiGetCollectionHistory,
} from "../../../utils/api";

import Meta from "../../../components/Meta";
import NftCard from "../../../components/NftCard";
import Activity_tab from "../../../components/tabs/Activity_tab";
import { CDN_URL, EXPLORER_URL } from "../../../config/env";

const Collection = () => {
  const router = useRouter();
  const { collection } = router.query;
  const [collectionNfts, setCollectionNfts] = useState<NFT[]>([]);
  const [nftsCount, setNftsCount] = useState<number>(0);
  const [collectionInfo, setCollectionInfo] = useState<any>({});
  const [collectionHistory, setCollectionHistory] = useState<Transaction[]>([]);
  const [historyCount, setHistoryCount] = useState<number>(0);
  const userAccount = useAppSelector((state) => state.user);

  const tabsHeadText = [
    {
      id: 1,
      text: "Activities",
      icon: "activity",
    },
  ];

  const fetchMoreNfts = async () => {
    try {
      if (collection) {
        const res = await apiGetCollectionNfts(
          collection as string,
          collectionNfts.length
        );
        if (res) {
          setCollectionNfts(collectionNfts.concat(res.nfts));
        }
      }
    } catch (error) {}
  };

  const fetchMoreHistory = async () => {
    try {
      if (collection) {
        const res = await apiGetCollectionHistory(
          collection as string,
          collectionHistory.length
        );
        if (res) {
          setCollectionHistory(collectionHistory.concat(res.transactions));
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      try {
        if (collection) {
          const res = await apiGetCollection(collection as string);
          if (res) {
            setCollectionInfo(res.collections[0]);
          }
        }
      } catch (error) {}
    })();
  }, [collection]);

  useEffect(() => {
    (async () => {
      try {
        if (collection) {
          const res = await apiGetCollectionNfts(collection as string);
          if (res) {
            setCollectionNfts(res.nfts);
            setNftsCount(res.count);
          }
        }
      } catch (error) {}
    })();
  }, [collection]);

  useEffect(() => {
    (async () => {
      try {
        if (collection) {
          const res = await apiGetCollectionHistory(collection as string);
          if (res) {
            setCollectionHistory(res.transactions);
            setHistoryCount(res.count);
          }
        }
      } catch (error) {}
    })();
  }, [collection]);

  return (
    <div>
      <Meta
        title={`${
          collectionInfo?.name || "Collection"
        } || Moondogs | NFT Marketplace`}
      />

      <div className="pt-[5.5rem] lg:pt-24">
        {/* <!-- Banner --> */}
        <div className="relative h-[300px]">
          <img
            src={
              collectionInfo?.bannerImage
                ? `${CDN_URL}/${collectionInfo.bannerImage}`
                : "/images/default/collection_banner_default.png"
            }
            alt="banner"
            className="object-cover w-full h-full absolute top-1/2 -translate-y-1/2"
          />
        </div>
        {/* <!-- end banner --> */}
        {/* <!-- Profile --> */}
        <section className="relative pb-12 dark:bg-jacarta-800 bg-light-base pt-28">
          {/* <!-- Avatar --> */}
          <div className="absolute top-0 z-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 left-1/2">
            <figure className="relative h-40 w-40">
              <div className="relative">
                <img
                  src={
                    collectionInfo?.profileImage
                      ? `${CDN_URL}/${collectionInfo.profileImage}`
                      : "/images/default/collection_avatar_default.png"
                  }
                  alt={collectionInfo?.name}
                  className="dark:border-jacarta-600 border-[5px] border-white rounded-xl object-cover bg-white"
                />
                {collectionInfo?.profileImage ? (
                  <></>
                ) : (
                  <p className="absolute top-1/2 -translate-y-1/2 w-full text-center px-3 break-words text-xl text-jacarta-700 font-bold">
                    {collectionInfo?.name || "Unnamed"}
                  </p>
                )}
              </div>
              <div
                className="absolute bottom-0 flex items-center justify-center w-6 h-6 border-2 border-white rounded-full dark:border-jacarta-600 bg-green -right-3"
                data-tippy-content="Verified Collection"
              >
                {collectionInfo?.verified && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-[.875rem] w-[.875rem] fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                  </svg>
                )}
              </div>
            </figure>
          </div>

          <div className="container">
            <div className="text-center">
              <h2 className="mb-2 text-4xl font-medium font-display text-jacarta-700 dark:text-white">
                {collectionInfo?.name}
              </h2>
              <div className="mb-8">
                <span className="text-sm font-bold text-jacarta-400">
                  Created by{" "}
                </span>
                <Link href={`/profile/${collectionInfo?.creator?.address}`}>
                  <p className="hover:text-accent-dark font-bold cursor-pointer w-fit mx-auto">
                    {collectionInfo?.creator?.name ||
                      shortenAddress(collectionInfo?.creator?.address)}
                  </p>
                </Link>
              </div>

              <div className="inline-flex flex-wrap items-center justify-center mb-8 bg-white border dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 rounded-xl">
                <div className="w-1/2 py-4 border-r dark:border-jacarta-600 border-jacarta-100 rounded-l-xl hover:shadow-md sm:w-32">
                  <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                    Total Items
                  </div>
                  <div className="font-medium tracking-tight text-2xs dark:text-jacarta-400">
                    {nftsCount}
                  </div>
                </div>
                <div className="w-1/2 py-4 border-r dark:border-jacarta-600 border-jacarta-100 rounded-l-xl hover:shadow-md sm:w-32">
                  <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                    Contract
                  </div>
                  <a
                    href={
                      EXPLORER_URL +
                      "/address/" +
                      collectionInfo?.address +
                      "#code"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium tracking-tight cursor-pointer text-accent text-2xs"
                  >
                    {shortenAddress(collectionInfo?.address)}
                  </a>
                </div>
                <div className="w-1/2 py-4 border-r dark:border-jacarta-600 border-jacarta-100 rounded-l-xl hover:shadow-md sm:w-32">
                  <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                    Royalty Fee
                  </div>
                  <div className="font-medium tracking-tight text-2xs dark:text-jacarta-400">
                    {collectionInfo?.royalty} %
                  </div>
                </div>
                <div className="w-1/2 py-4 border-r dark:border-jacarta-600 border-jacarta-100 rounded-l-xl hover:shadow-md sm:w-32">
                  <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                    Total volume
                  </div>
                  <div className="font-medium tracking-tight text-2xs dark:text-jacarta-400">
                    {collectionInfo?.volume} Core
                  </div>
                </div>
              </div>
              {collectionInfo?.bio ? (
                <p className="max-w-xl mx-auto my-3 text-lg dark:text-jacarta-300">
                  {collectionInfo?.bio}
                </p>
              ) : (
                <></>
              )}
              {isCreator(collectionInfo, userAccount.address) && (
                <div className="flex items-center justify-center mb-6">
                  <Link href={`/collection/${collection}/edit`}>
                    <span className="cursor-pointer p-2 bg-white flex items-center justify-center border rounded">
                      <Image src={`/svg/edit.svg`} width={20} height={20} />
                    </span>
                  </Link>
                </div>
              )}
            </div>
            <div className="mb-6">
              <Tabs className="min-w-fit tabs">
                <TabList className="flex items-center nav nav-tabs">
                  {tabsHeadText?.map(({ id, text, icon }) => (
                    <Tab className="bg-transparent nav-item" key={id}>
                      <button
                        className={
                          // tabsActive === id
                          "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                          // : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                        }
                        // onClick={() => setTabsActive(id)}
                      >
                        <svg className="w-5 h-5 mr-1 fill-current icon">
                          <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                        </svg>
                        <span className="text-base font-medium font-display">
                          {text}
                        </span>
                      </button>
                    </Tab>
                  ))}
                </TabList>
                <TabPanel>
                  <div id="" className="">
                    <InfiniteScroll
                      dataLength={collectionHistory.length}
                      loader={<p className="text-center"></p>}
                      next={fetchMoreHistory}
                      hasMore={collectionHistory.length < historyCount}
                      scrollableTarget="scrollableDiv"
                    >
                      <Activity_tab
                        history={collectionHistory}
                        showItems={true}
                      />
                    </InfiniteScroll>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
            {collectionNfts && (
              <InfiniteScroll
                dataLength={collectionNfts.length}
                loader={
                  <p className="text-center text-lg font-bold p-6">
                    Loading...
                  </p>
                }
                next={fetchMoreNfts}
                hasMore={collectionNfts.length < nftsCount}
              >
                <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3 lg:grid-cols-4">
                  {collectionNfts.map((nft, index) => {
                    return <NftCard nft={nft} key={index} />;
                  })}
                </div>
              </InfiniteScroll>
            )}
          </div>
        </section>
        {/* <!-- end profile --> */}
      </div>
    </div>
  );
};

export default Collection;
