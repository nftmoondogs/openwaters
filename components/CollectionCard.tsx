import Link from "next/link";
import { formatEther } from "viem";

import { calcPercent } from "../utils";
import { CDN_URL } from "../config/env";

const CollectionCard = ({
  collection,
  floorPrice,
  volumes,
  rank,
}: {
  collection: Collection;
  floorPrice: string;
  volumes: { volume_24: string; volume_48: string };
  rank: number;
}) => {
  const { id, address, profileImage, creator, name, totalSupply, volume } =
    collection;
  return (
    <article key={id}>
      <Link href={`/collection/${address}`}>
        <div className="flex flex-row items-center gap-6 border-b-[1px] border-jacarta-200 dark:border-white/10 py-4 px-2 md:px-6 text-base cursor-pointer hover:bg-jacarta-100 dark:hover:bg-jacarta-600 font-semibold">
          <p className="hidden flex-shrink-0 text-center text-gray-400 md:block md:w-[2%]">
            {rank + 1}
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
          <p className="max-w-[128px] overflow-hidden text-ellipsis whitespace-nowrap sm:text-sm md:max-w-[230px] md:overflow-clip md:text-[20px]">
            {name}
          </p>
          <div className="grow"></div>
          <div className="hidden flex-shrink-0 flex-col gap-2 text-center text-xs md:flex md:w-[12%]">
            <p className="whitespace-nowrap text-jacarta-300">
              Volume (24 hours)
            </p>
            <p
              className={`${
                calcPercent(
                  volumes?.volume_24 ?? 0,
                  volumes?.volume_48 ?? 0
                ) === "--"
                  ? ""
                  : Number(volumes?.volume_24) > Number(volumes?.volume_48)
                  ? "text-[#22c55e]"
                  : "text-[#ef4444]"
              } `}
            >
              {calcPercent(volumes?.volume_24 ?? 0, volumes?.volume_48 ?? 0) ===
              Infinity
                ? "+∞"
                : calcPercent(
                    volumes?.volume_24 ?? 0,
                    volumes?.volume_48 ?? 0
                  )}{" "}
              %
            </p>
            <div className="flex gap-2 justify-center items-center">
              <img src="/images/tokens/CORE.png" className="w-4" />
              <p className="">
                {Number(volumes?.volume_24).toLocaleString("en-us", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
          <div className="hidden md:flex flex-col flex-shrink-0 gap-2 text-xs w-[8%] justify-center">
            <p className="whitespace-nowrap text-jacarta-300 text-center">
              Total Volume
            </p>
            <div className="flex gap-2 justify-center items-center">
              <img src="/images/tokens/CORE.png" className="w-4" />
              <p className="">
                {volume.toLocaleString("en-us", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
          <div className="w-[20%] flex-shrink-0 flex-col items-center gap-2 text-center text-xs flex md:w-[10%]">
            <p className="text-jacarta-300">Floor Price</p>
            <div className="flex gap-2 justify-center items-center">
              <img src="/images/tokens/CORE.png" className="w-4" />
              <p className="">
                {Number(formatEther(BigInt(floorPrice || "0"))) === 0
                  ? "--"
                  : Number(
                      formatEther(BigInt(floorPrice || "0"))
                    ).toLocaleString("en-us", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
              </p>
            </div>
          </div>
          <div className="hidden flex-shrink-0 flex-col items-center gap-2 text-center text-xs md:flex">
            <p className="text-jacarta-300">Items</p>
            <p className="">{totalSupply}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default CollectionCard;
