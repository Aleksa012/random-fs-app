import { Field, FormikValues } from "formik";
import classNames from "classnames";
import { useState } from "react";
import eyeIcon from "../../assets/icons/eye.png";

interface TextInputProps extends Pick<FormikValues, "error" | "touched"> {
  inputClassName: string;
  placeholder: string;
  name: string;
  isEmpty: boolean;
  type?: string;
}

export const TextInput = ({
  inputClassName,
  error,
  touched,
  placeholder,
  name,
  isEmpty,
  type,
}: TextInputProps) => {
  const [showHidden, setShowHidden] = useState(false);

  const classExtension = inputClassName.slice(inputClassName.indexOf("-"));

  const inputClass = classNames("input", inputClassName);

  const placeholderClass = classNames(
    "input__placeholder",
    `input__placeholder${classExtension}`,
    {
      "input__placeholder--moved": !isEmpty,
      [`input__placeholder--moved${classExtension}`]: !isEmpty,
    }
  );

  const wrapperClass = classNames(
    "input__wrapper",
    `input__wrapper${classExtension}`
  );

  const errorClass = classNames(
    "input__error",
    `input__error${classExtension}`
  );

  const show = () => {
    setShowHidden(true);
  };

  const hide = () => {
    setShowHidden(false);
  };

  return (
    <div className={wrapperClass}>
      <span className={placeholderClass}>{placeholder}</span>
      {type === "password" && !isEmpty && (
        <img
          onMouseEnter={show}
          onMouseLeave={hide}
          className="icon icon--show-password"
          src={eyeIcon}
          alt=""
        />
      )}
      {!showHidden ? (
        <Field
          maxLength="16"
          type={type || "text"}
          className={inputClass}
          name={name}
        />
      ) : (
        <Field maxLength="16" type="text" className={inputClass} name={name} />
      )}
      {error && touched && <span className={errorClass}>{error}</span>}
    </div>
  );
};
