import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";

import Text from "./Text";

import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.contentBackgroundColor,
  },
  filter: {
    margin: 10,
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

const RepositoryListHeader = ({
  selectedValue,
  setSelectedValue,
  filterValue,
  setFilterValue,
}) => {
  return (
    <>
      <Searchbar
        style={styles.filter}
        placeholder="Filter"
        onChangeText={setFilterValue}
        value={filterValue}
      />
      <OrderByPicker
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
    </>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <RepositoryListHeader
        selectedValue={props.selectedValue}
        setSelectedValue={props.setSelectedValue}
        filterValue={props.filterValue}
        setFilterValue={props.setFilterValue}
      />
    );
  };

  render() {
    const props = this.props;

    const repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : [];

    const navigate = props.navigate;

    const handlePress = (id) => {
      navigate(`/repository/${id}`);
    };

    const ItemSeparator = () => <View style={styles.separator} />;

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item.id)}>
            <RepositoryItem repo={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedValue, setSelectedValue] = useState("NORMAL");
  const [filterValue, setFilterValue] = useState("");

  const [debouncedFilterValue] = useDebounce(filterValue, 500);

  const { data, loading, error } = useRepositories(
    selectedValue,
    debouncedFilterValue
  );

  const navigate = useNavigate();

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
      filterValue={filterValue}
      setFilterValue={setFilterValue}
      repositories={data.repositories}
      navigate={navigate}
    />
  );
};

export default RepositoryList;
