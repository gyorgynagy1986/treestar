"use client";

import React, { useState } from "react";
import styles from "./Hero.module.css";
import PaginationControls from "@/utils/PaginationControls";
import HeroContent from "./HeroContent";

const Hero = () => {
  const [currentPage, setCurrentPage] = useState(0); // Aktuális oldal állapota
  const totalPages = 2; // Összes oldal (pl. 2 van)

  const handlePaginationChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <HeroContent currentPage={currentPage} />
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={handlePaginationChange}
        interval={15000} // Auto mozgás finomítás
      /> 
    </section>
  );
};

export default Hero;
