import * as zod from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik, Form } from "formik";
import { Button } from "../../components/buttons/Button";
import { TextInput } from "../../components/inputs/TextInput";
import { getSelf, login } from "./../../api/users/usersAPI";
import { setAuthToken, setUser } from "./../../api/local-storage/localStorage";
import { useNavigate } from "react-router-dom";

const validationSchema = zod.object({
  username: zod.string().min(1),
  password: zod.string().min(1),
});

type CredentialsType = zod.infer<typeof validationSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();

  const loginInitialValues: CredentialsType = {
    username: "",
    password: "",
  };

  const afterLogin = async (token: string) => {
    setAuthToken(token);
    const user = await getSelf();
    setUser(user);
    navigate("/");
  };

  const handleSubmit = async (
    credentials: CredentialsType,
    setSubbmiting: (param: boolean) => void
  ) => {
    try {
      const token = await login(credentials);
      await afterLogin(token);
    } catch (error) {
      //handled in interceptor
    }

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

    try {
      const token = await login(testCredentials);
      await afterLogin(token);
    } catch (error) {
      //handled in interceptor
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div>
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
        create it `}
              <span className="login__link" onClick={navigateToRegister}>
                here
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
    </div>
  );
};
