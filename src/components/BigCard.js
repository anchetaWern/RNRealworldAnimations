import React, { Component } from "react";
import { View, Text, Animated, Easing } from "react-native";
import DataRow from "./DataRow";
import PinchableImage from "./PinchableImage";

type Props = {};
export default class BigCard extends Component<Props> {
  constructor(props) {
    super(props);
    this.titleTranslateYValue = new Animated.Value(0);
    this.titleScaleValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.titleTranslateYValue.setValue(0);
    this.titleScaleValue.setValue(0);

    Animated.sequence([
      Animated.timing(this.titleTranslateYValue, {
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

    const titleMoveY = this.titleTranslateYValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 450]
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
          <PinchableImage image={image} />
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
  dataContainer: {
    flex: 2,
    flexDirection: "column",
    padding: 20
  }
};
