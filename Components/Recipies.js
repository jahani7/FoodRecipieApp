import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
export default function Recipies({ Categories, getrecipiesData, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "grey", fontWeight: "bold", fontSize: 20 }}>
        RECIPIES
      </Text>
      <View>
        {Categories.length === 0 || getrecipiesData.length === 0 ? (
          <Loading size="biglarger" style={{ marginTop: 100 }} />
        ) : (
          <FlatList
            data={getrecipiesData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RecipieDetails", { ...item })
                }
              >
                <Image
                  source={{ uri: item.strMealThumb }}
                  style={{
                    height: 300,
                    width: "100%",
                    marginBottom: 10,
                    resizeMode: "cover",
                    borderRadius: 10,
                  }}
                />
                <Text>{item.strMeal}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
});
