import { Background } from "../components/backgrounds/Background";
import * as zod from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik, Form } from "formik";
import { Button } from "../components/buttons/Button";
import { TextInput } from "../components/inputs/TextInput";
import { login } from "./../api/users/usersAPI";
import { setAuthToken } from "./../api/local-storage/localStorage";
import { useNavigate } from "react-router-dom";

interface InitialValues {
  username: string;
  password: string;
}

const validationSchema = zod.object({
  username: zod.string().min(1),
  password: zod.string().min(1),
});

export const Login = () => {
  const navigate = useNavigate();

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
        setAuthToken(token);
        navigate("/");
      })
      .catch(() => {
        //handled with interceptor
      });

    setSubbmiting(false);
  };

  const handleTestLogin = async () => {
    const testCredentials: {
      username: string;
      password: string;
    } = {
      username: import.meta.env.VITE_TEST_USERNAME,
      password: import.meta.env.VITE_TEST_PASS,
    };

    await login(testCredentials)
      .then((token) => {
        setAuthToken(token);
        navigate("/");
      })
      .catch(() => {
        //handled with interceptor
      });
  };

  const navigateToRegister = () => {
    navigate("/register");
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
              <span className="login__link" onClick={navigateToRegister}>
                register
              </span>
              {` or use test account `}
              <span
                className="login__link"
                onClick={handleTestLogin}
              >{` here`}</span>
              {"."}
            </p>
            <TextInput
              name="username"
              placeholder="Username"
              error={errors.username}
              touched={touched.username}
              inputClassName="input--login"
              isEmpty={!values.username}
            />
            <TextInput
              name="password"
              placeholder="Password"
              error={errors.password}
              touched={touched.password}
              inputClassName="input--login"
              isEmpty={!values.password}
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
