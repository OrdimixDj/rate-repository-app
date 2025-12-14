import { FlatList, View, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client/react";

import Text from "./Text";
import { GET_REPOSITORIES } from "../graphql/queries";

import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.contentBackgroundColor,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
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

  const repositories = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repo={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
