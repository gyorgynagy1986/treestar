"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./PaginationControls.module.css";
import Image from "next/image";
import Left from "../../public/assets/left.svg";
import Right from "../../public/assets/right.svg";

const PaginationControls = ({ currentPage, totalPages, onChange, interval = 3000 }) => {
  // useEffect az automatikus lapozásért
  useEffect(() => {
    const autoSlide = setInterval(() => {
      onChange((currentPage + 1) % totalPages); // Ugrik a következő oldalra, a kör végén vissza az elejére
    }, interval);

    return () => {
      clearInterval(autoSlide); // Tisztítás, amikor a komponens eltávolításra kerül
    };
  }, [currentPage, totalPages, onChange, interval]);

  return (
    <div className={styles.pagination}>
      {/* Előző gomb - ha az elején vagyunk, az utolsóra ugrik */}
      <Image
        width={70}
        height={70}
        style={{ cursor: "pointer", padding: "1rem" }}
        onClick={() => onChange(currentPage > 0 ? currentPage - 1 : totalPages - 1)}
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
