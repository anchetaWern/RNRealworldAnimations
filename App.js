import React, { Component } from "react";
import { View, Platform, Animated } from "react-native";

import pokemon from "./src/data/pokemon";
import pokemon_stats from "./src/data/pokemon-stats";

import AnimatedHeader from "./src/components/AnimatedHeader";
import CardList from "./src/components/CardList";
import AnimatedModal from "./src/components/AnimatedModal";
import BigCard from "./src/components/BigCard";

import { HEADER_MAX_HEIGHT } from "./src/settings/layout";

import { getRandomInt } from "./src/lib/random";

type Props = {};
export default class App extends Component<Props> {
  state = {
    isModalVisible: false
  };

  constructor(props) {
    super(props);
    this.pokemon_stats = [];
    this.nativeScrollY = new Animated.Value(
      Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
    );
  }

  cardAction = () => {};

  viewAction = (pokemon, image) => {
    this.pokemon_stats = [];
    pokemon_stats.forEach(item => {
      this.pokemon_stats.push({
        label: item,
        value: getRandomInt(25, 150)
      });
    });

    this.setState({
      pokemon,
      image,
      stats: this.pokemon_stats,
      isModalVisible: true
    });
  };

  bookmarkAction = () => {};

  shareAction = () => {};

  closeModal = () => {
    this.setState({
      isModalVisible: false
    });
  };

  render() {
    let nativeScrollY = Animated.add(
      this.nativeScrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    );

    return (
      <View style={styles.container}>
        <AnimatedHeader title={"Poke-Gallery"} nativeScrollY={nativeScrollY} />
        {this.nativeScrollY && (
          <CardList
            data={pokemon}
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

        <AnimatedModal
          title={"View Pokemon"}
          visible={this.state.isModalVisible}
          onClose={() => {
            this.setState({
              isModalVisible: false
            });
          }}
        >
          <BigCard
            title={this.state.pokemon}
            image={this.state.image}
            data={this.state.stats}
          />
        </AnimatedModal>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
};
