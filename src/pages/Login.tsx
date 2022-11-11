import { Background } from "../components/backgrounds/Background";
import * as zod from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik, Form } from "formik";
import { Button } from "../components/buttons/Button";
import { TextInput } from "../components/inputs/TextInput";
import { login } from "./../api/users/usersAPI";

interface InitialValues {
  username: string;
  password: string;
}

const validationSchema = zod.object({
  username: zod.string().min(1),
  password: zod.string().min(1),
});

export const Login = () => {
  const loginInitialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (
    credentials: InitialValues,
    setSubbmiting: (param: boolean) => void
  ) => {
    await login(credentials)
      .then((token) => {
        localStorage.setItem("auth", token);
      })
      .catch(() => {
        //handled in interceptor
      });

    setSubbmiting(false);
  };

  return (
    <Background>
      <Formik
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting)
        }
        initialValues={loginInitialValues}
        validationSchema={toFormikValidationSchema(validationSchema)}
      >
        {({ touched, errors, isSubmitting, values }) => (
          <Form className="login">
            <h2 className="login__title">Login</h2>
            <p className="login__description">
              {`Enter you'r account details to login. If you don't have one ,
              create it here `}
              <a className="login__link" href="/register">
                register
              </a>
              {` or use test account `}
              <a className="login__link" href="#">
                {` here`}
              </a>
              {"."}
            </p>
            <TextInput
              name="username"
              placeholder="Username"
              error={errors.username}
              touched={touched.username}
              inputClassName="input--login"
              isEmpty={!!values.username}
            />
            <TextInput
              name="password"
              placeholder="Password"
              error={errors.password}
              touched={touched.password}
              inputClassName="input--login"
              isEmpty={!!values.password}
              type="password"
            />
            <Button
              className="btn--login"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Background>
  );
};
