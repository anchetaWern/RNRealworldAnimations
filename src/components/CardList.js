import React, { Component } from "react";
import { ScrollView, View, FlatList, Animated, Platform } from "react-native";
import Card from "./Card";

import { HEADER_MAX_HEIGHT } from "../settings/layout";

type Props = {};
export default class CardList extends Component<Props> {
  render() {
    const { data, scrollEnabled } = this.props;

    return (
      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={[styles.scroll_container]}>{this.renderPairs(data)}</View>
      </ScrollView>
    );
  }

  renderPairs = data => {
    let pairs = getPairsArray(data);

    return pairs.map((pair, index) => {
      return (
        <View style={styles.pair} key={index}>
          {this.renderCards(pair)}
        </View>
      );
    });
  };

  renderCards = pair => {
    const {
      cardAction,
      viewAction,
      bookmarkAction,
      shareAction,
      toggleDropArea,
      isDropArea,
      targetDropArea,
      removePokemon
    } = this.props;

    return pair.map(item => {
      return (
        <Card
          key={item.name}
          item={item}
          cardAction={cardAction}
          viewAction={viewAction}
          bookmarkAction={bookmarkAction}
          shareAction={shareAction}
          toggleDropArea={toggleDropArea}
          isDropArea={isDropArea}
          targetDropArea={targetDropArea}
          removePokemon={removePokemon}
        />
      );
    });
  };
}

const getPairsArray = items => {
  var pairs_r = [];
  var pairs = [];
  var count = 0;
  items.forEach(item => {
    count += 1;
    pairs.push(item);
    if (count == 2) {
      pairs_r.push(pairs);
      count = 0;
      pairs = [];
    }
  });
  return pairs_r;
};

const styles = {
  scroll: {
    flex: 1
  },
  pair: {
    flexDirection: "row"
  },
  scroll_container: {
    alignItems: "center",
    paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0
  }
};
