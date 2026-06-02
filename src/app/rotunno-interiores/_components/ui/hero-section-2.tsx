"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../_lib/utils";
import { HeroCarousel } from "./hero-carousel";

interface CarouselImage {
  src: string;
  alt: string;
}

interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  id?: string;
  logo?: {
    text: string;
    slogan?: string;
  };
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  carouselImages: CarouselImage[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function HeroSection({
  id,
  logo,
  title,
  subtitle,
  callToAction,
  carouselImages,
  className,
  ...props
}: HeroSectionProps) {
  return (
    <div
      id={id}
      className={cn(
        "relative flex min-h-[600px] w-full flex-col overflow-hidden bg-marble text-charcoal md:min-h-[72vh] md:flex-row",
        className
      )}
      {...props}
    >
      {/* Left panel: content */}
      <motion.div
        className="flex w-full flex-col justify-center px-8 pb-8 pt-28 md:w-3/5 md:px-12 md:pb-12 md:pt-32 lg:px-16 lg:pb-16 lg:pt-36"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          {logo && (
            <motion.header className="mb-12" variants={itemVariants}>
              <p className="text-lg font-medium text-charcoal">{logo.text}</p>
              {logo.slogan && (
                <p className="mt-0.5 text-xs tracking-wider text-graphite">{logo.slogan}</p>
              )}
            </motion.header>
          )}

          <motion.div variants={containerVariants}>
            <motion.h1
              className="text-4xl font-medium leading-tight text-charcoal md:text-5xl"
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            <motion.div
              className="my-6 h-1 w-20 bg-walnut"
              variants={itemVariants}
            />

            <motion.p
              className="mb-8 max-w-md text-base leading-7 text-graphite"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>

            <motion.a
              href={callToAction.href}
              target={callToAction.href.startsWith("http") ? "_blank" : undefined}
              rel={callToAction.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-sm font-medium tracking-widest text-walnut transition-colors hover:text-walnut/70"
              variants={itemVariants}
            >
              {callToAction.text}
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Right panel: carousel with clip-path entrance */}
      <motion.div
        className="w-full min-h-[300px] md:w-2/5 md:min-h-full"
        initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
        animate={{ clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0% 100%)" }}
        transition={{ duration: 1.2, ease: "circOut" }}
      >
        <HeroCarousel
          images={carouselImages}
          interval={4000}
          className="h-full min-h-[300px]"
        />
      </motion.div>
    </div>
  );
}
