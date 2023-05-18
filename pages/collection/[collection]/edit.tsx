import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signMessage } from "@wagmi/core";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../redux/store";
import { apiGetCollection, apiEditCollection } from "../../../utils/api";

import Meta from "../../../components/Meta";
import { CDN_URL } from "../../../config/env";
import CustomButton from "../../../components/CustomButton";

const Edit_collection = () => {
  const [profilePhoto, setProfilePhoto] = useState<any>();
  const [coverPhoto, setCoverPhoto] = useState<any>();
  const [preview, setPreview] = useState<any>();
  const [coverPreview, setCoverPreview] = useState<any>();
  const userAccount = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address: myAddress } = useAccount();
  const router = useRouter();
  const { collection } = router.query;

  const onChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    const newFormData = { ...formData };
    newFormData[name] = value;
    setFormData(newFormData);
  };

  const handleProfilePhoto = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setProfilePhoto(file);
    } else {
      setProfilePhoto(null);
    }
  };

  const handleCoverPhoto = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setCoverPhoto(file);
    } else {
      setCoverPhoto(null);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const signature = await signMessage({ message: userAccount.address });
    if (!myAddress || !signature) {
      toast.warn("Please connect your wallet and sign your request!");
      return;
    }
    try {
      await apiEditCollection(
        userAccount.address,
        signature,
        formData,
        profilePhoto,
        coverPhoto
      );
      setIsLoading(false);
      router.push(`/collection/${formData.address}`);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (collection) {
          const res = await apiGetCollection(collection as string);
          if (res) {
            setFormData(res.collections[0]);
          }
        }
      } catch (error) {}
    })();
  }, [collection]);

  useEffect(() => {
    if (profilePhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(profilePhoto);
    } else {
      setPreview(null);
    }
  }, [profilePhoto]);

  useEffect(() => {
    if (coverPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(coverPhoto);
    } else {
      setCoverPreview(null);
    }
  }, [coverPhoto]);

  return (
    <div>
      <Meta title={`Edit || ${formData?.name} || Moondogs | NFT Marketplace`} />
      <div className="pt-[5.5rem] lg:pt-24">
        {/* <!-- Banner --> */}
        <div className="relative h-[300px]">
          <img
            src={
              coverPreview
                ? coverPreview
                : formData?.bannerImage
                ? `${CDN_URL}/${formData.bannerImage}`
                : "/images/default/collection_banner_default.png"
            }
            alt="banner"
            className="w-full h-full object-cover"
          />
          <div className="container relative -translate-y-4">
            <div className="absolute right-0 flex items-center px-4 py-2 text-sm bg-white rounded-lg font-display group hover:bg-accent bottom-4">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleCoverPhoto(e)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="w-4 h-4 mr-1 fill-jacarta-400 group-hover:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"></path>
              </svg>
              <span className="text-black mt-0.5 block group-hover:text-white">
                Edit cover photo
              </span>
            </div>
          </div>
        </div>
        {/* <!-- end banner --> */}
        {/* <!-- Edit collection --> */}
        <section className="relative py-16 dark:bg-jacarta-800">
          <picture className="absolute inset-0 pointer-events-none -z-10 dark:hidden">
            <img
              src="/images/gradient_light.jpg"
              alt="gradient"
              className="w-full h-full"
            />
          </picture>
          <div className="container">
            <div className="mx-auto max-w-[48.125rem] md:flex">
              {/* <!-- Form --> */}
              <div className="mb-12 md:w-1/2 md:pr-8">
                <div className="mb-6">
                  <label className="block mb-1 text-sm font-display text-jacarta-700 dark:text-white">
                    Collection Name
                  </label>
                  <input
                    type="text"
                    id="collection-name"
                    name="name"
                    className="w-full px-3 py-3 rounded-lg dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 hover:ring-2 dark:text-white"
                    value={formData?.name}
                    disabled
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-sm font-display text-jacarta-700 dark:text-white">
                    Collection Symbol
                  </label>
                  <input
                    type="text"
                    id="collection-symbol"
                    name="symbol"
                    className="w-full px-3 py-3 rounded-lg dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 hover:ring-2 dark:text-white"
                    value={formData?.symbol}
                    disabled
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-sm font-display text-jacarta-700 dark:text-white">
                    Bio
                  </label>
                  <textarea
                    id="collection-bio"
                    name="bio"
                    className="w-full px-3 py-3 rounded-lg dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 hover:ring-2 dark:text-white"
                    value={formData?.bio}
                    required
                    placeholder="Describe your collection"
                    onChange={onChangeValue}
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-sm font-display text-jacarta-700 dark:text-white">
                    Discord Link
                  </label>
                  <input
                    type="text"
                    id="discord"
                    name="discord"
                    className="w-full px-3 py-3 rounded-lg dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 hover:ring-2 dark:text-white"
                    placeholder="Discord link"
                    value={formData?.discord}
                    onChange={onChangeValue}
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-sm font-display text-jacarta-700 dark:text-white">
                    Twitter Link
                  </label>
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    className="w-full px-3 py-3 rounded-lg dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 hover:ring-2 dark:text-white"
                    placeholder="Twitter link"
                    value={formData?.twitter}
                    onChange={onChangeValue}
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-sm font-display text-jacarta-700 dark:text-white">
                    Website Link
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    className="w-full px-3 py-3 rounded-lg dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 hover:ring-2 dark:text-white"
                    placeholder="Website link"
                    value={formData?.website}
                    onChange={onChangeValue}
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-sm font-display text-jacarta-700 dark:text-white">
                    Royalty
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="royalty"
                      name="royalty"
                      className="w-full px-3 py-3 rounded-lg dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 hover:ring-2 dark:text-white"
                      placeholder="Enter username"
                      value={formData?.royalty}
                      onChange={onChangeValue}
                    />
                    <p className="absolute top-1/2 -translate-y-1/2 right-3 opacity-70">
                      %
                    </p>
                  </div>
                </div>
                <CustomButton
                  className="w-full"
                  onClick={handleUpdate}
                  disabled={isLoading}
                >
                  Update Collection
                </CustomButton>
              </div>
              {/* <!-- Avatar --> */}
              <div className="flex space-x-5 md:w-1/2 md:pl-8">
                <form className="shrink-0">
                  <figure className="relative inline-block">
                    <img
                      src={
                        preview
                          ? preview
                          : formData?.profileImage
                          ? `${CDN_URL}/${formData.profileImage}`
                          : "/images/default/collection_avatar_default.png"
                      }
                      alt="profile avatar"
                      className="dark:border-jacarta-600 rounded-xl border-[5px] border-white h-[160px] w-[160px] bg-white object-cover"
                    />
                    <div className="absolute z-10 w-8 h-8 overflow-hidden text-center bg-white border rounded-full group hover:bg-accent border-jacarta-100 -right-3 -bottom-2 hover:border-transparent">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
                        onChange={(e) => handleProfilePhoto(e)}
                      />
                      <div className="flex items-center justify-center h-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="w-4 h-4 fill-jacarta-400 group-hover:fill-white"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                        </svg>
                      </div>
                    </div>
                  </figure>
                </form>
                <div className="mt-4">
                  <span className="block mb-3 text-sm font-display text-jacarta-700 dark:text-white">
                    Collection Image
                  </span>
                  <p className="text-sm leading-normal dark:text-jacarta-300">
                    We recommend an image of at least 300x300. Gifs work too.
                    Max 5mb.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- end edit collection --> */}
      </div>
    </div>
  );
};

export default Edit_collection;
