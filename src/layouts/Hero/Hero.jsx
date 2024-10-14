"use client";

import React, { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import PaginationControls from "@/utils/PaginationControls";
import HeroContent from "./HeroContent"; // Importáld a HeroContent komponenst
import HeroMobile from "./HeroMobile";
// import StickyNav from "../Nav/Nax";

const Hero = () => {
  const [currentPage, setCurrentPage] = useState(0); // Aktuális oldal állapota
  const [isDesktop, setIsDesktop] = useState(false); // Állapot a kijelző méretének figyelésére
  const totalPages = 2; // Összes oldal (pl. 2 van)

  const handlePaginationChange = (newPage) => {
    setCurrentPage(newPage);
  };

  
  return (
    <section className={styles.section}>
      {/* Csak akkor rendereljük a HeroContent-et, ha desktop nézetben vagyunk */}
      <div className={styles.DesktopContainer}>
        <HeroContent currentPage={currentPage} /> </div>

      <HeroMobile />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={handlePaginationChange}
        interval={15000} // Automatikus lapozás finomítás
      />
    </section>
  );
};

export default Hero;
