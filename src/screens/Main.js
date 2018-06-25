import React, { Component } from "react";
import {
  View,
  Platform,
  Animated,
  LayoutAnimation,
  UIManager
} from "react-native";

import pokemon from "../data/pokemon";
import pokemon_stats from "../data/pokemon-stats";

import AnimatedHeader from "../components/AnimatedHeader";
import CardList from "../components/CardList";

import { HEADER_MAX_HEIGHT } from "../settings/layout.js";

import { getRandomInt, shuffleArray } from "../lib/random";

const springAnimationProperties = {
  type: LayoutAnimation.Types.spring,
  springDamping: 0.3,
  property: LayoutAnimation.Properties.scaleXY
};

const animationConfig = {
  duration: 500,
  create: springAnimationProperties
};

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {};
export default class Main extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: "#B4A608"
      },
      headerTitleStyle: {
        color: "#FFF"
      }
    };
  };

  state = {
    pokemon: pokemon
  };

  constructor(props) {
    super(props);
    this.nativeScrollY = new Animated.Value(
      Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
    );
  }

  cardAction = () => {};

  viewAction = (pokemon, image) => {
    this.props.navigation.navigate("Details", {
      title: pokemon,
      image: image,
      data: this.getPokemonStats()
    });
  };

  bookmarkAction = () => {};

  shareAction = (pokemon, image) => {
    this.props.navigation.navigate("Share");
  };

  closeModal = () => {
    this.setState({
      isModalVisible: false
    });
  };

  getPokemonStats = () => {
    let pokemon_stats_data = [];
    pokemon_stats.forEach(item => {
      pokemon_stats_data.push({
        label: item,
        value: getRandomInt(25, 150)
      });
    });

    return pokemon_stats_data;
  };

  render() {
    let nativeScrollY = Animated.add(
      this.nativeScrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    );

    return (
      <View style={styles.container}>
        <AnimatedHeader
          title={"Poke-Gallery"}
          nativeScrollY={nativeScrollY}
          onPress={this.shuffleData}
        />

        {this.state.pokemon &&
          this.nativeScrollY && (
            <CardList
              data={this.state.pokemon}
              cardAction={this.cardAction}
              viewAction={this.viewAction}
              bookmarkAction={this.bookmarkAction}
              shareAction={this.shareAction}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.nativeScrollY } } }],
                {
                  useNativeDriver: true
                }
              )}
            />
          )}
      </View>
    );
  }

  shuffleData = () => {
    LayoutAnimation.configureNext(animationConfig);
    let newArray = shuffleArray(this.state.pokemon);
    this.setState({
      pokemon: newArray
    });
  };
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
};
