import Link from "next/link";

import { shortenAddress } from "../utils";
import { CDN_URL } from "../config/env";

const CollectionCard = ({ collection }: { collection: Collection }) => {
  const { id, address, profileImage, creator, name, totalSupply } = collection;
  return (
    <article key={id}>
      <Link href={`/collection/${address}`}>
        <div className="cursor-pointer dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
          <span className="w-full relative">
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
              <p className="absolute top-1/2 -translate-y-1/2 w-full text-center px-3 break-words text-xl text-jacarta-700 font-bold">
                {name || "Unnamed"}
              </p>
            )}
          </span>
          <div className="flex gap-2 items-center justify-between w-full wrap-">
            <div className="overflow-x-hidden">
              <span className="block mt-4 text-base font-display text-jacarta-700 dark:text-white break-words truncate">
                {name || "Unnamed"}
              </span>
              <div className="flex items-center justify-between mt-2 text-sm font-medium tracking-tight">
                <div className="flex flex-wrap items-center">
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
            <div>
              <p className="block mt-4 text-sm font-display text-jacarta-700 dark:text-white text-right">
                Items
              </p>
              <p className="block mt-2 text-sm font-display text-jacarta-700 dark:text-white text-right">
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
