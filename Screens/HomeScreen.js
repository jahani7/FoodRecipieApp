import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Categories from "../Components/Categories";
import Recipies from "../Components/Recipies";

export default function HomeScreen({ navigation }) {
  const [activeCategories, setactiveCategories] = useState("Beef");
  const [Categoriesdata, setCategoriesdata] = useState([]);
  const [getrecipiesData, setrecipiesData] = useState([]);

  const getCategories = async () => {
    const url = "https://themealdb.com/api/json/v1/1/categories.php";
    try {
      let result = await fetch(url);
      result = await result.json();
      console.log(result.data);
      setCategoriesdata(result.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getRecipies = async (category = "Beef") => {
    const url = `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    try {
      let result = await fetch(url);
      result = await result.json();
      setrecipiesData(result.meals);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (category) => {
    getRecipies(category);
    setactiveCategories(category);
    setrecipiesData([]);
  };

  useEffect(() => {
    getCategories();
    getRecipies();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fbfbfb" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/avatar.png")}
            style={styles.avatarImage}
          />
          <Ionicons name="notifications-outline" size={40} color="black" />
        </View>

        <Text style={styles.greetingText}>Hello, Haniii!</Text>
        <Text style={styles.titleText}>Make your Own Food,</Text>
        <Text style={[styles.titleText, styles.orangeText]}>Stay at Home</Text>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Search any Recipe"
            placeholderTextColor="grey"
            style={styles.inputTxt}
          />
          <View style={styles.searchIconContainer}>
            <Ionicons name="search" size={30} color="rgba(0, 0, 0, 0.42)" />
          </View>
        </View>
        {/* Categories */}
        <Categories
          Categoriesdata={Categoriesdata}
          activeCategories={activeCategories}
          handleChange={handleChange}
        />

        <Recipies
          Categories={Categories}
          getrecipiesData={getrecipiesData}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfb",
    padding: 10,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarImage: {
    height: 50,
    width: 50,
    resizeMode: "cover",
  },
  greetingText: {
    fontSize: 15,
    color: "#4a4d55",
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 30,
  },
  orangeText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 40,
  },
  searchBarContainer: {
    flexDirection: "row",
    marginTop: 40,
    borderWidth: 2,
    backgroundColor: "rgba(215, 223, 193, 0.16)",
    borderColor: "transparent",
    borderRadius: 28,
    alignItems: "center",
  },
  inputTxt: {
    flex: 1,
    padding: 10,
    marginLeft: 10,
    color: "grey",
  },
  searchIconContainer: {
    backgroundColor: "#fbfbfb",
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
