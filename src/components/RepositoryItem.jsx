import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  fullName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  language: {
    marginTop: 10,
    backgroundColor: "#0366d6",
    alignSelf: "flex-start",
    color: "white",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: "hidden",
  },
  description: {
    marginTop: 10,
    flexWrap: "wrap",
  },
});

const Avatar = ({ item }) => {
  return (
    <Image
      source={{ uri: item.ownerAvatarUrl }}
      style={{ width: 48, height: 48, borderRadius: 4 }}
    />
  );
};
const RepositoryItem = ({ item }) => {
  const formatCount = (count) => {
    if (count < 1000) {
      return count.toString();
    }
    return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  };

  return (
    <View style={styles.flexContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar item={item} />
        <View style={{ marginLeft: 16, flex: 1 }}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 24,
          marginTop: 10,
          justifyContent: "space-around",
        }}
      >
        <Text>{formatCount(item.stargazersCount)} Stars</Text>
        <Text>{formatCount(item.forksCount)} Forks</Text>
        <Text fontWeight="bold"> {item.reviewCount} Reviews</Text>
        <Text fontWeight="bold"> {item.ratingAverage} Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryItem;
