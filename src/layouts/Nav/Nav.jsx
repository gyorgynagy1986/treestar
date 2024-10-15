"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Nav.module.css";
import Logo from "../../../public/assets/logo.svg";
import Tree from "../../../public/assets/tree.svg";
import Hami from "../../../public/assets/icons/hambi.svg";
import CloseIcon from "../../../public/assets/icons/hambi.svg"; // Correct Close icon reference

const Nav = ({ sticky }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu toggle

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (mobileMenuOpen) {
      // Prevent scrolling on open
      htmlElement.style.overflow = 'hidden';
    } else {
      // Allow scrolling again
      htmlElement.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]); // Only re-run the effect if mobileMenuOpen changes

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${sticky && styles.navSticky}`}>
      {/* Mobile Nav */}
      <div className={styles.mobileNav}>
        <Image className={styles.mobileLogo} src={Logo} alt="logo" />
        <div onClick={toggleMobileMenu} className={styles.hamburgerMenu}>
          <Image
            className={styles.mobilehambi}
            src={mobileMenuOpen ? CloseIcon : Hami}
            alt="menu icon"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ""}`}>
        <div className={styles.mobileMenuHeader}>
          <Image className={styles.menuLogo} src={Logo} alt="logo" /> {/* Logo inside the menu */}
          <div onClick={toggleMobileMenu} className={styles.closeButton}>
            <Image src={CloseIcon} alt="Close menu" /> {/* Close icon */}
          </div>
        </div>
        <ul className={styles.mobileUl}>
          <li onClick={closeMobileMenu}>
            <Link href="#partnereink">Partnereink</Link>
          </li>
          <li onClick={closeMobileMenu}>
            <Link href="#megoldások">Megoldásaink</Link>
          </li>
          <li onClick={closeMobileMenu}>
            <Link href="#rólunk">Rólunk</Link>
          </li>
          <li onClick={closeMobileMenu}>
            <Link className={styles.mobileContact} href="#kapcsolat">Lépj velünk kapcsolatba <Image src={Tree} alt="trestar" /></Link>
          </li>
        </ul>
      </div>

      {/* Desktop Nav */}
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image src={Logo} alt="trestar logo" />
        </div>
        <div className={styles.navContainer}>
          <ul className={styles.ul}>
            <li>
              <Link href="#partnereink">Partnereink</Link>
            </li>
            <li>
              <Link href="#megoldások">Megoldásaink</Link>
            </li>
            <li>
              <Link href="#rólunk">Rólunk</Link>
            </li>
            <li>
              <Link
                className={styles.hoverBtn}
                href="#kapcsolat"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Lépj velünk kapcsolatba
              </Link>
            </li>
          </ul>
          <div className={`${styles.logoContainerTree} ${isHovering ? styles.hide : ""}`}>
            <Image src={Tree} alt="trestar" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
