"use client";

import React, { useState, useEffect } from "react";
import styles from "./Solutions.module.css";
import PaginationControls from "@/utils/PaginationControls";
import ContentComponent from "./ContentComponent";
import content from "@/data/solutionData"; // text data
import getOptimizedImageUrl from "@/utils/getOptimizedImageUrl"; // Optimalizált kép URL generálás

const Solutions = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const totalPages = content.length;

  // Képek előtöltése az optimalizált URL segítségével
  const prefetchImages = (nextPage) => {
    if (nextPage >= 0 && nextPage < totalPages) {
      const nextImage = new Image();
      const optimizedUrl = getOptimizedImageUrl(content[nextPage].image.src); // Optimalizált URL
      nextImage.src = optimizedUrl; // Ezt töltjük elő
    }
  };

  const handlePaginationChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].screenX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX - touchEndX > 50) {
      // Balra húzás - következő oldal
      handlePaginationChange(currentPage < totalPages - 1 ? currentPage + 1 : 0);
    }

    if (touchEndX - touchStartX > 50) {
      // Jobbra húzás - előző oldal
      handlePaginationChange(currentPage > 0 ? currentPage - 1 : totalPages - 1);
    }
  };

  useEffect(() => {
    // Előtöltjük a következő képet, amikor az oldal változik
    const nextPage = currentPage + 1 < totalPages ? currentPage + 1 : 0;
    prefetchImages(nextPage);
  }, [currentPage]);

  const currentContent = content[currentPage];

  return (
    <section
      className={styles.section}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ContentComponent content={currentContent} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={handlePaginationChange}
        interval={15000} // auto mozgás finomítás
      />
    </section>
  );
};

export default Solutions;
