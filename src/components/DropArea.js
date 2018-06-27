import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const DropArea = ({ dropAreaIsVisible, setDropAreaLayout, isTargeted }) => {
  const right = dropAreaIsVisible ? 20 : -200;
  const color = isTargeted ? "#5fba7d" : "#333";
  return (
    <View
      style={[styles.dropArea, { right }, { borderColor: color }]}
      onLayout={setDropAreaLayout}
    >
      <Text style={[styles.dropAreaText, { color }]}>Drop here</Text>
    </View>
  );
};

const styles = {
  dropArea: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 100,
    height: 100,
    backgroundColor: "#eaeaea",
    borderWidth: 3,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center"
  },
  dropAreaText: {
    fontSize: 15
  }
};

export default DropArea;
