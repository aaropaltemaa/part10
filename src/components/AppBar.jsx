import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import { Link, useNavigate } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#24292e",
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
    paddingHorizontal: 15,
    height: 56 + Constants.statusBarHeight,
  },
  scroll: {
    flexGrow: 1,
  },
  link: {
    marginRight: 20,
  },
  lastLink: {
    marginRight: 0,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  const isSignedIn = !!data?.me;
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.scroll}
        showsHorizontalScrollIndicator={false}
      >
        <Link to="/" component={Pressable} style={styles.link}>
          <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
            Repositories
          </Text>
        </Link>
        {isSignedIn && (
          <Link to="/create-review" component={Pressable} style={styles.link}>
            <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
              Create a review
            </Text>
          </Link>
        )}
        {isSignedIn && (
          <Link to="/my-reviews" component={Pressable} style={styles.link}>
            <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
              My reviews
            </Text>
          </Link>
        )}
        {!isSignedIn && (
          <Link to="/signup" component={Pressable} style={styles.link}>
            <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
              Sign up
            </Text>
          </Link>
        )}
        {isSignedIn ? (
          <Pressable onPress={handleSignOut} style={styles.lastLink}>
            <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
              Sign out
            </Text>
          </Pressable>
        ) : (
          <Link to="/login" component={Pressable} style={styles.lastLink}>
            <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
              Sign in
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
