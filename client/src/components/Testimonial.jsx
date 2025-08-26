import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// Import required modules
import { Pagination, Autoplay } from "swiper/modules";

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-20">
      <Title
        title="Moments Shared by Our Guests"
        subTitle="Experience why many travelers around the world trust Bookotel for exceptional luxury and personalized stays in premier destinations."
      />

      <div className="w-full mt-15 mb-10">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".testimonial-pagination",
          }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
              centeredSlides: false,
            },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 min-h-[280px]">
                <div className="flex items-center gap-3">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div>
                    <p className="font-playfair text-xl">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4">
                  <StarRating rating={testimonial.rating} />
                </div>
                <p className="text-gray-500 mt-4">"{testimonial.review}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="testimonial-pagination flex justify-center mt-6"></div>
      </div>
    </div>
  );
};

export default Testimonial;
