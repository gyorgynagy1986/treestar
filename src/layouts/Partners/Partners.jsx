import React from "react";
import styles from "./Partners.module.css";
import Image from "next/image";
import { partners } from "@/data/Partners";
import Abstract from '../../../public/assets/abstract.svg'

const Partners = () => {
  return (
    <section id="partnereink" className={styles.section}>
      <div className={styles.partnersContainer}>
      <Image className={styles.abs} src={Abstract} alt="treestar" />
        <div className={styles.titleContainer1}>
          <h2 className={styles.title}>Partnereink</h2>
        </div>
        <div className={styles.titleContainer2}></div>
        <div className={styles.titleContainer}></div>
        <div className={styles.imagesContainer}>
          {partners.map((el) => (
            <>
              <Image src={el.src} alt={el.alt} />
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
