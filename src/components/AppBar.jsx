import { View, StyleSheet, ScrollView } from "react-native";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  flexContainer: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.menuBackgroundColor,
  },
  flexItemA: {
    flexGrow: 0,
  },
  flexItemB: {
    flexGrow: 1,
  },
});

const AppBar = () => {
  return (
    <View style={styles.flexContainer}>
      {/* flexContainer style already contained flexDirection: "row", so it wasn't necessary to put it again. */}
      <ScrollView horizontal>
        <AppBarTab style={styles.flexItemA} text="Repository" link="/" />
        <AppBarTab style={styles.flexItemB} text="Sign in" link="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
