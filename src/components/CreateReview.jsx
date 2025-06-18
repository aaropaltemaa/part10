import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),
  text: yup.string(),
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  inputError: {
    borderColor: "#d73a4a",
  },
  errorText: {
    color: "#d73a4a",
    marginBottom: 8,
  },
});

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setTouched }) => {
      setTouched({
        ownerName: true,
        repositoryName: true,
        rating: true,
        text: true,
      });
      try {
        const { ownerName, repositoryName, rating, text } = values;
        const { data } = await createReview({
          variables: {
            review: {
              ownerName,
              repositoryName,
              rating: Number(rating),
              text,
            },
          },
        });
        console.log("Mutation result:", data);
        if (data?.createReview?.repositoryId) {
          navigate(`/repository/${data.createReview.repositoryId}`);
        }
      } catch (e) {
        console.log("Mutation error:", e);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.ownerName &&
            formik.errors.ownerName &&
            styles.inputError,
        ]}
        placeholder="Repository owner's GitHub username"
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
        value={formik.values.ownerName}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            styles.inputError,
        ]}
        placeholder="Repository name"
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
        value={formik.values.repositoryName}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating && styles.inputError,
        ]}
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
        value={formik.values.rating}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Review"
        multiline
        numberOfLines={4}
        onChangeText={formik.handleChange("text")}
        onBlur={formik.handleBlur("text")}
        value={formik.values.text}
      />

      <Button
        title="Create a review"
        onPress={() => formik.handleSubmit()}
        disabled={formik.isSubmitting}
      />
    </View>
  );
};

export default CreateReview;
