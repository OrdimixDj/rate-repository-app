import { Pressable, View, StyleSheet } from "react-native";
import { useApolloClient } from "@apollo/client/react";
import Text from "./Text";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import theme from "../theme";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    paddingLeft: 15,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 25,
  },
  text: {
    color: theme.colors.whiteText,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = ({ text, link }) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOutPress = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  if (link) {
    return (
      <View style={styles.container}>
        {
          <Link to={link}>
            <Text style={styles.text}>{text}</Text>
          </Link>
        }
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {
        <Pressable onPress={handleSignOutPress}>
          <Text style={styles.text}>{text}</Text>
        </Pressable>
      }
    </View>
  );
};

export default AppBarTab;
