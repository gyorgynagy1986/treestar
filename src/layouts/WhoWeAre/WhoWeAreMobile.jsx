import React from "react";
import styles from "./WhoWeAreMobile.module.css";
import Image from "next/image";
import Mobile from "../../../public/assets/mobile.png";
import Elip from "../../../public/assets//layouts/Elip.webp";

const WhoWeAreMobile = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Image className={styles.cover} src={Mobile} alt="#" />
        <div className={styles.contentCotnainer}>
          <h2 className={styles.h2}>Kik vagyunk?</h2>
          <div className={styles.textContainer}>
            <p>
            <b> Missziónk, hogy innovatív megoldásainkkal támogassuk ügyfeleinket</b>
              abban, hogy üzleti folyamataik a lehető legjobban kihasználják a
              modern technológia nyújtotta lehetőségeket. Törekszünk arra, hogy
              minden projektünk hozzájáruljon a hatékonyság növeléséhez és a
              környezeti terhelés csökkentéséhez.
            </p>
            <p>
             <b> AI automatizációval és digitális transzformációs folyamatokkal
              szeretnénk hatékonyabbá tenni a munkafolyamatokat,</b> ezáltal
              hozzájárulva a költségoptimalizáláshoz és az ipari munkafolyamatok
              fenntarthatóságához.
            </p>
            <div className={styles.imageContainer}>
            <Image className={styles.elip} alt="" src={Elip}></Image>
             <CircularText text={      "fenntartható jövő &nbsp;•&nbsp; digitális transzformáció &nbsp;•&nbsp; AI automatizáció &nbsp;•&nbsp; hatékonyság &nbsp;• &nbsp; költségoptimalizálás&nbsp; &nbsp;•&nbsp;&nbsp;&nbsp;"} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <Image className={styles.cover} src={Mobile} alt="#" />
        <div className={styles.contentCotnainer}>
          <h2 className={styles.h2}>Kik vagyunk?</h2>
          <div className={styles.textContainer}>
            <p>
            <b> Missziónk, hogy innovatív megoldásainkkal támogassuk ügyfeleinket</b>
              abban, hogy üzleti folyamataik a lehető legjobban kihasználják a
              modern technológia nyújtotta lehetőségeket. Törekszünk arra, hogy
              minden projektünk hozzájáruljon a hatékonyság növeléséhez és a
              környezeti terhelés csökkentéséhez.
            </p>
            <p>
             <b> AI automatizációval és digitális transzformációs folyamatokkal
              szeretnénk hatékonyabbá tenni a munkafolyamatokat,</b> ezáltal
              hozzájárulva a költségoptimalizáláshoz és az ipari munkafolyamatok
              fenntarthatóságához.
            </p>
            <div className={styles.imageContainer}>
            <Image className={styles.elip} alt="" src={Elip}></Image>
             <CircularText text={      "fenntartható jövő &nbsp;•&nbsp; digitális transzformáció &nbsp;•&nbsp; AI automatizáció &nbsp;•&nbsp; hatékonyság &nbsp;• &nbsp; költségoptimalizálás&nbsp; &nbsp;•&nbsp;&nbsp;&nbsp;"} />
            </div>
          </div>
        </div>
      </div>

      
      <div className={styles.container}>
        <Image className={styles.cover} src={Mobile} alt="#" />
        <div className={styles.contentCotnainer}>
          <h2 className={styles.h2}>Kik vagyunk?</h2>
          <div className={styles.textContainer}>
            <p>
            <b> Missziónk, hogy innovatív megoldásainkkal támogassuk ügyfeleinket</b>
              abban, hogy üzleti folyamataik a lehető legjobban kihasználják a
              modern technológia nyújtotta lehetőségeket. Törekszünk arra, hogy
              minden projektünk hozzájáruljon a hatékonyság növeléséhez és a
              környezeti terhelés csökkentéséhez.
            </p>
            <p>
             <b> AI automatizációval és digitális transzformációs folyamatokkal
              szeretnénk hatékonyabbá tenni a munkafolyamatokat,</b> ezáltal
              hozzájárulva a költségoptimalizáláshoz és az ipari munkafolyamatok
              fenntarthatóságához.
            </p>
            <div className={styles.imageContainer}>
            <Image className={styles.elip} alt="" src={Elip}></Image>
             <CircularText text={      "fenntartható jövő &nbsp;•&nbsp; digitális transzformáció &nbsp;•&nbsp; AI automatizáció &nbsp;•&nbsp; hatékonyság &nbsp;• &nbsp; költségoptimalizálás&nbsp; &nbsp;•&nbsp;&nbsp;&nbsp;"} />
            </div>
          </div>
        </div>
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

export default WhoWeAreMobile;
