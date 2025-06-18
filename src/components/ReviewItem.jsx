import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
  },
  ratingContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#0366d6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  ratingText: {
    color: "#0366d6",
    fontWeight: "bold",
    fontSize: 18,
  },
  info: {
    flex: 1,
    flexDirection: "column",
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    color: "#586069",
    marginBottom: 6,
  },
  reviewText: {
    flexWrap: "wrap",
  },
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

const ReviewItem = ({ review, showUsername = true }) => (
  <View style={styles.container}>
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>{review.rating}</Text>
    </View>
    <View style={styles.info}>
      {showUsername && review.user && (
        <Text style={styles.username}>{review.user.username}</Text>
      )}
      <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  </View>
);

export default ReviewItem;
