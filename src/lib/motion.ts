import type { Variants } from "framer-motion";

/**
 * Motion is confined to the first screen: one quiet reveal on arrival, the
 * way an e-ink panel develops its first frame. Everything below the fold is
 * plain markup — it is simply there, visible without JavaScript, and never
 * makes the reader earn it with a scroll.
 *
 * Small and slow is what separates calm from cheap. The old site-wide
 * default (30px over 0.6s, stock easing) covered a lot of ground fast, which
 * reads as a bounce.
 */

/** expo-out — ~85% of the distance in the first third, then a long settle. */
const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 1.1;
const RISE = 8;

/** A beat of stillness before the page starts to appear. */
const LEAD_IN = 0.25;

export const rise: Variants = {
  hidden: { opacity: 0, y: RISE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE, delay: LEAD_IN },
  },
};

export const riseIn = (delay: number): Variants => ({
  hidden: { opacity: 0, y: RISE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE, delay: LEAD_IN + delay },
  },
});
