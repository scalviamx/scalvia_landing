"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "../../_lib/utils";

interface CarouselImage {
  src: string;
  alt: string;
}

interface HeroCarouselProps {
  images: CarouselImage[];
  interval?: number;
  className?: string;
}

export function HeroCarousel({ images, interval = 4000, className }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {images.map((image, index) => (
        <div
          key={image.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            index === activeIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Ir a imagen ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-colors duration-300",
              index === activeIndex ? "bg-walnut" : "bg-walnut/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}
