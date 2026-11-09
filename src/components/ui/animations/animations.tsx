'use client';

import React, { useRef } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
}

export function FadeIn({
  children,
  delay = 0.2,
  duration = 0.5,
  once = true,
  direction = 'up',
  className = '',
  style = {},
  threshold = 0.3,
  variants,
}: FadeInProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, isInView, once]);

  // Default direction-based variants
  const getDefaultVariants = () => {
    const directionOffset = 50;
    
    const defaultVariants = {
      hidden: { 
        opacity: 0,
        y: direction === 'up' ? directionOffset : direction === 'down' ? -directionOffset : 0,
        x: direction === 'left' ? directionOffset : direction === 'right' ? -directionOffset : 0,
      },
      visible: { 
        opacity: 1, 
        y: 0, 
        x: 0,
        transition: {
          duration,
          delay,
          ease: 'easeOut',
        }
      }
    };

    return variants || defaultVariants;
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={getDefaultVariants()}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  delay = 0.2,
  duration = 0.5,
  amount = 0.3,
  once = true,
  className = '',
  style = {},
}: Omit<FadeInProps, 'direction' | 'variants'>) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, isInView, once]);

  const scaleVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={scaleVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  delay = 0.1,
  staggerDelay = 0.1,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
  style = {},
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}) {
  const directionOffset = 20;
  
  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: direction === 'up' ? directionOffset : direction === 'down' ? -directionOffset : 0,
      x: direction === 'left' ? directionOffset : direction === 'right' ? -directionOffset : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function HoverScale({
  children,
  scale = 1.05,
  duration = 0.3,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration, ease: 'easeOut' }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
