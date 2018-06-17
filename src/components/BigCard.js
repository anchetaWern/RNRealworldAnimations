import React, { Component } from "react";
import { View, Text, Animated, Easing } from "react-native";
import DataRow from "./DataRow";

type Props = {};
export default class BigCard extends Component<Props> {
  constructor(props) {
    super(props);
    this.imageOpacityValue = new Animated.Value(0);
    this.titleTranslateXValue = new Animated.Value(0);
    this.titleScaleValue = new Animated.Value(0);
  }

  componentDidUpdate() {
    this.imageOpacityValue.setValue(0);
    this.titleTranslateXValue.setValue(0);
    this.titleScaleValue.setValue(0);

    Animated.sequence([
      Animated.timing(this.imageOpacityValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }),
      Animated.timing(this.titleTranslateXValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      }),
      Animated.timing(this.titleScaleValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      })
    ]).start();
  }

  render() {
    const { image, title, data } = this.props;

    const imageOpacity = this.imageOpacityValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [0, 0.25, 0.5, 0.75, 1]
    });

    const imageOpacityStyle = {
      opacity: imageOpacity
    };

    const titleMoveY = this.titleTranslateXValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 280]
    });

    const titleScale = this.titleScaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.25, 0.5, 1]
    });

    const titleTransformStyle = {
      transform: [{ translateY: titleMoveY }, { scale: titleScale }]
    };

    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Animated.Image
            source={image}
            style={[styles.image, imageOpacityStyle]}
            resizeMode={"contain"}
          />
          <Animated.View style={[styles.titleContainer, titleTransformStyle]}>
            <Text style={styles.title}>{title}</Text>
          </Animated.View>
        </View>
        {data && (
          <View style={styles.dataContainer}>{this.renderDataRows(data)}</View>
        )}
      </View>
    );
  }

  renderDataRows = data => {
    return data.map((item, index) => {
      return (
        <DataRow
          label={item.label}
          value={item.value}
          index={index}
          key={item.label}
        />
      );
    });
  };
}

const styles = {
  container: {
    flex: 1
  },
  titleContainer: {
    position: "absolute",
    top: -100
  },
  title: {
    fontSize: 25,
    fontWeight: "bold"
  },
  mainContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 150
  },
  dataContainer: {
    flex: 2,
    flexDirection: "column",
    padding: 20
  }
};
