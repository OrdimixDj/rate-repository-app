import { TextInput, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";

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
    borderColor: theme.colors.textSecondary,
  },
});

const LoginForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
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
