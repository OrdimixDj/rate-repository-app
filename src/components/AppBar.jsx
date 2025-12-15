import { View, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client/react";

import { ME } from "../graphql/queries";

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
  const { data } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });

  let signInComposant =
    data && data.me ? (
      <AppBarTab style={styles.flexItemB} text="Sign out" />
    ) : (
      <AppBarTab style={styles.flexItemB} text="Sign in" link="/signin" />
    );

  return (
    <View style={styles.flexContainer}>
      {/* flexContainer style already contained flexDirection: "row", so it wasn't necessary to put it again. */}
      <ScrollView horizontal>
        <AppBarTab style={styles.flexItemA} text="Repository" link="/" />
        {signInComposant}
      </ScrollView>
    </View>
  );
};

export default AppBar;
