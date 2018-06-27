import React from "react";
import { ScrollView, View, FlatList, Animated, Platform } from "react-native";
import Card from "./Card";

import { HEADER_MAX_HEIGHT } from "../settings/layout";

const CardList = ({
  data,
  cardAction,
  viewAction,
  bookmarkAction,
  shareAction,
  onScroll,
  scrollEnabled,
  toggleDropArea,
  isDropArea,
  targetDropArea,
  removePokemon
}) => {
  return (
    <ScrollView scrollEnabled={scrollEnabled}>
      <View style={[styles.scroll_container]}>
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={({ item }) => (
            <Card
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
          )}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
    </ScrollView>
  );
};

const styles = {
  scroll: {
    flex: 1
  },
  scroll_container: {
    alignItems: "center",
    paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0
  }
};

export default CardList;
