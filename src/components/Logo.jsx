import React from 'react'
import LogoDark from "./../../public/assets/logo2.svg";
import LogoPhoto from "./../../public/assets/logo.svg";
import Image from "next/image";
import styles from "./Logo.module.css";

const Logo = ({isDarkMode, classN, classNMenu}) => {
 
    return (
    <>
        <Image
            className={`${classN && styles.mobileLogo} ${classNMenu && styles.menuLogo}`}
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-delay="30"
            priority
            src={!isDarkMode ? LogoPhoto : LogoDark }
            alt="trestar logo"
        />
    </>
  )
}

export default Logo