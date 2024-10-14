"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Nav.module.css';
import Logo from '../../../public/assets/logo.svg';
import Tree from '../../../public/assets/tree.svg';
import Hami from '../../../public/assets/icons/hambi.svg';


const Nav = ({ sticky }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <nav className={`${styles.nav} ${sticky && styles.navSticky}`}>

      <div className={styles.mobileNav}>
          <Image className={styles.mobileLogo} src={Logo} alt='logo' />
          <Image className={styles.mobilehambi} src={Hami} alt='logo' />
      </div>


      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image src={Logo} alt="trestar logo" />
        </div>
        <div className={styles.navContainer}>
          <ul className={styles.ul}>
            <li><Link href='#partnereink'>Partnereink</Link></li>
            <li><Link href='#megoldások'>Megoldásaink</Link></li>
            <li><Link href='#rólunk'>Rólunk</Link></li>
            <li>
              <Link
                className={styles.hoverBtn}
                href='#kapcsolat'
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Lépj velünk kapcsolatba
              </Link>
            </li>
          </ul>
          <div className={`${styles.logoContainerTree} ${isHovering ? styles.hide : ''}`}>
            <Image src={Tree} alt="trestar" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
