import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/autoplay';

interface TestimonialProps {
  testimonials: Array<{
    name: string;
    text: string;
    image: string;
    role: string;
    rating: number;
  }>;
}

export const TestimonialsSection = ({ testimonials }: TestimonialProps) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const TestimonialCard = ({ testimonial }: { testimonial: TestimonialProps['testimonials'][0] }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 h-full">
      <div className="relative z-10">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-cyan-400"
        />
        <h4 className="text-xl font-bold text-center text-white">{testimonial.name}</h4>
        <p className="text-cyan-400 text-center mb-4">{testimonial.role}</p>
        <p className="text-gray-100 text-center">{testimonial.text}</p>
      </div>
    </div>
  );

  return (
    <div className="mt-32 mb-20">
      <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
        What Our Dominators Say
      </h3>
      
      {/* Mobile View */}
      <div className="md:hidden max-w-[340px] mx-auto h-[500px]">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          className="h-full"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block max-w-[1200px] mx-auto">
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          grabCursor={true}
          modules={[Autoplay]}
          className="h-full"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            1024: { slidesPerView: 3, spaceBetween: 40 }
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
