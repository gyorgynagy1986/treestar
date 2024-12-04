"use client";

import "aos/dist/aos.css"; // You can also use <link> for styles
import AOS from "aos";

import { useEffect } from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import tel from "../../../public/assets/icons/tel.svg";
import email from "../../../public/assets/icons/email.svg";
import { footerData } from "@/data/Footer";
import dynamic from 'next/dynamic';
import { useTheme } from '../../hooks/useTheme';

const LogoDinamic = dynamic(() => import('./../../components/Logo'), { ssr: false });


const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const { isDarkMode } = useTheme();


  return (
    <footer id="kapcsolat" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.logoContainer}>
          <LogoDinamic isDarkMode={isDarkMode} classN={true} />
          </div>
          <div className={styles.legalContainer}>
            <p className={styles.year}>{footerData.year} © TreeStar</p>
            <p className={styles.company}>{footerData.company}</p>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.contentContainerItems}>
            <div>
              <p className={styles.p}>{footerData.contactTitle}</p>
              <div className={styles.contactContainer}>
                <Image src={tel} alt={footerData.logoAlt} />
                <a href={`tel:${footerData.phone}`}>{footerData.phone}</a>
              </div>
              <div className={styles.contactContainer}>
                <Image src={email} alt={footerData.logoAlt} />
                <a href={`mailto:${footerData.email}`}>{footerData.email}</a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.legalContainermobile}>
          <p className={styles.yearMobile}>{footerData.year} © TreeStar</p>
          <p className={styles.companyMobile}>{footerData.company}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
