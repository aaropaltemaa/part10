import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import { Link } from "react-router-native";

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
        <Link to="/login" component={Pressable} style={styles.lastLink}>
          <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
            Log in
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
