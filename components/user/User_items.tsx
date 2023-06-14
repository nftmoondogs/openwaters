import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import InfiniteScroll from "react-infinite-scroll-component";

import { apiGetOwnedNfts, apiGetOwnedCollections } from "../../utils/api";

import NftCard from "../NftCard";
import CollectionCard from "../CollectionCard";

const User_items = ({ userAddress }: { userAddress: string }) => {
  const [itemActive, setItemActive] = useState(1);
  const [userNfts, setUserNfts] = useState<NFT[]>([]);
  const [nftCount, setNftCount] = useState<number>(0);
  const [userCollections, setUserCollections] = useState<GetCollectionResponse>(
    { collections: [], count: 0, volumes: [], floorPrices: [] }
  );
  const [collectionCount, setCollectionCount] = useState<number>(0);

  const fetchMoreNfts = async () => {
    try {
      if (userAddress) {
        const res = await apiGetOwnedNfts(userAddress, userNfts.length);
        if (res) {
          setUserNfts(userNfts.concat(res.nfts));
        }
      }
    } catch (error) {}
  };
  const fetchMoreCollections = async () => {
    try {
      if (userAddress) {
        const res = await apiGetOwnedCollections(
          userAddress,
          userCollections.collections.length
        );
        if (res) {
          setUserCollections({
            ...userCollections,
            collections: userCollections.collections.concat(res.collections),
            volumes: userCollections.volumes.concat(res.volumes),
            floorPrices: userCollections.floorPrices.concat(res.floorPrices),
          });
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    (async () => {
      try {
        if (userAddress) {
          const res = await apiGetOwnedNfts(userAddress);
          if (res) {
            setUserNfts(res.nfts);
            setNftCount(res.count);
          }
        }
      } catch (error) {}
    })();
  }, [userAddress]);

  useEffect(() => {
    (async () => {
      try {
        if (userAddress) {
          const res = await apiGetOwnedCollections(userAddress);
          if (res) {
            setUserCollections(res);
            setCollectionCount(res.count);
          }
        }
      } catch (error) {}
    })();
  }, [userAddress]);

  const tabItem = [
    {
      id: 1,
      text: "owned",
      icon: "owned",
    },
    {
      id: 2,
      text: "collections",
      icon: "listing",
    },
  ];

  return (
    <>
      <section className="relative py-24">
        <picture className="absolute inset-0 pointer-events-none -z-10 dark:hidden">
          {/* <img src="img/gradient_light.jpg" alt="gradient" className="w-full h-full" /> */}
          <Image
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="w-full h-full"
            layout="fill"
          />
        </picture>
        <div className="container">
          {/* <!-- Tabs Nav --> */}
          <Tabs className="tabs">
            <TabList className="flex items-center justify-start pb-px mb-12 overflow-x-auto overflow-y-hidden border-b nav nav-tabs scrollbar-custom border-jacarta-100 dark:border-jacarta-600 md:justify-center">
              {tabItem?.map(({ id, text, icon }) => {
                return (
                  <Tab
                    className="nav-item"
                    role="presentation"
                    key={id}
                    onClick={() => setItemActive(id)}
                  >
                    <button
                      className={
                        itemActive === id
                          ? "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                          : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                      }
                    >
                      <svg className="w-5 h-5 mr-1 fill-current icon">
                        <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                      </svg>
                      <span className="text-base font-medium font-display">
                        {text}
                      </span>
                    </button>
                  </Tab>
                );
              })}
            </TabList>

            {/* <TabPanel>
              <div>
                {userNfts && (
                  <InfiniteScroll
                    dataLength={userNfts.length}
                    loader={
                      <p className="text-center text-lg font-bold p-6">
                        Loading...
                      </p>
                    }
                    next={fetchMoreNfts}
                    hasMore={userNfts.length < nftCount}
                  >
                    <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3 lg:grid-cols-4">
                      {userNfts.map((nft, index) => (
                        <NftCard nft={nft} key={index} />
                      ))}
                    </div>
                  </InfiniteScroll>
                )}
              </div>
            </TabPanel> */}
            <TabPanel>
              <div>
                {/* <!-- Filter --> */}
                {userNfts && (
                  <InfiniteScroll
                    dataLength={userNfts.length}
                    loader={
                      <p className="text-center text-lg font-bold p-6">
                        Loading...
                      </p>
                    }
                    next={fetchMoreNfts}
                    hasMore={userNfts.length < nftCount}
                  >
                    <div className="grid grid-cols-2 gap-1 md:gap-[30px] md:grid-cols-3 lg:grid-cols-4">
                      {userNfts.map((nft, index) => (
                        <NftCard nft={nft} key={index} />
                      ))}
                    </div>
                  </InfiniteScroll>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              {/* <!-- Grid --> */}
              <InfiniteScroll
                dataLength={userCollections.collections.length}
                loader={
                  <p className="text-center text-lg font-bold p-6">
                    Loading...
                  </p>
                }
                next={fetchMoreCollections}
                hasMore={userCollections.collections.length < collectionCount}
              >
                <div className="grid grid-cols-1">
                  {userCollections.collections.map((collection, index) => {
                    return (
                      <CollectionCard
                        collection={collection}
                        key={index}
                        floorPrice={userCollections.floorPrices[index]}
                        volumes={userCollections.volumes[index]}
                        rank={index}
                      />
                    );
                  })}
                </div>
              </InfiniteScroll>
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default User_items;
