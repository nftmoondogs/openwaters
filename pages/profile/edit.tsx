import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useAppSelector, useAppDispatch } from "../../redux/store";
import { updateUser } from "../../redux/userSlice";

import { validateEmail } from "../../utils";

import Meta from "../../components/Meta";
import CustomButton from "../../components/CustomButton";
import UserId from "../../components/userId";
import { CDN_URL } from "../../config/env";

const Edit_user = () => {
  const [profilePhoto, setProfilePhoto] = useState<any>();
  const [coverPhoto, setCoverPhoto] = useState<any>();
  const [preview, setPreview] = useState<any>();
  const [coverPreview, setCoverPreview] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userAccount = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    setFormData(userAccount);
  }, [userAccount]);

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
    if (formData.email) {
      const isEmailValidated = validateEmail(formData.email);
      if (!isEmailValidated) {
        toast.warn("Invalid Email!");
        return;
      }
    }
    try {
      setIsLoading(true);
      await dispatch(
        updateUser({
          address: userAccount.address,
          updateUserData: formData,
          profileImage: profilePhoto,
          bannerImage: coverPhoto,
        })
      );
      setIsLoading(false);
      router.push(`/profile/${userAccount.address}`);
    } catch (error: any) {
      setIsLoading(false);
    }
  };

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
      <Meta title="Profile || Moondogs | NFT Marketplace" />
      <div className="pt-[5.5rem] lg:pt-24">
        {/* <!-- Banner --> */}
        <div className="relative h-[300px]">
          <img
            src={
              coverPreview
                ? coverPreview
                : formData?.bannerImage
                ? `${CDN_URL}/${formData.bannerImage}`
                : "/images/default/profile_banner_default.png"
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
        {/* <!-- Edit Profile --> */}
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
                    Username
                  </label>
                  <input
                    type="text"
                    id="profile-username"
                    name="name"
                    className="w-full px-3 py-3 rounded-lg dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 hover:ring-2 dark:text-white"
                    placeholder="Enter username"
                    value={formData?.name}
                    required
                    onChange={onChangeValue}
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-sm font-display text-jacarta-700 dark:text-white">
                    Bio
                  </label>
                  <textarea
                    id="profile-bio"
                    name="bio"
                    className="w-full px-3 py-3 rounded-lg dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 hover:ring-2 dark:text-white"
                    value={formData?.bio}
                    required
                    placeholder="Tell the world your story!"
                    onChange={onChangeValue}
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-sm font-display text-jacarta-700 dark:text-white">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="profile-email"
                    name="email"
                    className="w-full px-3 py-3 rounded-lg dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 hover:ring-2 dark:text-white"
                    placeholder="Enter email"
                    value={formData?.email}
                    onChange={onChangeValue}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-sm font-display text-jacarta-700 dark:text-white">
                    Wallet Address
                  </label>

                  <UserId
                    classes="js-copy-clipboard dark:bg-jacarta-700 border-jacarta-100 hover:bg-jacarta-50 dark:border-jacarta-600 dark:text-jacarta-300 flex w-full select-none items-center rounded-lg border bg-white py-3 px-4"
                    userId={userAccount?.address}
                  />
                </div>
                <CustomButton
                  disabled={isLoading}
                  onClick={handleUpdate}
                  className="w-full"
                >
                  Update Profile
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
                          : "/images/default/profile_avatar_default.png"
                      }
                      alt="profile avatar"
                      className="dark:border-jacarta-600 rounded-xl border-[5px] border-white w-[160px] h-[160px] object-cover"
                    />
                    <div className="absolute w-8 h-8 overflow-hidden text-center bg-white border rounded-full group hover:bg-accent border-jacarta-100 -right-3 -bottom-2 hover:border-transparent">
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
                    Profile Image
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
        {/* <!-- end edit profile --> */}
      </div>
    </div>
  );
};

export default Edit_user;
