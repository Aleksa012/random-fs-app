import { TextInput } from "../../components/inputs/TextInput";
import { Formik, Form } from "formik";
import { Button } from "../../components/buttons/Button";
import * as zod from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { register, RegisterData } from "../../api/users/usersAPI";
import { useNavigate } from "react-router-dom";

import smileIcon from "../../assets/icons/smiling.png";
import sadIcon from "../../assets/icons/sad.png";
import angryIcon from "../../assets/icons/angry.png";
import starIcon from "../../assets/icons/star.png";
import winkIcon from "../../assets/icons/wink.png";
import { useState } from "react";
import classNames from "classnames";

const validationSchema = zod
  .object({
    username: zod.string().min(1).max(12, "Can't be longer than 12 characters"),
    firstName: zod
      .string()
      .min(1)
      .max(10, "Can't be longer than 10 characters"),
    lastName: zod.string().min(1).max(10, "Can't be longer than 10 characters"),
    password: zod
      .string()
      .min(8, "Must be at least 8 characters long")
      .max(12, "Can't be longer than 12 characters"),
    confirmPassword: zod.string().min(1),
    email: zod.string().email(),
    icon: zod.string().default("/"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword.trim() !== password.trim()) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords don't match",
      });
    }
  });

export type RegisterValues = zod.infer<typeof validationSchema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [iconSlectionTracker, setIconSelectionTracker] = useState(
    new Array(5).fill(false)
  );

  const initialValues: RegisterValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    icon: "",
  };

  const handleSubmit = async (
    { username, password, email, firstName, lastName, icon }: RegisterValues,
    setSubbmiting: (param: boolean) => void
  ) => {
    const regData: RegisterData = {
      username,
      password,
      email,
      firstName,
      lastName,
      icon,
    };

    try {
      const data = await register(regData);
      alert(data);
      navigate("/login");
    } catch (error) {
      //handled in interceptor
    }

    setSubbmiting(false);
  };

  const handleIconSelect = (
    index: number,
    fieldSet: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void,
    fieldValue: string
  ) => {
    setIconSelectionTracker((prev) =>
      prev.map((_, i) => (i === index ? true : false))
    );
    fieldSet("icon", fieldValue);
  };

  const iconClass = (index: number) =>
    classNames("icon", "icon--register", {
      "icon--register-active": iconSlectionTracker[index],
    });

  return (
    <Formik
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting)
      }
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validationSchema)}
    >
      {({ touched, errors, isSubmitting, values, setFieldValue }) => (
        <Form className="register">
          <h2 className="register__title">Register</h2>
          <TextInput
            name="username"
            placeholder="Username"
            error={errors.username}
            touched={touched.username}
            inputClassName="input--register"
            isEmpty={!values.username}
          />
          <TextInput
            name="email"
            placeholder="E-mail"
            error={errors.email}
            touched={touched.email}
            inputClassName="input--register"
            isEmpty={!values.email}
          />
          <div className="wrapper">
            <TextInput
              name="firstName"
              placeholder="First Name"
              error={errors.firstName}
              touched={touched.firstName}
              inputClassName="input--register"
              isEmpty={!values.firstName}
            />
            <TextInput
              name="lastName"
              placeholder="Last Name"
              error={errors.lastName}
              touched={touched.lastName}
              inputClassName="input--register"
              isEmpty={!values.lastName}
            />
          </div>
          <TextInput
            name="password"
            placeholder="Password"
            error={errors.password}
            touched={touched.password}
            inputClassName="input--register"
            isEmpty={!values.password}
            type="password"
          />
          <TextInput
            name="confirmPassword"
            placeholder="Confirm Password"
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            inputClassName="input--register"
            isEmpty={!values.confirmPassword}
            type="password"
          />
          <div className="register__icons">
            <span className="register__icons-title">Pick an Icon</span>
            <img
              onClick={() => handleIconSelect(0, setFieldValue, "smileIcon")}
              className={iconClass(0)}
              src={smileIcon}
              alt="smile"
            />
            <img
              onClick={() => handleIconSelect(1, setFieldValue, "angryIcon")}
              className={iconClass(1)}
              src={angryIcon}
              alt="angry"
            />
            <img
              onClick={() => handleIconSelect(2, setFieldValue, "sadIcon")}
              className={iconClass(2)}
              src={sadIcon}
              alt="sad"
            />
            <img
              onClick={() => handleIconSelect(3, setFieldValue, "starIcon")}
              className={iconClass(3)}
              src={starIcon}
              alt="star"
            />
            <img
              onClick={() => handleIconSelect(4, setFieldValue, "winkIcon")}
              className={iconClass(4)}
              src={winkIcon}
              alt="wink"
            />
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="btn--register"
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};
