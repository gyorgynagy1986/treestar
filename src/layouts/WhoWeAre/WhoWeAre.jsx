"use client";

import "aos/dist/aos.css"; // You can also use <link> for styles
import AOS from "aos";

import React, { useState, useEffect } from "react";
import styles from "./WhoWeAre.module.css";
import Image from "next/image";
import contents from "@/data/WhoWeAre"; // text data
import as from "../../../public/assets/222.png";
import as1 from "../../../public/assets/333.png";
import as2 from "../../../public/assets/444.png";

const WhoWeAre = () => {
  const [path, setPath] = useState(1);

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const renderContent = ({ text, image, svgText }) => (
    <div
      data-aos="fade-up"
      data-aos-offset="100"
      data-aos-delay="50"
      className={styles.contentContainer}
    >
      <div className={styles.textContainer}>
        {text.map((paragraph, index) => (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: paragraph }} // HTML szöveg megjelenítése
          />
        ))}
      </div>

      <div className={styles.imageContainer}>
        <Image priority src={image} alt="Kép" className={styles.circleImage} />
        <CircularText text={svgText} />
      </div>
    </div>
  );

  return (
    <section id="rólunk" className={styles.section}>
      <div className={styles.container}>
        <Image
          alt="treestar"
          style={{ opacity: path === 1 ? "1" : "0" }}
          src={as}
          className={styles.imgpng}
        />
        <Image
          alt="treestar"
          style={{ opacity: path === 2 ? "1" : "0" }}
          src={as1}
          className={styles.imgpng}
        />
        <Image
          alt="treestar"
          style={{ opacity: path === 3 ? "1" : "0" }}
          src={as2}
          className={styles.imgpng}
        />

        <div className={styles.nav}>
          {contents.map((item) => (
            <div className={styles.navEl} key={item.id}>
              <h3
                onClick={() => setPath(item.id)}
                className={path === item.id ? styles.main : styles.secP}
              >
                {item.title}
              </h3>
            </div>
          ))}
        </div>
        {renderContent(contents.find((content) => content.id === path))}
      </div>
    </section>
  );
};

const CircularText = ({ text }) => (
  <svg
    className={styles.circleText}
    viewBox="0 0 500 500"
    preserveAspectRatio="xMidYMid meet"
    data-duration="5"
  >
    <path
      id="textcircle"
      fill="none"
      strokeWidth="1"
      d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
    ></path>
    <text dy="-15">
      <textPath
        xlinkHref="#textcircle"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </text>
  </svg>
);

export default WhoWeAre;
