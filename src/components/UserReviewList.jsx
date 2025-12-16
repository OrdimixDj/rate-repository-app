import { FlatList, View, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";

import Text from "./Text";
import ReviewItem from "./ReviewItem";

import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.contentBackgroundColor,
  },
  emptyText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 24,
  },
});

const UserReviewList = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error : {error.message}</Text>
      </View>
    );
  }

  const reviews = data.me.reviews;
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  if (reviewNodes.length === 0) {
    return (
      <Text style={styles.emptyText}>
        You didn&apos;t create any review yet.
      </Text>
    );
  }

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
    />
  );
};

export default UserReviewList;
