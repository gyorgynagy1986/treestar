"use client";

import "aos/dist/aos.css"; // You can also use <link> for styles
import AOS from "aos";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Hero.module.css";
import PaginationControls from "@/utils/PaginationControls";
import HeroContent from "./HeroContent"; // Desktop verzióhoz
import HeroMobile from "./HeroMobile"; // Mobil verzióhoz
import StickyNav from "../Nav/Nav";
// import useWindowSize from "@/utils/useWindowSize";

const Hero = () => {
  const [currentPage, setCurrentPage] = useState(0); // Aktuális oldal állapota
  const totalPages = 2; // Összes oldal (pl. 2 van)

  const menuRef = useRef(null);
  const [stickyNav, setStickyNav] = useState(false);

  console.log(stickyNav)

  const handlePaginationChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStickyNav(false);
        } else {
          setStickyNav(true);
        }
      },
      { rootMargin: "0px 20px 20px 20px" }
    );
  
    setTimeout(() => {
      observer.observe(menuRef.current);
    }, 1000); // 1 másodperc késleltetés
  }, []);



  return (
    <section ref={menuRef} className={styles.section}>
      {stickyNav && <StickyNav sticky={true} />}
      <div  data-aos="fade" data-aos-offset="100"data-aos-delay="50">
    

      <div   className={styles.DesktopContainer}>
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
        </div>
    </section>
  );
};

export default Hero;
