import { TextInput, Pressable, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router";
import { useFormik } from "formik";

import Text from "./Text";
import theme from "../theme";

import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";

const validationSchema = yup.object().shape({
  owner: yup.string().required("Owner name is required"),
  name: yup.string().required("Repository name is required"),
  rate: yup
    .number()
    .required("Rate is required")
    .integer("Rate needs to be an integer")
    .min(0, "Rate cannot be under 0")
    .max(100, "Rate cannot be more than 100")
    .typeError("Rate has to be a number"),
  review: yup.string(),
});

const initialValues = {
  owner: "",
  name: "",
  rate: "",
  review: "",
};

const styles = StyleSheet.create({
  createReviewButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 4,
  },
  createReviewButtonText: {
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

const ReviewForm = ({ onSubmit }) => {
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
          getTextInputStyle(formik.touched.owner, formik.errors.owner),
        ]}
        placeholder="Repository owner name"
        value={formik.values.owner}
        onChangeText={formik.handleChange("owner")}
      />
      {formik.touched.owner && formik.errors.owner && (
        <Text style={styles.errorText}>{formik.errors.owner}</Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          getTextInputStyle(formik.touched.name, formik.errors.name),
        ]}
        placeholder="Repository name"
        value={formik.values.name}
        onChangeText={formik.handleChange("name")}
      />
      {formik.touched.name && formik.errors.name && (
        <Text style={styles.errorText}>{formik.errors.name}</Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          getTextInputStyle(formik.touched.rate, formik.errors.rate),
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rate}
        onChangeText={formik.handleChange("rate")}
      />
      {formik.touched.rate && formik.errors.rate && (
        <Text style={styles.errorText}>{formik.errors.rate}</Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          getTextInputStyle(formik.touched.review, formik.errors.review),
        ]}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        multiline
      />
      <Pressable
        style={styles.createReviewButton}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.createReviewButtonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const Review = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { owner, name, rate, review } = values;

    try {
      const { data } = await createReview({ owner, name, rate, review });
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default Review;
