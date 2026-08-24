"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  once = true,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Set to false to replay the reveal every time it re-enters the viewport
   *  instead of only the first time (e.g. for snap-scrolled sections the
   *  user can navigate back and forth between). */
  once?: boolean;
  [key: `data-${string}`]: string | boolean | undefined;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
