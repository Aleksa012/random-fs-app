import { Field, FormikValues } from "formik";
import classNames from "classnames";

interface TextInputProps extends Pick<FormikValues, "error" | "touched"> {
  inputClassName: string;
  placeholder: string;
  name: string;
  isEmpty: boolean;
}

export const TextInput = ({
  inputClassName,
  error,
  touched,
  placeholder,
  name,
  isEmpty,
}: TextInputProps) => {
  const classExtension = inputClassName.slice(inputClassName.indexOf("-"));

  const inputClass = classNames("input", inputClassName);

  const placeholderClass = classNames(
    "input__placeholder",
    `input__placeholder${classExtension}`,
    {
      "input__placeholder--moved": isEmpty,
      [`input__placeholder--moved${classExtension}`]: isEmpty,
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

  return (
    <div className={wrapperClass}>
      <span className={placeholderClass}>{placeholder}</span>
      <Field className={inputClass} name={name} />
      {error && touched && <span className={errorClass}>{error}</span>}
    </div>
  );
};
