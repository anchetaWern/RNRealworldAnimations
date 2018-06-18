import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from "react-native";
import IconButton from "./IconButton";

const Card = ({
  item,
  cardAction,
  viewAction,
  bookmarkAction,
  shareAction
}) => {
  let scaleValue = new Animated.Value(0);

  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1.2]
  });

  let transformStyle = { ...styles.card, transform: [{ scale: cardScale }] };

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        scaleValue.setValue(0);
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: true
        }).start();

        cardAction();
      }}
      onPressOut={() => {
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true
        }).start();
      }}
    >
      <Animated.View style={transformStyle}>
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
      </Animated.View>
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
