import React, { Component } from "react";
import { Animated, View, Dimensions } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

export default class PinchableImage extends Component {
  constructor(props) {
    super(props);
    this.baseScale = new Animated.Value(1);
    this.pinchScale = new Animated.Value(1);
    this.scale = Animated.multiply(this.baseScale, this.pinchScale);
    this.lastScale = 1;
    this.imageScale = 0;
  }

  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let currentScale = event.nativeEvent.scale;

      this.lastScale *= event.nativeEvent.scale;
      this.pinchScale.setValue(1);

      let newImageScale =
        currentScale > 0
          ? this.imageScale + currentScale
          : this.imageScale - currentScale;

      if (this.isScaleWithinRange(newImageScale)) {
        Animated.spring(this.baseScale, {
          toValue: this.lastScale,
          bounciness: 20,
          useNativeDriver: true
        }).start();
        this.imageScale = newImageScale;
      } else {
        this.lastScale = 1;
        this.imageScale = 0;
        Animated.spring(this.baseScale, {
          toValue: 1,
          bounciness: 20,
          useNativeDriver: true
        }).start();
      }
    }
  };

  isScaleWithinRange = newImageScale => {
    if (newImageScale >= 0.5 && newImageScale <= 5) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <PinchGestureHandler
        onHandlerStateChange={this._onPinchHandlerStateChange}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Animated.Image
              resizeMode={"cover"}
              source={this.props.image}
              style={{
                transform: [{ scale: this.scale }]
              }}
            />
          </View>
        </View>
      </PinchGestureHandler>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  imageContainer: {
    width: width,
    height: 200,
    overflow: "visible",
    alignItems: "center"
  }
};
