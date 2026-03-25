import { FaStar } from "react-icons/fa";
import styles from "./Raiting.module.scss";
import { useState } from "react";

interface RaitingProps {
  max?: number;
  value: number;
  onRate?: (n: number) => void;
  disabled?: boolean;
}

export const Raiting = ({
  max = 10,
  value,
  onRate,
  disabled,
}: RaitingProps) => {
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.container}>
      {Array.from({ length: max }, (_, i) => i + 1).map((num) => (
        <FaStar
          key={num}
          size={24}
          className={`${styles.star} ${num <= (hover || value) ? styles.active : ""}`}
          onClick={() => !disabled && onRate?.(num)}
          onMouseEnter={() => !disabled && setHover(num)}
          onMouseLeave={() => !disabled && setHover(0)}
        />
      ))}
    </div>
  );
};
