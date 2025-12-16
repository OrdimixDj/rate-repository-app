// import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import ReviewForm from "./Review";
import { Route, Routes, Navigate } from "react-router-native";

import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import RepositoryItemDetail from "./RepositoryItemDetail";
import UserReviewList from "./UserReviewList";

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
        <Route path="/user-reviews" element={<UserReviewList />} />
        <Route path="/repository/:id" element={<RepositoryItemDetail />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
