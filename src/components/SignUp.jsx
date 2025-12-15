import { TextInput, Pressable, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router";
import Text from "./Text";
import { useFormik } from "formik";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import theme from "../theme";

import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username needs to contain at least 5 caracters")
    .max(30, "Username can not contain more than 30 caracters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password needs to contain at least 5 caracters")
    .max(50, "Password can not contain more than 50 caracters"),
  passwordbis: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Incorrect password confirmation"),
});

const initialValues = {
  username: "",
  password: "",
  passwordbis: "",
};

const styles = StyleSheet.create({
  signUpButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 4,
  },
  signUpButtonText: {
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

const SignUpForm = ({ onSubmit }) => {
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
      <TextInput
        style={[
          styles.textInput,
          getTextInputStyle(
            formik.touched.passwordbis,
            formik.errors.passwordbis
          ),
        ]}
        secureTextEntry
        placeholder="Password confirmation"
        value={formik.values.passwordbis}
        onChangeText={formik.handleChange("passwordbis")}
      />
      {formik.touched.passwordbis && formik.errors.passwordbis && (
        <Text style={styles.errorText}>{formik.errors.passwordbis}</Text>
      )}
      <Pressable style={styles.signUpButton} onPress={formik.handleSubmit}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
