"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Hero.module.css";
import PaginationControls from "@/utils/PaginationControls";
import HeroContent from "./HeroContent"; // Importáld a HeroContent komponenst
import HeroMobile from "./HeroMobile";
import StickyNav from "../Nav/Nav";

const Hero = () => {
  const [currentPage, setCurrentPage] = useState(0); // Aktuális oldal állapota
  const totalPages = 2; // Összes oldal (pl. 2 van)

  const menuRef = useRef(null);
  const [stickyNav, setStickyNav] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStickyNav(false);
        } else {
          setStickyNav(true);
        }
      },
      { rootMargin: "0px 300px 300px 20px" }
    );

    if (menuRef.current) {
      observer.observe(menuRef.current);
    }

    return () => {
      if (menuRef.current) {
        observer.unobserve(menuRef.current);
      }
    };
  }, []);

  const handlePaginationChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <section ref={menuRef} className={styles.section}>
      {stickyNav && <StickyNav sticky={true} />}

      <div className={styles.DesktopContainer}>
        <HeroContent currentPage={currentPage} />
      </div>
      <HeroMobile />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={handlePaginationChange}
        autoPlayDesktop = {true}
        autoPlayMobile = {true}
        interval={15000} // Automatikus lapozás finomítás
      />
    </section>
  );
};

export default Hero;
