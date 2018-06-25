import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const IconLabel = ({ icon, label, bgColor }) => {
  let backgroundColor = { backgroundColor: bgColor };
  return (
    <TouchableOpacity
      onPress={this.share}
      style={[styles.shareButton, backgroundColor]}
    >
      <Icon name={icon} style={styles.icon} size={30} color="#fff" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  shareButton: {
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  icon: {
    flex: 2
  },
  label: {
    flex: 8,
    marginTop: 5,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
};

export default IconLabel;
