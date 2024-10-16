"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import styles from "./Hero.module.css";
import PaginationControls from "@/utils/PaginationControls";
import HeroContent from "./HeroContent"; // Desktop verzióhoz
import HeroMobile from "./HeroMobile"; // Mobil verzióhoz
import StickyNav from "../Nav/Nav";
import useWindowSize from "@/utils/useWindowSize";

const Hero = () => {
  const [currentPage, setCurrentPage] = useState(0); // Aktuális oldal állapota
  const totalPages = 2; // Összes oldal (pl. 2 van)
  // const size = useWindowSize(); // Képernyő méretének figyelése

  const menuRef = useRef(null);
  const [stickyNav, setStickyNav] = useState(false);

  const handlePaginationChange = (newPage) => {
    setCurrentPage(newPage);
  };


  return (
    <section ref={menuRef} className={styles.section}>
      {stickyNav && <StickyNav sticky={true} />}

      <div className={styles.DesktopContainer}>
          <HeroContent currentPage={currentPage} />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={handlePaginationChange}
            autoPlayDesktop={true}
            interval={15000} // Automatikus lapozás finomítás
          />
        </div>

        <div className={styles.MobileContainer}>
          <HeroMobile
            currentPage={currentPage}
            onChange={handlePaginationChange}
            totalPages={totalPages}
            autoPlayMobile={true}
            interval={15000} // Automatikus lapozás finomítás
          />
        </div>
    </section>
  );
};

export default Hero;
