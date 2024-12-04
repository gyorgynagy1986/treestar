import React, { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import Image from "next/image";
import HeroImage from "../../../public/assets/layouts/hero.webp";
import HeroImage2 from "../../../public/assets/layouts/hero2.webp";
import Tree from "../../../public/assets/tree.svg";
import heroData from "@/data/Hero";
import getOptimizedImageUrl from "@/utils/getOptimizedImageUrl";
import { useTheme } from './../../hooks/useTheme';

const HeroContent = ({ currentPage }) => {
  const [fade, setFade] = useState(false);
  const [activePage, setActivePage] = useState(currentPage);
  const data = activePage === 0 ? heroData.section1 : heroData.section2;
  // Preload the next image for optimization

  const { isDarkMode } = useTheme();



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

  return (
    <div className={styles.gridContainer}>
      <ContentBlock isDarkMode={isDarkMode} title={data[0].title} text={data[0].text} imgSrc={Tree} />
      <ContentBlock
       isDarkMode={isDarkMode}
        title={data[1].title}
        text={data[1].text}
        imgSrc={Tree}
        right
      />
      <Image
        priority={true}
        className={`${styles.image} ${fade ? styles.fadeIn : styles.fadeOut}`}
        src={activePage === 0 ? HeroImage : HeroImage2}
        alt="Hero image"
      />
    </div>
  );
};


const ContentBlock = ({ title, text, imgSrc, right, isDarkMode }) => (
 
  
  <div
    className={`${styles.test} ${right ? styles.bottomRight : styles.topLeft}`}
  >
    <div className={right ? styles.textContainerRight : styles.textContainer}>
      <h1 className={`${styles.h1} `}>{title}</h1>
      <p className={`${styles.p}  `}>{text}</p>
      <Image priority className={styles.imgTree} src={imgSrc} alt="" />
    </div>
  </div>
);

export default HeroContent;
