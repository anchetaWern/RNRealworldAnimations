import React, { Component } from "react";
import { View, FlatList, LayoutAnimation } from "react-native";
import Swiper from "../components/Swiper";

type Props = {};
export default class Trash extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Trash",
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
    removed_pokemon: []
  };

  componentDidMount() {
    this.fillRemovedPokemon(this.props.navigation.state.params.removed_pokemon);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.removed_pokemon && (
          <FlatList
            data={this.state.removed_pokemon}
            renderItem={({ item }) => (
              <Swiper item={item} dismissAction={this.dismissAction} />
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    );
  }

  fillRemovedPokemon = removed_pokemon => {
    this.setState({
      removed_pokemon
    });
  };

  dismissAction = item => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    let removed_pokemon = [...this.state.removed_pokemon];
    let index = removed_pokemon.findIndex(itm => itm.name == item.name);

    removed_pokemon.splice(index, 1);

    this.setState({
      removed_pokemon
    });
  };
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
};
