import { useFormik } from "formik";
import * as yup from "yup";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        const { data } = await signIn({ username, password });
        console.log(data);
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username &&
            formik.errors.username &&
            styles.inputError,
        ]}
        placeholder="Username"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password &&
            formik.errors.password &&
            styles.inputError,
        ]}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}
      <Button title="Sign in" onPress={formik.handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
});

export default SignIn;
