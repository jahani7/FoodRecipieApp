import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function RecipeDetails(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [isHeart, setIsHeart] = useState(false);
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
      let result = await fetch(url);
      result = await result.json();
      setMeal(result.meals[0]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const toggleHeart = () => {
    setIsHeart(!isHeart);
  };

  const ingredientIndex = (meal) => {
    if (!meal) return [];
    let index = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        index.push(i);
      }
    }
    return index;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fbfbfb" />
      <View style={styles.imgCont}>
        <Image source={{ uri: item.strMealThumb }} style={styles.itemImg} />
      </View>
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          left: 20,
          top: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: "#fbfbfb",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="ios-caret-back" size={34} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleHeart}
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: "#fbfbfb",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HeartIcon filled={isHeart} size={30} borderColor="orange" />
        </TouchableOpacity>
      </View>

      {/* Meal Description */}
      <View style={styles.mealDesCont}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#292826" }}>
          {meal?.strMeal}
        </Text>
        <Text style={{ fontSize: 15, color: "#7d7c7a" }}>{meal?.strArea}</Text>
      </View>

      {/* Meal Icons */}
      <View style={styles.iconsContainer}>
        <MealIcon icon="clock-o" />
        <MealIcon icon="burn" />
        <MealIcon icon="logo-stackoverflow" />
        <MealIcon icon="users" />
      </View>

      {/* Ingredients */}
      <View style={{ padding: 10, margin: 10 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#292826",
            padding: 10,
          }}
        >
          Ingredients
        </Text>
        <View>
          {ingredientIndex(meal).map((i) => {
            return (
              <View key={i} style={styles.ingredientContainer}>
                <View style={styles.ingredientDot}></View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {meal["strIngredient" + i]}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {meal["strMeasure" + i]}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      {/* Innstruction*/}
      <View style={{ padding: 10, margin: 10 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#292826",
            padding: 10,
          }}
        >
          Instructions
        </Text>
        <Text>{meal?.strInstructions}</Text>
      </View>
    </ScrollView>
  );
}

const HeartIcon = ({ filled, size, borderColor }) => (
  <FontAwesome
    name="heart"
    size={size}
    color={filled ? "red" : borderColor}
    style={styles.heartIcon}
  />
);

const MealIcon = ({ icon }) => (
  <View style={styles.iconDes}>
    <View style={styles.iconInner}>
      {icon === "clock-o" && (
        <FontAwesome name="clock-o" size={24} color="black" />
      )}
      {icon === "burn" && <FontAwesome5 name="burn" size={24} color="black" />}
      {icon === "logo-stackoverflow" && (
        <Ionicons name="logo-stackoverflow" size={24} color="black" />
      )}
      {icon === "users" && <FontAwesome name="users" size={24} color="black" />}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fbfbfb",
  },
  imgCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemImg: {
    width: "95%",
    height: 400,
    borderRadius: 30,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  mealDesCont: {
    padding: 10,
    margin: 10,
  },
  iconsContainer: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginLeft: 10,
  },
  iconDes: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  iconInner: {
    backgroundColor: "#fbfbfb",
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  heartIcon: {
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  ingredientDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "orange",
    marginRight: 10,
  },
});
