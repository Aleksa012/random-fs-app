import * as zod from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik, Form, Field } from "formik";
import { Button } from "../buttons/Button";
import {
  createPost,
  getByAuthor,
  PostResponse,
} from "./../../api/posts/postsAPI";

const validationSchema = zod.object({
  content: zod.string().min(1).trim().max(500, "Must be max of 500 characters"),
});

type FormData = zod.infer<typeof validationSchema>;

export const CreatePostForm = ({
  refreshPosts,
  closeModal,
}: {
  refreshPosts: (posts: PostResponse[]) => void;
  closeModal?: () => void;
}) => {
  const initialValues = {
    content: "",
  };

  const handleSubmit = async (
    values: FormData,
    setSubbmiting: (param: boolean) => void
  ) => {
    await createPost({ ...values, content: values.content.trim() });
    const { posts } = await getByAuthor();
    setSubbmiting(false);
    refreshPosts(posts.reverse());
    if (closeModal) closeModal();
  };

  return (
    <Formik
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting)
      }
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validationSchema)}
    >
      {({ touched, errors, isSubmitting, values }) => (
        <Form className="create-post">
          <div className="wrapper">
            <Field
              as="textarea"
              placeholder="Some text..."
              name="content"
              className="create-post__content"
            />
            {touched.content && errors.content && (
              <p className="create-post__error">{errors.content}</p>
            )}
          </div>
          <Button className="btn--modal" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
