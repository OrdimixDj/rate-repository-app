import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";

import Text from "./Text";

import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.contentBackgroundColor,
  },
});

const OrderByPicker = ({ selectedValue, setSelectedValue }) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue) => setSelectedValue(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="NORMAL" />
      <Picker.Item
        label="Highest rated repositories"
        value="RATING_AVERAGE_DESC"
      />
      <Picker.Item
        label="Lowest rated repositories"
        value="RATING_AVERAGE_ASC"
      />
    </Picker>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({
  selectedValue,
  setSelectedValue,
  repositories,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const navigate = useNavigate();

  const handlePress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item.id)}>
          <RepositoryItem repo={item} />
        </Pressable>
      )}
      ListHeaderComponent={() => (
        <OrderByPicker
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [selectedValue, setSelectedValue] = useState("NORMAL");

  const { data, loading, error } = useRepositories(selectedValue);

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

  return (
    <RepositoryListContainer
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      repositories={data.repositories}
    />
  );
};

export default RepositoryList;
