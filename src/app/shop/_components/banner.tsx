"use client"

import { motion } from "framer-motion"

export function ShopBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-12 sm:px-12 sm:py-16 max-w-7xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Discover Our Latest Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mb-6">
              Explore our curated selection of premium products designed to elevate your lifestyle. Quality meets style in every piece.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:bg-primary/90 transition-colors"
            >
              Shop Now
              <svg 
                className="ml-2 h-5 w-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>
          </div>
          
          <div className="relative flex-1 w-full max-w-md">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/5 to-primary/30 p-1">
                <div className="h-full w-full rounded-xl bg-background/80 backdrop-blur-sm" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
