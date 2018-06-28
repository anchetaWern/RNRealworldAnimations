import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  Animated,
  PanResponder
} from "react-native";

const width = Dimensions.get("window").width;

const Swiper = ({ item, dismissAction }) => {
  let translateX = new Animated.Value(0);
  let opacityValue = new Animated.Value(0);

  let cardOpacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5]
  });

  let panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (e, gesture) => {
      Animated.event([null, { dx: translateX }])(e, gesture);
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true
      }).start();
    },
    onPanResponderRelease: (e, { vx, dx }) => {
      if (Math.abs(dx) >= 0.5 * width && Math.sign(dx) != -1) {
        dismissAction(item);
        Animated.timing(translateX, {
          toValue: dx > 0 ? width : -width,
          duration: 200,
          useNativeDriver: true
        }).start();
      } else {
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            bounciness: 20,
            useNativeDriver: true
          }),
          Animated.timing(opacityValue, {
            toValue: 0,
            duration: 5,
            useNativeDriver: true
          })
        ]).start();
      }
    }
  });

  return (
    <Animated.View
      style={{
        transform: [{ translateX }],
        opacity: cardOpacity,
        ...styles.bar
      }}
      {...panResponder.panHandlers}
    >
      <Image source={item.pic} style={styles.thumbnail} resizeMode="contain" />
      <Text style={styles.name}>{item.name}</Text>
    </Animated.View>
  );
};

const styles = {
  bar: {
    height: 50,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 2,
    paddingLeft: 5
  },
  thumbnail: {
    width: 35,
    height: 35
  },
  name: {}
};

export default Swiper;
