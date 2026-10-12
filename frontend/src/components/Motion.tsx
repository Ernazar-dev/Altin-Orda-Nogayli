import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { animate, motion, useInView, useReducedMotion, useScroll, useSpring } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface BoxProps {
  children: ReactNode;
  className?: string;
}

/** Ko'rinish maydoniga kirganda bir marta silliq paydo bo'ladi. */
export function Reveal({ children, className, delay = 0, y = 28 }: BoxProps & { delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/** Bolalarini ketma-ket (0.08s oraliq) paydo qiluvchi konteyner. */
export function Stagger({ children, className }: BoxProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: BoxProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/** Raqam 0 dan maqsadgacha sanaladi (ko'ringanda bir marta). */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = String(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.5,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, to, reduce]);
  return (
    <span ref={ref} className={className}>
      {reduce ? to : 0}
    </span>
  );
}

/** Sahifa tepasidagi o'qish jarayoni chizig'i. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden="true" className={className} style={{ scaleX, transformOrigin: '0 50%' }} />;
}

/** Marshrut almashganda sahifaning yengil kirish animatsiyasi. */
export function PageEnter({ children, className }: BoxProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
