import { Text, Pressable, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    paddingLeft: 15,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 25,
    backgroundColor: theme.colors.menuBackgroundColor,
  },
  text: {
    color: theme.colors.whiteText,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <View style={styles.container}>
      {
        <Pressable>
          <Text style={styles.text}>{text}</Text>
        </Pressable>
      }
    </View>
  );
};

export default AppBarTab;
