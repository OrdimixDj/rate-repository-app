import { TextInput, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";

import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 4,
  },
  loginButtonText: {
    color: theme.colors.whiteText,
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
  },
  textInput: {
    padding: 15,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 4,
    borderWidth: 1,
  },
  errorText: {
    marginHorizontal: 10,
    marginTop: 5,
    color: theme.colors.errorColor,
  },
  errorBorder: {
    borderColor: theme.colors.errorColor,
  },
  normalTextBorder: {
    borderColor: theme.colors.textSecondary,
  },
});

const LoginForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const getTextInputStyle = (touched, error) => {
    if (touched && error) {
      return styles.errorBorder;
    }

    return styles.normalTextBorder;
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          getTextInputStyle(formik.touched.username, formik.errors.username),
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          getTextInputStyle(formik.touched.password, formik.errors.password),
        ]}
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.loginButton} onPress={formik.handleSubmit}>
        <Text style={styles.loginButtonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <LoginForm onSubmit={onSubmit} />;
};

export default SignIn;
