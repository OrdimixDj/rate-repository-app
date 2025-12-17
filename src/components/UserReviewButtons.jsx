import { Alert, StyleSheet, Pressable, View } from "react-native";
import { useNavigate } from "react-router-native";

import useDeleteReview from "../hooks/useDeleteReview";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    gap: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    marginVertical: 15,
    borderRadius: 4,
  },
  buttonText: {
    color: theme.colors.whiteText,
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
  },
  viewRepositoryButton: {
    backgroundColor: theme.colors.primary,
  },
  removeRepositoryButton: {
    backgroundColor: theme.colors.errorColor,
  },
});

const UserReviewButtons = ({ repositoryId, reviewId, refetch }) => {
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  const handleViewRepositoryButtonPress = () => {
    navigate(`/repository/${repositoryId}`);
  };

  const removeReview = async () => {
    try {
      await deleteReview({ reviewId });
      await refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveRepositoryButtonPress = () => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            removeReview();
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, styles.viewRepositoryButton]}
        onPress={handleViewRepositoryButtonPress}
      >
        <Text style={styles.buttonText}>View repository</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.removeRepositoryButton]}
        onPress={handleRemoveRepositoryButtonPress}
      >
        <Text style={styles.buttonText}>Delete review</Text>
      </Pressable>
    </View>
  );
};

export default UserReviewButtons;
