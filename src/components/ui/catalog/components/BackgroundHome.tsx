import Image from "next/image";
import styles from "./style/BackgroundHome.module.css";

export default function BackgroundHome() {
  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/infoVellov.png"
          alt="vellov desktop"
          layout="responsive"
          width={1400}
          height={200}
          className={styles.imageDesktop}
        />
        <Image
          src="/images/infoVellovMobile.png"
          alt="vellov mobile"
          layout="responsive"
          width={375}
          height={200}
          className={styles.imageMobile}
        />
      </div>
    </div>
  );
}
