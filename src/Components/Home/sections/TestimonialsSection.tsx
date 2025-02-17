import { m } from '@util/lib/motion';
import { Star } from 'lucide-react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
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
  if (!testimonials || testimonials.length === 0) return null;

  const TestimonialCard = ({
    testimonial,
  }: { testimonial: TestimonialProps['testimonials'][0] }) => (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700/50 h-full"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-cyan-400"
            />
            <div className="absolute -bottom-2 -right-2 bg-cyan-400 rounded-full p-1">
              <Star className="w-4 h-4 text-gray-900 fill-current" />
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
            <p className="text-cyan-400">{testimonial.role}</p>
          </div>
        </div>

        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={`star-${testimonial.name}-${i}`}
              className="w-5 h-5 text-yellow-400 fill-current"
            />
          ))}
        </div>

        <p className="text-gray-300 leading-relaxed relative">
          <span className="absolute -top-4 -left-2 text-5xl text-cyan-400/20">"</span>
          {testimonial.text}
          <span className="absolute -bottom-4 -right-2 text-5xl text-cyan-400/20">"</span>
        </p>
      </div>
    </m.div>
  );

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
            What Our Dominators Say
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied members who have transformed their fitness journey with us
          </p>
        </m.div>

        {/* Mobile View */}
        <div className="md:hidden">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[Autoplay]}
            className="h-full"
            autoplay={{ delay: 3000 }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={`mobile-${testimonial.name}-${testimonial.role}`} className="px-4">
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Autoplay]}
            className="h-full"
            autoplay={{ delay: 3000 }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide
                key={`desktop-${testimonial.name}-${testimonial.role}`}
                className="max-w-lg"
                style={{ width: '400px', marginRight: '40px' }}
              >
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
