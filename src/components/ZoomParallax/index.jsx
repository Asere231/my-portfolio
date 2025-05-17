"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import Background from "../../../public/images/mountain.jpg";
import Galaxy from "../../../public/images/casey-horner-RmoWqDCqN2E-unsplash.jpg";
import CampNou from "../../../public/images/camp nou.jpg";
import Books from "../../../public/images/books.jpg";
import Church from "../../../public/images/church.jpg";
import Food from "../../../public/images/food.jpg";
import Game from "../../../public/images/game.jpg";
import Eclipse from "../../../public/images/eclipse.jpg";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Index() {
  // 1) ref for scroll tracking
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        <div className={styles.el}>
          <motion.div
            style={{ scale: scale4 }}
            className={styles.imageContainer}
          >
            <Image
              src={Eclipse}
              fill
              alt="Background galaxy"
              placeholder="blur"
              style={{ objectFit: "cover" }}
            ></Image>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
