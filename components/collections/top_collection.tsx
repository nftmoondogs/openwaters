/* eslint-disable @next/next/no-img-element */
import React from "react";

import HeadLine from "../headLine";
import CollectionCard from "../CollectionCard";

const Top_collection = ({collections}: {collections: Collection[]}) => {

  return (
    <div>
      <section className="relative py-24 dark:bg-jacarta-800">
        <picture className="absolute inset-0 pointer-events-none -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="w-full h-full"
          />
        </picture>
        <div className="container">
          <div className="flex items-center justify-center mb-12 text-lg text-center font-display text-jacarta-700 sm:text-3xl dark:text-white gap-x-3">
            <HeadLine
              text="Top collections"
              classes="inline"
              image={""}
              pera={""}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[30px] lg:grid-cols-4">
            {collections.length > 0 ? (
              collections.map((collection, index) => {
                return <CollectionCard collection={collection} key={index} />;
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Top_collection;
