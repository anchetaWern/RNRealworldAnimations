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

import CardList from "../components/CardList";
import DropArea from "../components/DropArea";
import IconButton from "../components/IconButton";

import { HEADER_MAX_HEIGHT, DROPAREA_MARGIN } from "../settings/layout.js";

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

let updated_pokemon = pokemon.map(item => {
  item.isVisible = true;
  return item;
});

type Props = {};
export default class Main extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: "Poke-Gallery",
      headerRight: (
        <IconButton
          icon="trash"
          onPress={() => {
            params.navigateToTrash();
          }}
        />
      ),
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
    pokemon: updated_pokemon,
    removed_pokemon: [],
    isDropAreaVisible: false
  };

  constructor(props) {
    super(props);
    this.nativeScrollY = new Animated.Value(
      Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
    );

    this.props.navigation.setParams({
      navigateToTrash: this.navigateToTrash
    });
  }

  navigateToTrash = () => {
    this.props.navigation.navigate("Trash", {
      removed_pokemon: this.state.removed_pokemon
    });
  };

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
        <DropArea
          dropAreaIsVisible={this.state.isDropAreaVisible}
          setDropAreaLayout={this.setDropAreaLayout}
          isTargeted={this.state.isDropAreaTargeted}
        />
        {this.state.pokemon &&
          this.nativeScrollY && (
            <CardList
              data={this.state.pokemon}
              cardAction={this.cardAction}
              viewAction={this.viewAction}
              bookmarkAction={this.bookmarkAction}
              shareAction={this.shareAction}
              scrollEnabled={!this.state.isDropAreaVisible}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.nativeScrollY } } }],
                {
                  useNativeDriver: true
                }
              )}
              toggleDropArea={this.toggleDropArea}
              dropAreaIsVisible={this.state.isDropAreaVisible}
              isDropArea={this.isDropArea}
              targetDropArea={this.targetDropArea}
              removePokemon={this.removePokemon}
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

  toggleDropArea = (isVisible, item) => {
    if (item) {
      let pokemon_data = [...this.state.pokemon];
      let new_pokemon_data = pokemon_data.map(item => {
        item.isVisible = !isVisible;
        return item;
      });
      let index = new_pokemon_data.findIndex(itm => itm.name == item.name);

      if (isVisible) {
        new_pokemon_data[index].isVisible = true;
      }

      this.setState({
        isDropAreaVisible: isVisible,
        pokemon: new_pokemon_data
      });
    }
  };

  setDropAreaLayout = event => {
    this.setState({
      dropAreaLayout: event.nativeEvent.layout
    });
  };

  isDropArea = gesture => {
    let dropbox = this.state.dropAreaLayout;
    return (
      gesture.moveY > dropbox.y + DROPAREA_MARGIN &&
      gesture.moveY < dropbox.y + dropbox.height + DROPAREA_MARGIN &&
      gesture.moveX > dropbox.x + DROPAREA_MARGIN &&
      gesture.moveX < dropbox.x + dropbox.width + DROPAREA_MARGIN
    );
  };

  targetDropArea = isTargeted => {
    this.setState({
      isDropAreaTargeted: isTargeted
    });
  };

  removePokemon = item => {
    let pokemon_data = [...this.state.pokemon];
    let removed_pokemon_data = [...this.state.removed_pokemon];
    let index = pokemon_data.findIndex(itm => itm.name == item.name);
    let removed_pokemon = pokemon_data.splice(index, 1);
    removed_pokemon_data.push(removed_pokemon[0]);
    LayoutAnimation.configureNext(animationConfig);

    this.setState({
      pokemon: pokemon_data,
      removed_pokemon: removed_pokemon_data
    });
  };
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
};
