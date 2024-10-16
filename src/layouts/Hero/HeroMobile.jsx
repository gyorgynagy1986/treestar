import React, { useEffect, useState } from "react";
import styles from "./HeroMobile.module.css";
import Image from "next/image";
import HeroImage from "../../../public/assets/layouts/heroMobile.png";
import HeroImage2 from "../../../public/assets/layouts/heroMobile2.png";
import heroData from "@/data/Hero";
import PaginationControls from "@/utils/PaginationControls";
import getOptimizedImageUrl from "@/utils/getOptimizedImageUrl";

const HeroMobile = ({ currentPage, onChange, totalPages, autoPlayMobile, interval }) => {
  const [fade, setFade] = useState(false);
  const [activePage, setActivePage] = useState(currentPage);
  const [touchStartX, setTouchStartX] = useState(0);

  // Preload the next image for optimization
  const prefetchImage = (nextPage) => {
    if (typeof window !== "undefined" && (nextPage === 0 || nextPage === 1)) {
      const nextImage = new window.Image();
      const optimizedUrl = getOptimizedImageUrl(
        nextPage === 0 ? HeroImage.src : HeroImage2.src
      );
      nextImage.src = optimizedUrl;
    }
  };

  // Update the active page and handle the fade effect
  useEffect(() => {
    setFade(false); // Eltűnés effekt
    const timer = setTimeout(() => {
      setActivePage(currentPage);
      setFade(true);
      prefetchImage(currentPage === 0 ? 1 : 0); // Következő kép előtöltése
    }, 5);

    return () => clearTimeout(timer);
  }, [currentPage]);

  // Autoplay for mobile version
  useEffect(() => {
    if (autoPlayMobile) {
      const autoSlide = setInterval(() => {
        onChange((activePage + 1) % totalPages);
      }, interval);
      return () => clearInterval(autoSlide);
    }
  }, [activePage, onChange, totalPages, autoPlayMobile, interval]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    handleSwipe(touchStartX, touchEndX);
  };

  const handleSwipe = (startX, endX) => {
    if (startX - endX > 50) {
      // Balra húzás - következő oldal
      onChange(activePage < totalPages - 1 ? activePage + 1 : 0);
    }

    if (endX - startX > 50) {
      // Jobbra húzás - előző oldal
      onChange(activePage > 0 ? activePage - 1 : totalPages - 1);
    }
  };

  const data = activePage === 0 ? heroData.section1 : heroData.section2;

  return (
    <div
      className={styles.container}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.itemsContainer}>
        <h1 className={styles.h1}>{data[0].title}</h1>
        <p className={styles.p}>{data[0].text}</p>
      </div>
      <Image
        priority
        className={`${styles.HeroMobile} ${fade ? styles.fadeIn : styles.fadeOut}`}
        src={activePage === 0 ? HeroImage : HeroImage2}
        alt="Hero image"
      />
      <div className={styles.itemsContainer}>
        <h1 className={styles.h1}>{data[1].title}</h1>
        <p className={styles.p}>{data[1].text}</p>
      </div>
      {/* Add PaginationControls for mobile */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={onChange}
        autoPlayMobile={autoPlayMobile}
        interval={interval}
      />
    </div>
  );
};

export default HeroMobile;
