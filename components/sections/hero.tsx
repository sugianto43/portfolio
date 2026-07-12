"use client";

import { motion } from "framer-motion";
import { SocialLinks } from "@/components/common/social-links";
import { siteConfig } from "@/lib/data";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dot-pattern [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />

      <div className="container relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl"
        >
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            available for new opportunities
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl"
          >
            {siteConfig.name}
            <span className="block text-muted-foreground">
              {siteConfig.title}
              <span className="animate-blink text-accent">_</span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground"
          >
            {siteConfig.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-10">
            <SocialLinks />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
