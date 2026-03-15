import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { FaArrowDown } from "react-icons/fa";
import type { IFormValues } from "../types/auth.types";
import styles from "./dateOfBirth.module.scss";

interface DateOfBirthProps {
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
}

const DateOfBirth = ({ register, errors }: DateOfBirthProps) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, i) => currentYear - i,
  );

  return (
    <div className={styles.dateOfBirth}>
      <label>Date of Birth:</label>

      <div className={styles["select-block"]}>
        {/* День */}
        <div className={styles["select-wrapper"]}>
          <select
            {...register("day", { required: "Please select day" })}
            className={errors.day ? styles.invalidBorder : ""}
          >
            <option value="">Day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <span className={styles.arrow}>
            <FaArrowDown />
          </span>
        </div>

        {/* Месяц */}
        <div className={styles["select-wrapper"]}>
          <select
            {...register("month", { required: "Please select month" })}
            className={errors.month ? styles.invalidBorder : ""}
          >
            <option value="">Month</option>
            {months.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <span className={styles.arrow}>
            <FaArrowDown />
          </span>
        </div>

        {/* Год */}
        <div className={styles["select-wrapper"]}>
          <select
            {...register("year", { required: "Please select year" })}
            className={errors.year ? styles.invalidBorder : ""}
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <span className={styles.arrow}>
            <FaArrowDown />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DateOfBirth;
