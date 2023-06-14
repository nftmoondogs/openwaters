/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { apiGetAllCollections } from "../../utils/api";

import Meta from "../../components/Meta";
import HeadLine from "../../components/headLine";
import CollectionCard from "../../components/CollectionCard";
import { useAppSelector } from "../../redux/store";

const Explore_collection = () => {
  const [allCollections, setAllCollecitons] = useState<GetCollectionResponse>({
    collections: [],
    count: 0,
    floorPrices: [],
    volumes: [],
  });
  const [count, setCount] = useState<number>(0);
  const tokenPrice = useAppSelector((state) => state.tokenPrice);
  const fetchMore = async () => {
    try {
      const res = await apiGetAllCollections(
        tokenPrice.woofPrice,
        allCollections.collections.length
      );
      setAllCollecitons({
        ...allCollections,
        collections: allCollections.collections.concat(res.collections),
        floorPrices: allCollections.floorPrices.concat(res.floorPrices),
        volumes: allCollections.volumes.concat(res.volumes),
      });
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetAllCollections(tokenPrice.woofPrice);
        setAllCollecitons(res);
        setCount(res.count);
      } catch (error) {}
    })();
  }, []);

  return (
    <>
      <Meta title="Explore Collection || Moondogs | NFT Marketplace" />
      <section className="relative pb-24 mt-24 lg:pb-48">
        <picture className="absolute inset-0 pointer-events-none -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full"
          />
        </picture>

        <div className="container">
          <HeadLine
            text="Explore Collections"
            classes="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white"
            image={""}
            pera={""}
          />

          {/* <!-- Grid --> */}
          {allCollections && (
            <InfiniteScroll
              dataLength={allCollections.collections.length}
              loader={
                <p className="text-center text-lg font-bold p-6">Loading...</p>
              }
              next={fetchMore}
              hasMore={allCollections.collections.length < count}
            >
              <div className="grid grid-cols-1">
                {allCollections.collections.map((collection, index) => {
                  return (
                    <CollectionCard
                      collection={collection}
                      floorPrice={allCollections.floorPrices[index]}
                      volumes={allCollections.volumes[index]}
                      rank={index}
                      key={index}
                    />
                  );
                })}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </section>
    </>
  );
};

export default Explore_collection;
