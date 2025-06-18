import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#D3D3D3",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    padding: 10,
  },
  searchContainer: {
    backgroundColor: "#fff",
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderPicker = ({ selectedOrder, setSelectedOrder }) => (
  <View style={styles.pickerContainer}>
    <Picker
      selectedValue={selectedOrder}
      onValueChange={(itemValue) => setSelectedOrder(itemValue)}
      mode="dropdown"
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  </View>
);

const SearchBar = ({ searchKeyword, setSearchKeyword }) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search repositories"
      value={searchKeyword}
      onChangeText={setSearchKeyword}
      autoCapitalize="none"
      autoCorrect={false}
    />
  </View>
);

export const RepositoryListContainer = ({
  repositories,
  ListHeaderComponent,
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const getOrderVariables = (selectedOrder) => {
  switch (selectedOrder) {
    case "highest":
      return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
    case "lowest":
      return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
    case "latest":
    default:
      return { orderBy: "CREATED_AT", orderDirection: "DESC" };
  }
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const variables = {
    ...getOrderVariables(selectedOrder),
    searchKeyword: debouncedSearchKeyword,
  };
  const { repositories } = useRepositories(variables);

  return (
    <RepositoryListContainer
      repositories={repositories}
      ListHeaderComponent={
        <>
          <SearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
          <OrderPicker
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
          />
        </>
      }
    />
  );
};

export default RepositoryList;
