import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LazyImage from './LazyImage.jsx';

const AUTO_SWAP_INTERVAL = 5000;

export default function ImageGallery({ images, alt }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isRtl, setIsRtl] = useState(document.documentElement.dir === 'rtl');

  // Listen to direction changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsRtl(document.documentElement.dir === 'rtl');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
    return () => observer.disconnect();
  }, []);

  // Reset selected index when images change (e.g., color switch)
  useEffect(() => {
    setSelectedIndex(0);
    setIsZoomed(false);
  }, [images]);

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setIsZoomed(false);
    },
    [handlePrevious, handleNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Auto swap every 5 seconds when not hovered/zoomed
  useEffect(() => {
    if (images.length <= 1 || isHovered || isZoomed) return;
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, AUTO_SWAP_INTERVAL);
    return () => clearInterval(interval);
  }, [images.length, isHovered, isZoomed]);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4 select-none">
      {/* Main Image */}
      <div
        className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 group focus:outline-none"
        tabIndex={0}
        role="img"
        aria-label={`${alt} - ${selectedIndex + 1} / ${images.length}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full cursor-zoom-in"
            onClick={() => setIsZoomed(true)}
          >
            <LazyImage
              src={images[selectedIndex]}
              alt={`${alt} - ${selectedIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Image Counter */}
        <div className="absolute top-3 end-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
          {selectedIndex + 1} / {images.length}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              aria-label="Previous image"
              className={`absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 text-brand-dark dark:text-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-900 ${isRtl ? 'rotate-180' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              aria-label="Next image"
              className={`absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 text-brand-dark dark:text-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-900 ${isRtl ? 'rotate-180' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin px-0.5">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => { setSelectedIndex(index); setIsZoomed(false); }}
              aria-label={`View image ${index + 1}`}
              aria-current={selectedIndex === index ? 'true' : undefined}
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent p-0.5 ${
                selectedIndex === index
                  ? 'ring-2 ring-brand-accent'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div className="w-full h-full rounded-md overflow-hidden">
                <LazyImage
                  src={img}
                  alt={`${alt} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            onClick={() => setIsZoomed(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Image zoom"
          >
            <button
              onClick={() => setIsZoomed(false)}
              aria-label="Close zoom"
              className="absolute top-4 end-4 text-white/80 hover:text-white p-2 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={images[selectedIndex]}
              alt={`${alt} zoomed`}
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
