import { StyleSheet } from "react-native";
import { View } from "react-native";
import { format } from "date-fns";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  flexContainer: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
  },
  flexItemA: {
    flexGrow: 0,
    width: 50,
    height: 50,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  flexItemB: {
    paddingLeft: 15,
    flexGrow: 1,
    flexShrink: 1,
  },
  usernameText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
  },
  dateText: {
    color: theme.colors.textSecondary,
    marginVertical: 5,
  },
  reviewText: {
    marginTop: 5,
    color: theme.colors.textPrimary,
  },
  scoreText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
});

const ReviewItem = ({ review }) => {
  const date = format(new Date(review.createdAt), "dd.MM.yyyy");

  return (
    <View testID="repositoryItem">
      <View style={styles.flexContainer}>
        <View style={styles.flexItemA}>
          <Text style={styles.scoreText}>{review.rating}</Text>
        </View>
        <View style={styles.flexItemB}>
          <Text style={styles.usernameText}>{review.user.username}</Text>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
