import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

import "swiper/css";
import "swiper/css/navigation";

const LaunchpadCarousel = ({
  items,
}: {
  items: {
    type: string;
    title: string;
    description: string;
    imageUrl: string;
    pageUrl: string;
  }[];
}) => {
  return (
    <div className="container">
      <div className="relative py-32 mt-10">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={30}
          slidesPerView={"auto"}
          breakpoints={{
            565: {
              slidesPerView: 1,
            },
            1000: {
              slidesPerView: 2,
            },
            1100: {
              slidesPerView: 3,
            },
          }}
          navigation={{
            nextEl: ".launchpad-swiper-button-next",
            prevEl: ".launchpad-swiper-button-prev",
          }}
        >
          {items.map((item, index) => {
            return (
              <SwiperSlide className="text-white" key={index}>
                <div className="flex flex-col-reverse sm:flex-row ">
                  <div className="flex flex-col items-center sm:items-start gap-4 sm:w-2/3 sm:pr-4">
                    <div className="bg-accent-dark rounded-[8px] py-2 px-4 w-fit">
                      {item.type}
                    </div>
                    <p className="text-3xl font-bold text-[#000000] dark:text-jacarta-200">
                      {item.title}
                    </p>
                    <p className="font-semibold text-[#000000] dark:text-jacarta-200 text-center sm:text-left">
                      {item.description}
                    </p>
                    <a href={`${item.pageUrl}`} target="_blank">
                      <div
                        className={`px-8 py-3 w-fit font-semibold text-center text-white transition-all rounded-full bg-accent shadow-accent-volume hover:bg-accent-dark cursor-pointer`}
                      >
                        Mint Now
                      </div>
                    </a>
                  </div>
                  <div className="sm:w-1/3 p-4 sm:p-0">
                    <img
                      className="w-full h-full object-contain rounded-xl"
                      src={`${item.imageUrl}`}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* <!-- Slider Navigation --> */}
        <div className="group launchpad-swiper-button-prev swiper-button-prev shadow-white-volume absolute !top-1/2 !-left-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-left-6 after:hidden">
          <MdKeyboardArrowLeft />
        </div>
        <div className="group launchpad-swiper-button-next swiper-button-next shadow-white-volume absolute !top-1/2 !-right-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-right-6 after:hidden">
          <MdKeyboardArrowRight />
        </div>
      </div>
    </div>
  );
};

export default LaunchpadCarousel;
