import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const icon_color = "#586069";
const icon_size = 15;

type Props = {};
export default class IconButton extends Component<Props> {
  render() {
    const { icon, onPress, data } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          onPress(data);
        }}
      >
        <View>
          <Icon
            name={icon}
            style={styles.icon}
            size={icon_size}
            color={icon_color}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  icon: {
    paddingLeft: 5,
    paddingRight: 5
  }
};
