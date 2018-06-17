import React, { Component } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import IconButton from "./IconButton";

const Card = ({
  item,
  cardAction,
  viewAction,
  bookmarkAction,
  shareAction
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        cardAction();
      }}
    >
      <View style={styles.card}>
        <Image source={item.pic} style={styles.thumbnail} />
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.icons}>
          <IconButton
            icon="search"
            onPress={() => {
              viewAction(item.name, item.full_pic);
            }}
            data={item}
          />
          <IconButton icon="bookmark" onPress={bookmarkAction} data={item} />
          <IconButton icon="share" onPress={shareAction} data={item} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  card: {
    width: 120,
    height: 140,
    backgroundColor: "#fafbfc",
    padding: 10,
    margin: 10,
    alignItems: "center"
  },
  name: {
    fontSize: 15,
    color: "#333",
    fontWeight: "bold"
  },
  thumbnail: {
    width: 75,
    height: 75
  },
  icons: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
};

export default Card;
