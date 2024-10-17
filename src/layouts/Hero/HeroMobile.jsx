import React, { useEffect, useState } from "react";
import styles from "./HeroMobile.module.css";
import Image from "next/image";
import HeroImage from "../../../public/assets/layouts/heroMobile.png";
import HeroImage2 from "../../../public/assets/layouts/heroMobile2.png";
import heroData from "@/data/Hero";
import PaginationControls from "@/utils/PaginationControls";
import getOptimizedImageUrl from "@/utils/getOptimizedImageUrl";
import useSwipe from "@/utils/useSwipe"; // Importáljuk a swipe hookot

const HeroMobile = ({
  currentPage,
  onChange,
  totalPages,
  autoPlayMobile,
  interval,
}) => {
  const [fade, setFade] = useState(false);
  const [activePage, setActivePage] = useState(currentPage);

  // Swipe hook integrálása
  const { handleTouchStart, handleTouchEnd } = useSwipe(
    () => onChange(activePage < totalPages - 1 ? activePage + 1 : 0), // Balra húzás
    () => onChange(activePage > 0 ? activePage - 1 : totalPages - 1)  // Jobbra húzás
  );

  // Preload the next image for optimization
  const prefetchImage = (nextPage) => {
    if (typeof window !== "undefined" && (nextPage === 0 || nextPage === 1)) {
      const nextImage = new window.Image();
      const optimizedUrl = getOptimizedImageUrl(
        nextPage === 0 ? HeroImage.src : HeroImage2.src,
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
