import React from "react";
import styles from "./Solutions.module.css";
import Image from "next/image";

const ContentComponent = ({ content }) => {
  return (
    <section id="megoldások">
    <div className={styles.container}>
      <div className={styles.fotoContainer}>
        <Image priority src={content.image} alt={content.title} />
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.h3}>{content.title}</h3>
        <div className={styles.textContainer_container}>
          {content.text.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default ContentComponent;
