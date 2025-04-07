// components/DashboardSwiper.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function DashboardSwiper({
  slides,
}: {
  slides: { title: string; content: React.ReactNode }[];
}) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        className="w-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="text-white text-lg font-bold mb-2">
              {slide.title}
            </div>
            {slide.content}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
