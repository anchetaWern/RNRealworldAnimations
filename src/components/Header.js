import React from "react";
import { View, Text } from "react-native";

const Header = ({ title, children }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.header_text}>{title}</Text>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

const styles = {
  header: {
    paddingTop: 10,
    backgroundColor: "#3e3e3e"
  },
  header_text: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 17,
    textAlign: "center",
    padding: 10
  },
  childrenContainer: {
    position: "absolute",
    top: 20,
    right: 10
  }
};

export default Header;
