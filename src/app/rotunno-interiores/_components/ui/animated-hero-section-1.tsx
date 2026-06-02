"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../_lib/utils";

interface AnimatedHeroProps {
  id?: string;
  backgroundImageUrl: string;
  title: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

export function AnimatedHero({
  id,
  backgroundImageUrl,
  title,
  description,
  primaryCta,
  secondaryCta,
  className
}: AnimatedHeroProps) {
  return (
    <div
      id={id}
      className={cn(
        "relative flex min-h-[92vh] w-full flex-col items-center justify-end overflow-hidden",
        className
      )}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        aria-hidden="true"
      />

      {/* Warm directional overlay — matches Rotunno brand */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-charcoal/86 via-charcoal/48 to-charcoal/16" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-end px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20"
      >
        <motion.h1
          variants={itemVariants}
          className="max-w-3xl text-5xl font-medium leading-[1.03] text-white sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-lg leading-8 text-white/84 sm:text-xl"
        >
          {description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href={primaryCta.href}
            target={primaryCta.href.startsWith("http") ? "_blank" : undefined}
            rel={primaryCta.href.startsWith("http") ? "noreferrer" : undefined}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-charcoal transition hover:bg-linen"
          >
            {primaryCta.text}
            {primaryCta.icon}
          </a>

          {secondaryCta && (
            <a
              href={secondaryCta.href}
              target={secondaryCta.href.startsWith("http") ? "_blank" : undefined}
              rel={secondaryCta.href.startsWith("http") ? "noreferrer" : undefined}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              {secondaryCta.text}
              {secondaryCta.icon}
            </a>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
