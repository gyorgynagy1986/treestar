import Abstract from '../../../public/assets/abstract.svg'
import AbstractM from '../../../public/assets/abstractM.svg'

import React from 'react'
import Image from "next/image";
import styles from "./Partners.module.css";

const LogoAbs = ({dark}) => {
  return   <Image className={styles.abs} src={dark ? AbstractM : Abstract} alt="treestar" />

}

export default LogoAbs