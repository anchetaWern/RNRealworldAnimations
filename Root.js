import React from "react";
import { Animated, Easing } from "react-native";
import { createStackNavigator } from "react-navigation";

import MainScreen from "./src/screens/Main";
import ShareScreen from "./src/screens/Share";

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 300,
      easing: Easing.bounce,
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
        extrapolate: "clamp"
      });

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 0.2, 1],
        extrapolate: "clamp"
      });

      return { opacity, transform: [{ translateX }] };
    }
  };
};
const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainScreen
    },
    Share: {
      screen: ShareScreen
    }
  },
  {
    initialRouteName: "Main",
    transitionConfig
  }
);

export default RootStack;
