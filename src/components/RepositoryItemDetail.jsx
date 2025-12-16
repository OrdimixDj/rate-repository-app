import { Pressable, StyleSheet, FlatList } from "react-native";
import { useParams } from "react-router-native";
import { View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client/react";
import ReviewItem from "./ReviewItem";

import * as Linking from "expo-linking";

import Text from "./Text";
import theme from "../theme";
import { GET_REPOSITORY_DETAILS } from "../graphql/queries";

const styles = StyleSheet.create({
  githubButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 4,
  },
  githubButtonText: {
    color: theme.colors.whiteText,
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.contentBackgroundColor,
  },
});

const RepositoryInfo = ({ repository }) => {
  const handleGitHubButtonPress = async () => {
    try {
      await Linking.openURL(repository.url);
    } catch (error) {
      console.error(`Impossible to open : ${repository.url}`);
    }
  };

  return (
    <View>
      <RepositoryItem repo={repository} />
      <Pressable style={styles.githubButton} onPress={handleGitHubButtonPress}>
        <Text style={styles.githubButtonText}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { repositoryId: id },
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

  const ItemSeparator = () => <View style={styles.separator} />;

  const repository = data.repository;
  const reviews = data.repository.reviews;

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={repository} />
          <View style={styles.separator} />
        </>
      )}
    />
  );
};

export default SingleRepository;
