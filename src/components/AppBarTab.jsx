import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import theme from "../theme";

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
  return (
    <View style={styles.container}>
      {
        <Pressable>
          <Link to={link}>
            <Text style={styles.text}>{text}</Text>
          </Link>
        </Pressable>
      }
    </View>
  );
};

export default AppBarTab;
