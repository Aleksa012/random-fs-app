import { TextInput } from "../components/inputs/TextInput";
import { Formik, Form } from "formik";
import { Button } from "../components/buttons/Button";
import * as zod from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Background } from "../components/backgrounds/Background";
import { register, RegisterData } from "../api/users/usersAPI";
import { useNavigate } from "react-router-dom";

const validationSchema = zod
  .object({
    username: zod.string().min(1).max(12),
    firstName: zod.string().min(1).max(10),
    lastName: zod.string().min(1).max(10),
    password: zod.string().min(8, "Must be at least 8 characters long").max(12),
    confirmPassword: zod.string().min(1),
    email: zod.string().email(),
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

export const Register = () => {
  const navigate = useNavigate();

  const initialValues: RegisterValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
  };

  const handleSubmit = async (
    { username, password, email, firstName, lastName }: RegisterValues,
    setSubbmiting: (param: boolean) => void
  ) => {
    const regData: RegisterData = {
      username,
      password,
      email,
      firstName,
      lastName,
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

  return (
    <Background>
      <Formik
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting)
        }
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(validationSchema)}
      >
        {({ touched, errors, isSubmitting, values }) => (
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
    </Background>
  );
};
