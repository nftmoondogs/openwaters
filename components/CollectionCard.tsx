import Link from "next/link";

import { shortenAddress } from "../utils";
import { CDN_URL } from "../config/env";

const CollectionCard = ({ collection }: { collection: Collection }) => {
  const { id, address, profileImage, creator, name, totalSupply } = collection;
  return (
    <article key={id}>
      <Link href={`/collection/${address}`}>
        <div className="cursor-pointer overflow-hidden dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-3 transition-shadow hover:shadow-lg">
          <div className="w-full relative mb-3 overflow-hidden">
            <img
              src={
                profileImage
                  ? `${CDN_URL}/${profileImage}`
                  : "/images/default/collection_avatar_default.png"
              }
              alt="item 1"
              className="h-full w-full rounded-[0.625rem] object-cover"
              loading="lazy"
            />
            {profileImage ? (
              <></>
            ) : (
              <p className="absolute top-1/2 -translate-y-1/2 w-full text-center px-3 break-words text-lg md:text-xl text-jacarta-700 font-bold">
                {name || "Unnamed"}
              </p>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center justify-between w-full wrap-">
            <div className="overflow-x-hidden">
              <p className="mb-2 text-sm md:text-base text-center md:text-start font-display text-jacarta-700 dark:text-white break-words truncate overflow-hidden">
                {name || "Unnamed"}
              </p>
              <div className="text-sm font-medium tracking-tight">
                <div className="flex flex-wrap items-center justify-center md:justify-start">
                  <div className="flex gap-1">
                    <span className="dark:text-jacarta-400">by</span>
                    <Link href={`/profile/${creator?.address}`}>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <img
                          src={
                            creator?.profileImage
                              ? `${CDN_URL}/${creator.profileImage}`
                              : "/images/default/profile_avatar_default.png"
                          }
                          alt="owner"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <p className="hover:text-accent-dark font-bold">
                          {creator?.name || shortenAddress(creator?.address)}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 md:block h-full">
              <p className="block text-sm font-display text-jacarta-700 dark:text-white text-right">
                Items
              </p>
              <p className="block text-sm font-display text-jacarta-700 dark:text-white text-right">
                {totalSupply}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default CollectionCard;
