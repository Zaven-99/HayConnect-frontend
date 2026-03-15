import { FaArrowDown } from "react-icons/fa";
import styles from "./gender.module.scss";
import type { IFormValues } from "../types/auth.types";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface GenderProps {
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
}

const Gender = ({ register, errors }: GenderProps) => {
  return (
    <>
      <label className={styles["form-label"]} htmlFor="">
        Gender
      </label>
      <div className={styles["select-wrapper"]}>
        <select
          {...register("gender", { required: "Please select gender" })}
          className={errors.gender ? styles.invalidBorder : ""}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <span className={styles.arrow}>
          <FaArrowDown />
        </span>
      </div>
    </>
  );
};

export default Gender;
