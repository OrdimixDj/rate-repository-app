import { View, Text, StyleSheet, Image } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  flexContainer: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
  },
  flexItemA: {
    flexGrow: 0,
  },
  flexItemB: {
    paddingLeft: 15,
    flexGrow: 1,
    flexShrink: 1,
  },
  statisticsFlexContainer: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statisticsFlexVariousItem: {
    flexGrow: 1,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  primaryText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
  },
  secondaryText: {
    color: theme.colors.textSecondary,
    marginTop: 10,
  },
  languageView: {
    marginTop: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    alignSelf: "flex-start",
    padding: 5,
  },
  languageText: {
    color: theme.colors.whiteText,
  },
});

const RepositoryItem = ({ repo }) => {
  let stargazersCount = repo.stargazersCount;
  let forksCount = repo.forksCount;
  let reviewCount = repo.reviewCount;

  if (stargazersCount >= 1000) {
    stargazersCount = (stargazersCount / 1000).toFixed(1) + "k";
  }

  if (forksCount >= 1000) {
    forksCount = (forksCount / 1000).toFixed(1) + "k";
  }

  if (reviewCount >= 1000) {
    reviewCount = (reviewCount / 1000).toFixed(1) + "k";
  }

  return (
    <View>
      <View style={styles.flexContainer}>
        <View style={styles.flexItemA}>
          <Image style={styles.avatar} source={{ uri: repo.ownerAvatarUrl }} />
        </View>
        <View style={styles.flexItemB}>
          <Text style={styles.primaryText}>{repo.fullName}</Text>
          <Text style={styles.secondaryText}>{repo.description}</Text>
          <View style={styles.languageView}>
            <Text style={styles.languageText}>{repo.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statisticsFlexContainer}>
        <View style={styles.statisticsFlexVariousItem}>
          <Text style={styles.primaryText}>{stargazersCount}</Text>
          <Text style={styles.secondaryText}>Stars</Text>
        </View>
        <View style={styles.statisticsFlexVariousItem}>
          <Text style={styles.primaryText}>{forksCount}</Text>
          <Text style={styles.secondaryText}>Forks</Text>
        </View>
        <View style={styles.statisticsFlexVariousItem}>
          <Text style={styles.primaryText}>{reviewCount}</Text>
          <Text style={styles.secondaryText}>Reviews</Text>
        </View>
        <View style={styles.statisticsFlexVariousItem}>
          <Text style={styles.primaryText}>{repo.ratingAverage}</Text>
          <Text style={styles.secondaryText}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
