"use client";

import React, { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import PaginationControls from "@/utils/PaginationControls";
import HeroContent from "./HeroContent"; // Importáld a HeroContent komponenst
import HeroMobile from "./HeroMobile"; // Importáld a HeroMobile komponenst

const Hero = () => {
  const [currentPage, setCurrentPage] = useState(0); // Aktuális oldal állapota
  const [isDesktop, setIsDesktop] = useState(false); // Állapot a kijelző méretének figyelésére
  const totalPages = 2; // Összes oldal (pl. 2 van)

  const handlePaginationChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Figyeljük a képernyőméretet, és ha nagyobb mint 768px, beállítjuk a desktop nézetet
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Azonnali ellenőrzés a komponens betöltésekor
    handleResize();

    // Eseményfigyelő hozzáadása az ablakméret változásához
    window.addEventListener("resize", handleResize);

    // Tisztítás: távolítsuk el az eseményfigyelőt, amikor a komponens unmountolódik
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.section}>
      {/* Csak akkor rendereljük a HeroContent-et, ha desktop nézetben vagyunk */}
      {isDesktop ? (
        <div className={styles.DesktopContainer}>
          <HeroContent currentPage={currentPage} />
        </div>
      ) : (
        <HeroMobile currentPage={currentPage} /> // HeroMobile csak mobil nézetben
      )}

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
