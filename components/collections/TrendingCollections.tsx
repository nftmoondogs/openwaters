/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { formatEther } from "viem";

import HeadLine from "../headLine";

import { CDN_URL } from "../../config/env";
import { calcPercent } from "../../utils";

const TrendingCollections = ({
  collections,
}: {
  collections: GetCollectionResponse;
}) => {
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
        <div className="px-5">
          <div className="flex items-center justify-center mb-12 text-lg text-center font-display text-jacarta-700 sm:text-3xl dark:text-white gap-x-3">
            <HeadLine
              text="Trending Collections in the past 24 hours"
              classes="inline"
              image={""}
              pera={""}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2">
            {collections.count > 0 ? (
              collections.collections.map((collection, index) => {
                const { name, address, profileImage, totalSupply } = collection;

                return (
                  <Link href={`/collection/${address}`}>
                    <div className="flex flex-row items-center gap-6 border-b-[1px] py-4 px-2 md:px-6 text-base cursor-pointer hover:bg-jacarta-100 dark:hover:bg-jacarta-600">
                      <p className="hidden flex-shrink-0 text-center text-gray-400 md:block md:w-[2%]">
                        {index + 1}
                      </p>
                      <div className="flex-shrink-0">
                        <img
                          src={
                            profileImage
                              ? `${CDN_URL}/${profileImage}`
                              : "/images/default/collection_avatar_default.png"
                          }
                          className="h-10 w-10 rounded-full border-[1px] border-gray-200 bg-gray-200 object-cover text-gray-400 dark:border-stone-800 md:h-16 md:w-16"
                        />
                      </div>
                      <p className="max-w-[140px] text-ellipsis overflow-hidden whitespace-nowrap sm:text-sm md:max-w-[230px] md:text-[20px]">
                        {name}
                      </p>
                      <div className="grow"></div>
                      <div className="hidden flex-shrink-0 flex-col gap-2 text-center text-xs md:flex md:w-[12%]">
                        <p className="whitespace-nowrap text-gray-400">
                          Volume
                        </p>
                        <p
                          className={`${
                            calcPercent(
                              collections.volumes?.[index]?.volume_24 ?? 0,
                              collections.volumes?.[index]?.volume_48 ?? 0
                            ) === "--"
                              ? ""
                              : Number(
                                  collections.volumes?.[index]?.volume_24
                                ) >
                                Number(collections.volumes?.[index]?.volume_48)
                              ? "text-[#22c55e]"
                              : "text-[#ef4444]"
                          } `}
                        >
                          {calcPercent(
                            collections?.volumes?.[index]?.volume_24 ?? 0,
                            collections?.volumes?.[index].volume_48 ?? 0
                          )}{" "}
                          %
                        </p>
                        <div className="flex gap-2 justify-center items-center">
                          <img src="images/tokens/CORE.png" className="w-4" />
                          <p className="text-[12px]">
                            {Number(
                              collections.volumes[index].volume_24
                            ).toLocaleString("en-us", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="w-[30%] flex flex-shrink-0 flex-col items-center gap-2 text-center text-xs md:w-[15%]">
                        <p className="text-[12px]">Floor Price</p>
                        <div className="flex gap-2 justify-center items-center">
                          <img src="images/tokens/CORE.png" className="w-4" />
                          <p className="text-[12px]">
                            {Number(
                              formatEther(
                                BigInt(collections.floorPrices[index] || "0")
                              )
                            ) === 0
                              ? "--"
                              : Number(
                                  formatEther(
                                    BigInt(
                                      collections.floorPrices[index] || "0"
                                    )
                                  )
                                ).toLocaleString("en-us", {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                })}
                          </p>
                        </div>
                      </div>
                      <div className="hidden w-[8%] flex-shrink-0 flex-col items-center gap-2 text-center text-xs md:flex md:w-[10%]">
                        <p className="text-[12px]">Items</p>
                        <p className="text-[12px]">{totalSupply}</p>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <></>
            )}
          </div>
          <Link href="/collection">
            <div
              className={`px-8 py-3 mt-5 mx-auto font-semibold text-center text-white transition-all rounded-full bg-accent shadow-accent-volume hover:bg-accent-dark cursor-pointer w-fit`}
            >
              See More
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TrendingCollections;
