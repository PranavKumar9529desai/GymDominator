import { m } from '@util/lib/motion';
import { Quote } from 'lucide-react';

interface FitnessQuoteProps {
  quote: string;
  author: string;
  imageSrc: string;
}

export function FitnessQuote({ quote, author, imageSrc }: FitnessQuoteProps) {
  return (
    <div className="relative h-full w-full">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Quote Content */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-full flex flex-col justify-center items-center px-12 text-white"
      >
        <Quote className="w-12 h-12 mb-6 opacity-80" />
        <blockquote className="text-2xl md:text-3xl font-medium text-center mb-4 italic">
          {quote}
        </blockquote>
        <cite className="text-lg opacity-90 not-italic">— {author}</cite>
      </m.div>
    </div>
  );
}
