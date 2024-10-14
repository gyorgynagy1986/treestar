"use client";

import React, { useState, useRef, useEffect} from "react";
import styles from "./Hero.module.css";
import PaginationControls from "@/utils/PaginationControls";
import HeroContent from "./HeroContent";
import StickyNav from "../Nav/Nax";

const Hero = () => {
  const [currentPage, setCurrentPage] = useState(0); // Aktuális oldal állapota
  // const [stickyNav, setStickyNav] = useState(false)
  const totalPages = 2; // Összes oldal (pl. 2 van)

  const handlePaginationChange = (newPage) => {
    setCurrentPage(newPage);
  };

// const menuRef = useRef(null);
 // useEffect(() => {
 //   const observer = new IntersectionObserver(
 //     ([entry]) => {
 //       if (entry.isIntersecting) {
 //         setStickyNav(false)
 //       } else {
 //         setStickyNav(true)
 //       }
 //     },
 //     { rootMargin: '0px 0px 0px 0px' }
 //   );
 // 
 //   observer.observe(menuRef.current);
 // 
 // }, []);

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


// {stickyNav && <StickyNav sticky={true} />}