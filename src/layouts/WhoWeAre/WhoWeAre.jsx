"use client";
import React, { useState } from "react";
import styles from "./WhoWeAre.module.css";
import Image from "next/image";
import contents from "@/data/WhoWeAre"; // text data

const WhoWeAre = () => {
  const [path, setPath] = useState(1);

  const renderContent = ({ text, image, svgText }) => (
    <div className={styles.contentContainer}>
      <div className={styles.textContainer}>
        {text.map((paragraph, index) => (
          <p key={index}>
            <b>{index === 0 ? paragraph.split(".")[0] + "." : ""}</b>
            {index === 0
              ? paragraph.slice(paragraph.indexOf(".") + 1)
              : paragraph}
          </p>
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
