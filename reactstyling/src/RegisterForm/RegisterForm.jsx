import React, { useState } from "react";
import styles from "./register-form.module.css";

const InputStatus = {
  NORMAL: "normal",
  ERROR: "error",
  SUCCESS: "success",
};

function RegisterForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [nameError, setNameError] = useState(null);
  const [ageError, setAgeError] = useState(null);

  const [nameInputStatus, setNameInputStatus] = useState(InputStatus.NORMAL);
  const [ageInputStatus, setAgeInputStatus] = useState(InputStatus.NORMAL);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const validateName = (name) => {
    if (name.length < 1 || name.length > 10) {
      setNameError("이름은 1글자 이상, 10글자 이하여야 합니다.");
      setNameInputStatus(InputStatus.ERROR);
      return;
    }

    setNameInputStatus(InputStatus.SUCCESS);
  };

  const validateAge = (age) => {
    const numberedAge = Number(age);
    if (numberedAge < 1 || numberedAge > 100) {
      setAgeError("나이는 1부터 100 사이여야 합니다.");
      setAgeInputStatus(InputStatus.ERROR);
      return;
    }

    setAgeInputStatus(InputStatus.SUCCESS);
  };

  const validateForm = (form) => {
    validateName(form.name);
    validateAge(form.age);
  };

  const handleSubmit = () => {
    const formData = { name, age };
    validateForm(formData);
  };

  const handleReset = () => {
    setName("");
    setAge("");
  };

  const getInputStatusStyle = (status) => {
    if (status === InputStatus.ERROR) {
      return styles.inputInvalid;
    } else if (status === InputStatus.SUCCESS) {
      return styles.inputValid;
    }
    return "";
  };

  // CSS modules를 적용할 수 있도록 className을 수정하세요.
  return (
    <form className={styles.formContainer}>
      <fieldset className={styles.formFieldset}>
        <label
          className={`${styles.formLabel} ${
            nameInputStatus === InputStatus.ERROR ? styles.textError : ""
          } `}
          htmlFor="name"
        >
          이름
        </label>
        <input
          value={name}
          id="name"
          onChange={handleNameChange}
          type="text"
          name="name"
          className={`${styles.formInput} ${getInputStatusStyle(nameInputStatus)}`}
          placeholder="이름을 입력해 주세요."
        />

        <div className={`${styles.testError} ${styles.formError}`}>
          {nameInputStatus === InputStatus.ERROR && nameError}
        </div>
      </fieldset>

      <fieldset className={styles.formFieldset}>
        <label
          className={`${styles.formLabel} ${
            ageInputStatus === InputStatus.ERROR ? styles.textError : ""
          } `}
          htmlFor="age"
        >
          나이
        </label>
        <input
          id="age"
          value={age}
          onChange={handleAgeChange}
          type="number"
          name="age"
          className={`${styles.formInput} ${getInputStatusStyle(ageInputStatus)}`}
          placeholder="나이를 입력해 주세요."
        />

        <div className={`${styles.textError} ${styles.formError}`}>
          {ageInputStatus === InputStatus.ERROR && ageError}
        </div>
      </fieldset>

      <div className={styles.buttonContainer}>
        <button
          onClick={handleReset}
          type="button"
          className={`${styles.formButton} ${styles.resetButton}`}
        >
          초기화
        </button>

        <button
          onClick={handleSubmit}
          type="button"
          className={`${styles.formButton} ${styles.submitButton}`}
        >
          제출
        </button>
      </div>

      <pre className="debug">
        <code>{JSON.stringify({ name, age }, null, 2)}</code>
      </pre>
    </form>
  );
}

export default RegisterForm;