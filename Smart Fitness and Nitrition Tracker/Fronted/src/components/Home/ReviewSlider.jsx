import React from "react";
import p1 from "../../assets/testinomial/vismay-patel.jpg";
import p2 from "../../assets/testinomial/anjali thakur.jpg";
import p3 from "../../assets/testinomial/arvind singh.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {Pagination, Autoplay,FreeMode} from "swiper/modules";
import "swiper/css/free-mode"
import "swiper/css/pagination"

export const ReviewSlider = () => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={25}
      loop={true}
      freeMode={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[FreeMode, Pagination, Autoplay]}
      className="w-full"
    >
      <SwiperSlide>
        <div className="bg-white p-4 rounded shadow text-center">
          <img
            src={p1}
            alt="User 1"
            className="mx-auto mb-4 rounded-full w-16 object-cover h-16"
          />
          <p>
            "This app helped me stay on track with my fitness goals!" - Vismay
            Patel
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-white p-4 rounded shadow text-center">
          <img
            src={p2}
            alt="User 2"
            className="mx-auto mb-4 rounded-full h-16 w-16 object-cover"
          />
          <p>"I love the personalized meal suggestions!" - Anjali Thakur</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-white p-4 rounded shadow text-center">
          <img
            src={p3}
            alt="User 3"
            className="mx-auto mb-4 rounded-full w-16 h-16 object-cover"
          />
          <p>
            "Transformed my approach to health with personalized nutrition plans
            and detailed fitness tracking." - Arvind Singh
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-white p-4 rounded shadow text-center">
          <img
            src={p2}
            alt="User 2"
            className="mx-auto mb-4 rounded-full h-16 w-16 object-cover"
          />
          <p>"I love the personalized meal suggestions!" - Priya Singh</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
