import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useEffect } from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
const { height, width } = Dimensions.get("screen");

export default function WelcomeScreen({ navigation }) {
  const width1 = useSharedValue(0);
  const width2 = useSharedValue(0);

  useEffect(() => {
    width1.value = 0;
    width2.value = 0;
    setTimeout(
      () => (width1.value = withSpring(width1.value + width - 100)),
      100
    );
    setTimeout(
      () => (width2.value = withSpring(width2.value + width - 150)),
      300
    );
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          height: width1,
          width: width - 100,
          borderRadius: (width - 100) / 2,
          backgroundColor: "rgba(235, 235, 235, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            height: width2,
            width: width - 150,
            borderRadius: (width - 150) / 2,
            backgroundColor: "rgba(245, 245, 245, 0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/welcome.png")}
            style={{ height: 200, width: 200 }}
          />
        </Animated.View>
      </Animated.View>
      <View style={{ position: "absolute", bottom: 50 }}>
        <Text style={{ color: "white", fontSize: 60, fontWeight: "bold" }}>
          Foody
        </Text>
        <Text
          style={{ color: "white", fontSize: 15, left: 10, fontWeight: "500" }}
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
  },
});
