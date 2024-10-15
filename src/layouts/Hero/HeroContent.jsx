import React, { useEffect, useState, useRef } from "react";
import styles from "./Hero.module.css";
import Image from "next/image";
import HeroImage from "../../../public/assets/layouts/hero.webp";
import HeroImage2 from "../../../public/assets/layouts/hero2.webp";
import Tree from "../../../public/assets/tree.svg";
import heroData from "@/data/Hero";
import getOptimizedImageUrl from "@/utils/getOptimizedImageUrl";

const HeroContent = ({ currentPage }) => {
  const [fade, setFade] = useState(false);
  const [activePage, setActivePage] = useState(currentPage);
  const data = activePage === 0 ? heroData.section1 : heroData.section2;

  // Preload images for optimization
  useEffect(() => {
    const imagesToPreload = [
      getOptimizedImageUrl(HeroImage.src),
      getOptimizedImageUrl(HeroImage2.src),
    ];
    imagesToPreload.forEach((src) => {
      const img = new window.Image();
      img.src = src; // Betöltéshez elegendő beállítani a kép optimalizált src-jét
    });
  }, []);

  // Frissíti az aktív oldalt és a fade effektust
  useEffect(() => {
    setFade(false); // Eltűnés effekt
    const timer = setTimeout(() => {
      setActivePage(currentPage);
      setFade(true);
    }, 5);

    return () => clearTimeout(timer);
  }, [currentPage]);

  return (
    <div className={styles.gridContainer}>
      <ContentBlock title={data[0].title} text={data[0].text} imgSrc={Tree} />
      <ContentBlock
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

const ContentBlock = ({ title, text, imgSrc, right }) => (
  <div
    className={`${styles.test} ${right ? styles.bottomRight : styles.topLeft}`}
  >
    <div className={right ? styles.textContainerRight : styles.textContainer}>
      <h1 className={styles.h1}>{title}</h1>
      <p className={styles.p}>{text}</p>
      <Image priority className={styles.imgTree} src={imgSrc} alt="" />
    </div>
  </div>
);

export default HeroContent;
