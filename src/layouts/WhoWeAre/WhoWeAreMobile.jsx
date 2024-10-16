"use client"

import "aos/dist/aos.css"; // You can also use <link> for styles
import AOS from "aos";

import React, { useEffect } from "react";
import styles from "./WhoWeAreMobile.module.css";
import Image from "next/image";
import Mobile from "../../../public/assets/mobile.png";
import contents from "@/data/WhoWeAre"; // Tartalom tömb importálása

const WhoWeAreMobile = () => {

  
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);


  return (
    <section  className={styles.section}>
      {/* Loopolva a dinamikus tartalom a 'contents' tömbből */}
      {contents.map((content) => (
        <div key={content.id} className={styles.container}>
          <Image className={styles.cover} src={Mobile} alt="#" />
          <div  className={styles.contentCotnainer}>
            <h2  data-aos="fade" data-aos-offset="15"data-aos-delay="25"  className={styles.h2}>{content.title}</h2>
            <div  data-aos="fade-up" data-aos-offset="15"data-aos-delay="25"  className={styles.textContainer}>
              {/* Szöveges tartalom megjelenítése HTML formázással */}
              {content.text.map((paragraph, index) => (
                <p
                data-aos="fade-up" data-aos-offset="15"data-aos-delay="25"
                  key={index}
                  dangerouslySetInnerHTML={{ __html: paragraph }} // HTML szöveg megjelenítése
                />
              ))}
              <div data-aos="fade" data-aos-offset="15"data-aos-delay="25"  className={styles.imageContainer}>
                <Image className={styles.elip} alt="" src={content.image} />
                <CircularText text={content.svgText} />
              </div>
            </div>
          </div>
        </div>
      ))}
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

export default WhoWeAreMobile;
