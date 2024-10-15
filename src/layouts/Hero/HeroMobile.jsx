import React from 'react'
import styles from './HeroMobile.module.css'
import Image from 'next/image'
import Hero from '../../../public/assets/layouts/heroMobile.png'


const HeroMobile = () => {
  return (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className={styles.itemsContainer}>
                <h1 className={styles.h1}>AI automatizációval</h1>
                <p  className={styles.p}> hatékonyabbá tesszük a munkafolyamataid</p>
            </div>
            <Image priority   layout="responsive" className={styles.HeroMobile} src={Hero} alt='treestar' />
            <div className={styles.itemsContainer}>
                <h1 className={styles.h1}>Digitális transzformációval</h1>
                <p  className={styles.p}> a fenntartható jövőbe vezetjük át a termelési folyamatokat</p>
            </div>
        </div>
    </section>
  )
}

export default HeroMobile