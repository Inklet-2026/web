"use client";

import { MotionConfig } from "framer-motion";

/**
 * Honours the OS "reduce motion" setting: transforms are dropped, opacity
 * fades still play. Wrapping in a client component keeps the layout itself
 * on the server.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
