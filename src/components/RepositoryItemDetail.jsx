import { Pressable, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client/react";

import * as Linking from "expo-linking";

import Text from "./Text";
import theme from "../theme";
import { GET_REPOSITORY_DETAILS } from "../graphql/queries";

const styles = StyleSheet.create({
  githubButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 4,
  },
  githubButtonText: {
    color: theme.colors.whiteText,
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
  },
});

const RepositoryItemDetail = () => {
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

  const handleGitHubButtonPress = async () => {
    try {
      await Linking.openURL(data.repository.url);
    } catch (error) {
      console.error(`Impossible to open : ${data.repository.url}`);
    }
  };

  return (
    <View>
      <RepositoryItem repo={data.repository} />
      <Pressable style={styles.githubButton} onPress={handleGitHubButtonPress}>
        <Text style={styles.githubButtonText}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

export default RepositoryItemDetail;
