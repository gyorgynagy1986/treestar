import React from "react";
import styles from "./Hero.module.css";
import Image from "next/image";
import HeroImage from "../../../public/assets/hero.png";
import HeroImage2 from "../../../public/assets/hero2.png";
import Tree from "../../../public/assets/tree.svg";
import heroData from "@/data/Hero";

const HeroContent = ({ currentPage }) => {
  const data = currentPage === 0 ? heroData.section1 : heroData.section2;

  return (
    <div className={styles.gridContainer}>
      <>
        <ContentBlock title={data[0].title} text={data[0].text} imgSrc={Tree} />
        <ContentBlock
          title={data[1].title}
          text={data[1].text}
          imgSrc={Tree}
          right
        />
        <Image
          priority
          className={styles.image}
          src={currentPage === 0 ? HeroImage : HeroImage2}
          alt="Hero image"
        />
      </>
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
