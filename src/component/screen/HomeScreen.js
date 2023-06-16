import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";

import Config from "rn_ordine_avvocati_milano/src/config/config.js";

import HomeCarousel from "rn_ordine_avvocati_milano/src/component/partial/home/HomeCarousel";
import ScreenSelector from "rn_ordine_avvocati_milano/src/component/partial/home/ScreenSelector";

class HomeScreen extends PureComponent {

  renderHome() {
    return (
      <View style={{ flex: 1 }}>
        <HomeCarousel style={{ flex: 5 }} />
        <ScreenSelector style={{ flex: 5, backgroundColor: Config.getHomeSelectorBackgroundColor() }} />
      </View>
    );
  }

  render() {
    
    return (
      <ImageBackground
        source={{uri:'background'}}
        style={styles.backgroundImage}
      >
        {this.renderHome()}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  }
});

export default HomeScreen;
