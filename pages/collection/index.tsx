/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { apiGetAllCollections } from "../../utils/api";

import Meta from "../../components/Meta";
import HeadLine from "../../components/headLine";
import CollectionCard from "../../components/CollectionCard";

const Explore_collection = () => {
  const [allCollections, setAllCollecitons] = useState<Collection[]>([]);
  const [count, setCount] = useState<number>(0);

  const fetchMore = async () => {
    try {
      const res = await apiGetAllCollections(allCollections.length);
      setAllCollecitons(allCollections.concat(res.collections));
    } catch (error) {
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetAllCollections();
        setAllCollecitons(res.collections);
        setCount(res.count);
      } catch (error) {
      }
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
              dataLength={allCollections.length}
              loader={
                <p className="text-center text-lg font-bold p-6">Loading...</p>
              }
              next={fetchMore}
              hasMore={allCollections.length < count}
            >
              <div className="grid grid-cols-2 gap-1 md:gap-[30px] md:grid-cols-3 lg:grid-cols-4">
                {allCollections.map((collection, index) => {
                  return <CollectionCard collection={collection} key={index} />;
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
