"use client";

import { motion } from "framer-motion";
import { rise, riseIn } from "@/lib/motion";

/**
 * The first-screen reveal from `lib/motion`, as a wrapper rather than a whole
 * client page. Same reasoning as MotionProvider: the animation needs the
 * client, the content does not — so the SDK hero can stay a server component
 * and still hold a server-highlighted code block.
 */
export default function Rise({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={delay === 0 ? rise : riseIn(delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}
