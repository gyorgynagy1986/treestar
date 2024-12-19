"use client"

import "aos/dist/aos.css"; // You can also use <link> for styles
import AOS from "aos";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Solutions.module.css";
import PaginationControls from "@/utils/PaginationControls";
import {light, dark} from "@/data/solutionData"; // text data
import getOptimizedImageUrl from "@/utils/getOptimizedImageUrl"; // Optimalizált kép URL generálás
import useWindowSize from "@/utils/useWindowSize"; // Hook a képernyőméret figyeléséhez
import useSwipe from "@/utils/useSwipe"; // Importáljuk a swipe hookot
import { useTheme } from './../../hooks/useTheme';
import dynamic from 'next/dynamic';

const ContentComponent = dynamic(() => import('./ContentComponent'), { ssr: false });

const Solutions = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [content, setContent] = useState(light);
  const autoSlide = useRef(null);
  const size = useWindowSize(); // Képernyő méretének figyelése
  const totalPages = content.length;
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
   if (isDarkMode === true) {
    setContent(dark)
  } else {
    setContent(light)
  }
  }, [isDarkMode, content]);

  // Swipe hook integrálása
  const { handleTouchStart, handleTouchEnd } = useSwipe(
    () => handlePaginationChange(currentPage < totalPages - 1 ? currentPage + 1 : 0), // Balra húzás
    () => handlePaginationChange(currentPage > 0 ? currentPage - 1 : totalPages - 1)  // Jobbra húzás
  );

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  // Képek előtöltése az optimalizált URL segítségével
  const prefetchImages = (nextPage) => {
    if (nextPage >= 0 && nextPage < totalPages) {
      const nextImage = new Image();
      const imageSrc =
        size.width <= 768
          ? content[nextPage].imageMobile.src // Mobil kép
          : content[nextPage].image.src; // Desktop kép

      const optimizedUrl = getOptimizedImageUrl(imageSrc); // Optimalizált URL
      nextImage.src = optimizedUrl; // Ezt töltjük elő
    }
  };

  const handlePaginationChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startAutoSlide = () => {
    const shouldAutoPlay = size.width > 768 ? true : false;

    if (shouldAutoPlay) {
      autoSlide.current = setInterval(() => {
        handlePaginationChange((currentPage + 1) % totalPages);
      }, 20000);
    }
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      clearInterval(autoSlide.current);
    };
  }, [currentPage, size.width]);

  useEffect(() => {
    // Előtöltjük a következő képet, amikor az oldal változik
    const nextPage = currentPage + 1 < totalPages ? currentPage + 1 : 0;
    prefetchImages(nextPage);
  }, [currentPage, size.width]);

  const currentContent = content[currentPage];
  const currentImage =
    size.width <= 768 ? currentContent.imageMobile : currentContent.image;

  return (
    <section
      data-aos="fade"
      data-aos-offset="100"
      className={styles.section}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ContentComponent content={{ ...currentContent, image: currentImage }} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={handlePaginationChange}
        interval={20000} // auto mozgás finomítás
        autoPlayDesktop={true}
        autoPlayMobile={false}
      />
    </section>
  );
};

export default Solutions;
