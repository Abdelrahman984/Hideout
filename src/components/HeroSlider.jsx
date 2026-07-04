import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/i18n.jsx';
import LazyImage from './LazyImage.jsx';

const SLIDE_INTERVAL = 6000;

const slidesData = [
  {
    id: 1,
    image: '/images/tshirts/takeTime-4-brown-front.jpg',
    titleKey: 'home.heroTitle',
    subtitleKey: 'home.heroSubtitle',
    ctaKey: 'home.shopNow',
  },
  {
    id: 2,
    image: '/images/tshirts/coffee-2-black.jpg',
    titleKey: 'home.heroTitle2',
    subtitleKey: 'home.heroSubtitle2',
    ctaKey: 'home.shopNow',
  },
  {
    id: 3,
    image: '/images/pants/pants-2-black.jpg',
    titleKey: 'home.heroTitle3',
    subtitleKey: 'home.heroSubtitle3',
    ctaKey: 'home.shopNow',
  },
];

export default function HeroSlider() {
  const { t, isRTL } = useI18n();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  }, []);

  const goToSlide = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  // Auto-advance
  useEffect(() => {
    if (isPaused || slidesData.length <= 1) return;
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') isRTL ? nextSlide() : prevSlide();
      if (e.key === 'ArrowRight') isRTL ? prevSlide() : nextSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isRTL, nextSlide, prevSlide]);

  const slide = slidesData[current];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? (isRTL ? '-100%' : '100%') : (isRTL ? '100%' : '-100%'),
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction > 0 ? (isRTL ? '100%' : '-100%') : (isRTL ? '-100%' : '100%'),
      opacity: 0,
    }),
  };

  const contentVariants = {
    enter: { opacity: 0, y: 40 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section
      className="relative w-full bg-brand-light dark:bg-gray-900 overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Hero slider"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] md:min-h-[80vh]">
          {/* Content Side */}
          <div className="relative flex items-center order-2 lg:order-1 px-4 sm:px-6 lg:px-12 py-12 lg:py-0">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.7 },
                  opacity: { duration: 0.5 },
                }}
                className="w-full"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${current}`}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="text-start"
                  >
                    <p className="text-sm md:text-base font-semibold text-brand-accent uppercase tracking-wider mb-4">
                      {t('home.newCollection')}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-dark dark:text-white mb-6 leading-tight">
                      {t(slide.titleKey)}
                    </h1>
                    <p className="text-lg md:text-xl text-brand-muted dark:text-gray-300 mb-10 max-w-lg">
                      {t(slide.subtitleKey)}
                    </p>
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-2 bg-brand-dark dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-accent dark:hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-lg"
                    >
                      {t(slide.ctaKey)}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 rtl:rotate-180"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image Side */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 bg-gray-100 dark:bg-gray-800 px-4 sm:px-6 lg:px-12 py-12 lg:py-0"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.7 },
                  opacity: { duration: 0.5 },
                }}
                className="w-full max-w-md"
              >
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <LazyImage
                    src={slide.image}
                    alt={t(slide.titleKey)}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slidesData.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute start-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-brand-dark dark:text-white shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 rtl:rotate-180"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute end-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-brand-dark dark:text-white shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 rtl:rotate-180"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </>
      )}

      {/* Slide Dots - centered with logical positioning */}
      <div
        className="absolute bottom-6 z-20 flex gap-3"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={current === index ? 'true' : undefined}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index
                ? 'bg-brand-accent w-8'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
