import React from "react";
import { ScrollView, View, FlatList } from "react-native";
import Card from "./Card";

const CardList = ({
  data,
  cardAction,
  viewAction,
  bookmarkAction,
  shareAction
}) => {
  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
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
    </ScrollView>
  );
};

export default CardList;
