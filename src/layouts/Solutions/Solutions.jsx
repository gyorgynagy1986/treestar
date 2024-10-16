"use client"

import "aos/dist/aos.css"; // You can also use <link> for styles
import AOS from "aos";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Solutions.module.css";
import PaginationControls from "@/utils/PaginationControls";
import ContentComponent from "./ContentComponent";
import content from "@/data/solutionData"; // text data
import getOptimizedImageUrl from "@/utils/getOptimizedImageUrl"; // Optimalizált kép URL generálás
import useWindowSize from "@/utils/useWindowSize"; // Hook a képernyőméret figyeléséhez

const Solutions = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const autoSlide = useRef(null);
  const touchStartX = useRef(0);
  const size = useWindowSize(); // Képernyő méretének figyelése
  const totalPages = content.length;

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

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    handleSwipe(touchStartX.current, touchEndX);
  };

  const handleSwipe = (startX, endX) => {
    if (startX - endX > 50) {
      // Balra húzás - következő oldal
      handlePaginationChange(currentPage < totalPages - 1 ? currentPage + 1 : 0);
    }

    if (endX - startX > 50) {
      // Jobbra húzás - előző oldal
      handlePaginationChange(currentPage > 0 ? currentPage - 1 : totalPages - 1);
    }

    // Újraindítja az automatikus lapozást
    clearInterval(autoSlide.current);
    startAutoSlide();
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
