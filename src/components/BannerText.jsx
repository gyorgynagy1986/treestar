import React from "react";
import styles from "./BannerText.module.css";

import { bannertext } from "@/data/Banner";

const BannerText = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.scrollText}>
          <div className={styles.textGroup}>
            {bannertext.map((item, index) => (
              <React.Fragment key={index}>
                <div className={styles.dot}></div>
                <p className={styles.p}>{item.name}</p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerText;
