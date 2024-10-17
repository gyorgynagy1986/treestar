import React, { useEffect, useState, useRef } from "react";
import styles from "./PaginationControls.module.css";
import Image from "next/image";
import Left from "../../public/assets/left.svg";
import Right from "../../public/assets/right.svg";
import useWindowSize from "@/utils/useWindowSize";

const PaginationControls = ({
  currentPage,
  totalPages,
  onChange,
  interval = 3000,
  autoPlayDesktop = true,
  autoPlayMobile = true,
}) => {
  const [touchStartX, setTouchStartX] = useState(0);
  const autoSlide = useRef(null); // Az automatikus lapozást kezelő változó referencia
  const size = useWindowSize(); // Képernyő méretének figyelése

  // useEffect az automatikus lapozásért
  useEffect(() => {
    const shouldAutoPlay = size.width > 768 ? autoPlayDesktop : autoPlayMobile;

    if (shouldAutoPlay) {
      autoSlide.current = setInterval(() => {
        onChange((currentPage + 1) % totalPages);
      }, interval);
    }

    return () => {
      clearInterval(autoSlide.current); // Tisztítás, amikor a komponens eltávolításra kerül
    };
  }, [
    totalPages,
    onChange,
    interval,
    size.width,
    autoPlayDesktop,
    autoPlayMobile,
  ]);

  // Swipe event kezelése
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    handleSwipe(touchStartX, touchEndX);
  };

  const handleSwipe = (startX, endX) => {
    if (startX - endX > 50) {
      onChange(currentPage < totalPages - 1 ? currentPage + 1 : 0);
    } else if (endX - startX > 50) {
      onChange(currentPage > 0 ? currentPage - 1 : totalPages - 1);
    }
  };

  return (
    <div
      className={styles.pagination}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Előző gomb - ha az elején vagyunk, az utolsóra ugrik */}
      <Image
        width={70}
        height={70}
        style={{ cursor: "pointer", padding: "1rem" }}
        onClick={() =>
          onChange(currentPage > 0 ? currentPage - 1 : totalPages - 1)
        }
        src={Left}
        alt="Previous"
      />
      <div className={styles.indicationContainer}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={`${styles.paginationIndicators} ${
              currentPage === index ? styles.active : ""
            }`}
            onClick={() => onChange(index)}
          ></div>
        ))}
      </div>
      {/* Következő gomb - ha a végére érünk, az elejére ugrik */}
      <Image
        width={70}
        height={70}
        style={{ cursor: "pointer", padding: "1rem" }}
        onClick={() =>
          onChange(currentPage < totalPages - 1 ? currentPage + 1 : 0)
        }
        src={Right}
        alt="Next"
      />
    </div>
  );
};

export default PaginationControls;
