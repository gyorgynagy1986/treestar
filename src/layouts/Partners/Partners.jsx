"use client";
import "aos/dist/aos.css"; // You can also use <link> for styles
import AOS from "aos";

import React, {useEffect} from "react";
import styles from "./Partners.module.css";
import Image from "next/image";
import { partners } from "@/data/Partners";
import Abstract from "../../../public/assets/abstract.svg";

const Partners = () => {

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  return (
    <section  data-aos="fade-up"
    data-aos-offset="100" id="partnereink" className={styles.section}>
      <div className={styles.partnersContainer}>
        <Image className={styles.abs} src={Abstract} alt="treestar" />
        <div className={styles.titleContainer1}>
          <h2 className={styles.title}>Partnereink</h2>
        </div>
        <div className={styles.titleContainer2}></div>
        <div className={styles.titleContainer}></div>
        <div className={styles.imagesContainer}>
          {partners.map((el) => (
            < div  data-aos="fade"
            data-aos-offset="100"
            data-aos-delay="50">
              <Image  src={el.src} alt={el.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
