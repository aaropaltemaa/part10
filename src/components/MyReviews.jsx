import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import { FlatList, View, StyleSheet, Button, Alert } from "react-native";
import Text from "./Text";
import ReviewItem from "./ReviewItem";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 0,
  },
  separator: {
    height: 10,
    backgroundColor: "#D3D3D3",
  },
  repoName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 64,
    marginBottom: 8,
    gap: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (loading) return null;
  if (error) return <Text>Error loading reviews</Text>;

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) || [];

  const handleViewRepository = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  const handleDeleteReview = (reviewId) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: reviewId } });
              refetch();
            } catch (e) {
              Alert.alert("Error", "Failed to delete review.");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View>
      <Text style={styles.repoName}>{item.repository.fullName}</Text>
      <ReviewItem review={item} showUsername={false} />
      <View style={styles.actions}>
        <Button
          title="View repository"
          onPress={() => handleViewRepository(item.repository.id)}
        />
        <Button
          title="Delete review"
          color="#d73a4a"
          onPress={() => handleDeleteReview(item.id)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default MyReviews;
