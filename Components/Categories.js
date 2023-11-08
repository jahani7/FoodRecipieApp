import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";

export default function Categories({
  activeCategories,
  handleChange,
  Categoriesdata,
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.catConatiner}
    >
      {Categoriesdata.map((cat, index) => {
        const isActive = cat.strCategory === activeCategories;
        const buttonStyle = {
          backgroundColor: isActive ? "#fbfbfb" : "#fbfbfb",
        };
        return (
          <TouchableOpacity
            key={index}
            style={[styles.imgCont, buttonStyle]}
            onPress={() => handleChange(cat.strCategory)}
          >
            <View style={[styles.roundImg]}>
              <Image
                source={{ uri: cat.strCategoryThumb }}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                }}
              />
              <Text
                style={{
                  color: "grey",
                  fontSize: 15,
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                {cat.strCategory}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  catConatiner: {
    backgroundColor: "#fbfbfb",
    padding: 10,
  },
  imgCont: {
    marginRight: 10,
  },
  roundImg: {
    justifyContent: "center",
    alignItems: "center",
  },
});
