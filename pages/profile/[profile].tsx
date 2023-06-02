import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useCopyToClipboard } from "../../hooks/index";

import { shortenAddress } from "../../utils";
import { apiGetAccount } from "../../utils/api";

import Meta from "../../components/Meta";
import User_items from "../../components/user/User_items";
import { CDN_URL } from "../../config/env";

const User = () => {
  const router = useRouter();
  const { profile } = router.query;
  const [userAccount, setUserAccount] = useState<GetUserInfoResponse>({
    address: "",
    bannerImage: "",
    bio: "",
    createdAt: "",
    email: "",
    id: "",
    name: "",
    profileImage: "",
    updatedAt: "",
  });
  const [copied, setCopied] = useState(false);
  const [, copy] = useCopyToClipboard();

  const handleCopy = async (userId: string) => {
    const res = await copy(userId);
    if (res) toast.success("Copied");
  };

  useEffect(() => {
    (async () => {
      if (profile) {
        const res = await apiGetAccount(profile as string);
        if (res) {
          setUserAccount(res);
        }
      }
    })();
  }, [profile]);
  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  return (
    <>
      <Meta title="User || Moondogs | NFT Marketplace" />
      {/* <!-- Profile --> */}
      <div className="pt-[5.5rem] lg:pt-24">
        {/* <!-- Banner --> */}
        <div className="relative h-[300px] overflow-hidden">
          <img
            src={
              userAccount?.bannerImage
                ? `${CDN_URL}/${userAccount.bannerImage}`
                : "/images/default/profile_banner_default.png"
            }
            alt="banner"
            className="object-cover w-full h-full absolute top-1/2 -translate-y-1/2 bg-white"
          />
        </div>
        {/* <!-- end banner --> */}
        <section className="relative pb-12 dark:bg-jacarta-800 bg-light-base pt-28">
          {/* <!-- Avatar --> */}
          <div className="absolute top-0 z-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 left-1/2">
            <figure className="relative h-40 w-40">
              <img
                src={
                  userAccount?.profileImage
                    ? `${CDN_URL}/${userAccount.profileImage}`
                    : "/images/default/profile_avatar_default.png"
                }
                alt="profile image"
                className="border-[5px] border-white dark:border-jacarta-600 rounded-xl object-cover bg-white w-full h-full"
              />
            </figure>
          </div>

          <div className="container">
            <div className="text-center">
              <h2 className="mb-2 text-4xl font-medium font-display text-jacarta-700 dark:text-white">
                {userAccount?.name}
              </h2>
              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex items-center justify-center rounded-full border bg-white py-1.5 px-4">
                <img
                  src="/images/tokens/CORE.png"
                  alt="icon"
                  className="w-4 h-4 mr-1 icon"
                />

                <button
                  onClick={() => handleCopy(userAccount?.address)}
                  className="js-copy-clipboard dark:text-jacarta-200 max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <span>{shortenAddress(userAccount?.address)}</span>
                </button>
              </div>

              <p className="max-w-xl mx-auto mb-2 text-lg dark:text-jacarta-300">
                {userAccount?.bio}
              </p>
              <span className="text-jacarta-400">
                Joined {new Date(userAccount?.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </section>
        {/* <!-- end profile --> */}
        <User_items userAddress={profile as string} />
      </div>
    </>
  );
};

export default User;
