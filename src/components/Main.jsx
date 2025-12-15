// import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import ReviewForm from "./Review";
import { Route, Routes, Navigate } from "react-router-native";

import AppBar from "./AppBar";
import SignIn from "./SignIn";
import RepositoryItemDetail from "./RepositoryItemDetail";

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/create-a-review" element={<ReviewForm />} />
        <Route path="/repository/:id" element={<RepositoryItemDetail />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
