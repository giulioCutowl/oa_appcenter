import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import Header from "rn_ordine_avvocati_milano/src/component/partial/Header";
import { Left, Right } from "native-base";
import CustomButton from "rn_ordine_avvocati_milano/src/component/partial/common/CustomButton";
import { mainColor, homeHamburgerMenuColor } from "rn_ordine_avvocati_milano/src/constants";

export default class ComponentScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getHeader() {

    let headerPositionStyle = this.props.headerPosition === "absolute" ? styles.headerAbsolute : null
    let hamburgerMenuColor = this.props.headerBackgroundColor ? (homeHamburgerMenuColor ?? "white") : "white"
    
    return (
      <Header style={{...styles.header, ...headerPositionStyle, backgroundColor: this.props.headerBackgroundColor ?? mainColor}}>
        <Left>
          <CustomButton
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
            iconColor={hamburgerMenuColor}
            name="hamburger"
            iconSize={12}
          />
        </Left>
      </Header>
    );
  }

  render() {

    return (
      <View style={{ ...styles.component, ...this.props.style }}>
        {this.props.noHeader ? null : this.getHeader()}
        <View style={styles.content}>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    elevation: 0,
    zIndex:0
  },

  headerAbsolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  header: {
    height: 58,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 3,
    zIndex: 2
  },
  content: {
    flex: 1
  },
  iconUser: {
    marginRight: 15
  }
});
