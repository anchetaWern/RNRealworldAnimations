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
  onScroll
}) => {
  return (
    <Animated.ScrollView
      style={styles.scroll}
      scrollEventThrottle={1}
      onScroll={onScroll}
      contentInset={{
        top: HEADER_MAX_HEIGHT
      }}
      contentOffset={{
        y: -HEADER_MAX_HEIGHT
      }}
    >
      <View style={[styles.scroll_container]}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Card
              item={item}
              cardAction={cardAction}
              viewAction={viewAction}
              bookmarkAction={bookmarkAction}
              shareAction={shareAction}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
    </Animated.ScrollView>
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
