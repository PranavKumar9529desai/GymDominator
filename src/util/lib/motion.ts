import { AnimatePresence, type MotionProps, type Variants, motion } from 'framer-motion';

// Re-export motion as m for direct usage
export const m = motion;
export { AnimatePresence };

// Export commonly used motion components
export const mh1 = motion.h1;
export const mh2 = motion.h2;
export const mh3 = motion.h3;
export const mh4 = motion.h4;
export const mh5 = motion.h5;
export const mh6 = motion.h6;
export const mp = motion.p;
export const mdiv = motion.div;
export const mimg = motion.img;
export const mbutton = motion.button;
export const msection = motion.section;
export const mspan = motion.span;
export const mul = motion.ul;
export const mli = motion.li;
export const mnav = motion.nav;
export const mfooter = motion.footer;
export const mheader = motion.header;
export const mmain = motion.main;
export const marticle = motion.article;
export const maside = motion.aside;

// Mode types for AnimatePresence
export type AnimationMode = 'sync' | 'wait' | 'popLayout';

// Common animation variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUpVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

export const slideInVariants: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
};

// Common transitions
export const transitions = {
  spring: {
    type: 'spring',
    damping: 20,
    stiffness: 300,
  },
  ease: {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3,
  },
} as const;

// Common animation props
export const fadeInProps: MotionProps = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  variants: fadeInVariants,
};

export const slideUpProps: MotionProps = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  variants: slideUpVariants,
};

export const slideInProps: MotionProps = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  variants: slideInVariants,
};

// Common layout animations
export const layoutTransition = {
  layout: true,
  layoutRoot: true,
  transition: transitions.spring,
} as const;

// Common props for AnimatePresence wrapped components
export const presenceProps = {
  mode: 'wait' as AnimationMode,
  initial: false,
} as const;

// Helper for list animations with AnimatePresence
export const listPresenceProps = {
  ...presenceProps,
  mode: 'popLayout' as AnimationMode,
} as const;

// Helper function to combine motion props
export const combineMotionProps = (...props: MotionProps[]): MotionProps => {
  return props.reduce((acc, curr) => {
    for (const key of Object.keys(curr)) {
      acc[key as keyof MotionProps] = curr[key as keyof MotionProps];
    }
    return acc;
  }, {} as MotionProps);
};

// Types
export type { MotionProps, Variants };
