import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Easing,
  PanResponder
} from "react-native";
import IconButton from "./IconButton";

type Props = {};
export default class Card extends Component<Props> {
  constructor(props) {
    super(props);

    this.pan = new Animated.ValueXY();
    this.scaleValue = new Animated.Value(0);
    this.opacityValue = new Animated.Value(2);

    this.cardScale = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.5, 1]
    });

    this.cardOpacity = this.opacityValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 0.5, 1]
    });
  }

  componentWillMount() {
    const {
      item,
      toggleDropArea,
      isDropArea,
      targetDropArea,
      removePokemon
    } = this.props;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        Animated.parallel([
          Animated.timing(this.scaleValue, {
            toValue: 0.5,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true
          }),
          Animated.timing(this.opacityValue, {
            toValue: 1,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true
          })
        ]).start();

        this.pan.setValue({ x: 0, y: 0 });
        toggleDropArea(true, item);
      },
      onPanResponderMove: (e, gesture) => {
        Animated.event([null, { dx: this.pan.x, dy: this.pan.y }])(e, gesture);
        if (isDropArea(gesture)) {
          targetDropArea(true);
        } else {
          targetDropArea(false);
        }
      },
      onPanResponderRelease: (e, gesture) => {
        toggleDropArea(false, item);

        if (isDropArea(gesture)) {
          Animated.timing(this.opacityValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }).start(() => {});

          removePokemon(item);
        } else {
          Animated.parallel([
            Animated.timing(this.scaleValue, {
              toValue: 1,
              duration: 250,
              easing: Easing.linear,
              useNativeDriver: true
            }),
            Animated.timing(this.opacityValue, {
              toValue: 2,
              duration: 250,
              easing: Easing.linear,
              useNativeDriver: true
            }),
            Animated.spring(this.pan, {
              toValue: { x: 0, y: 0 },
              friction: 5,
              useNativeDriver: true
            })
          ]).start();
        }
      }
    });
  }

  render() {
    const {
      item,
      cardAction,
      viewAction,
      bookmarkAction,
      shareAction
    } = this.props;

    let [translateX, translateY] = [this.pan.x, this.pan.y];

    let transformStyle = {
      ...styles.card,
      opacity: item.isVisible ? this.cardOpacity : 0,
      transform: [{ translateX }, { translateY }, { scale: this.cardScale }]
    };

    return (
      <Animated.View style={transformStyle} {...this.panResponder.panHandlers}>
        <Image
          source={item.pic}
          style={styles.thumbnail}
          resizeMode="contain"
        />
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
          <IconButton
            icon="share"
            onPress={() => {
              shareAction(item.name, item.full_pic);
            }}
            data={item}
          />
        </View>
      </Animated.View>
    );
  }
}

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
