import React, { Component } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import pokemon_stats from "../data/pokemon-stats";
import { getRandomInt } from "../lib/random";

import IconLabel from "../components/IconLabel";

type Props = {};
export default class Share extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Share",
      headerStyle: {
        backgroundColor: "#B4A608"
      },
      headerTitleStyle: {
        color: "#FFF"
      }
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <IconLabel
          icon="facebook-f"
          label="Share to Facebook"
          bgColor="#4267b2"
        />

        <IconLabel
          icon="google-plus"
          label="Share to Google+"
          bgColor="#db4437"
        />

        <IconLabel icon="twitter" label="Share to Twitter" bgColor="#1B95E0" />

        <IconLabel
          icon="linkedin"
          label="Share to LinkedIn"
          bgColor="#0077B5"
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    padding: 20
  }
};
