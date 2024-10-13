import React from "react";
import Image from "next/image";
import Logo from "../../../public/assets/logo.svg";
import styles from "./Nav.module.css";
import Tree from "../../../public/assets/tree.svg";
const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div>
          <Image src={Logo} alt="trestar logo" />
        </div>
        <div className={styles.navContainer}>
          <ul className={styles.ul}>
            <li>Partnereink</li>
            <li>Megoldásaink</li>
            <li>Rólunk</li>
            <li>Lépjünk kapcsolatba!</li>
          </ul>
          <Image src={Tree} alt="trestar" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
