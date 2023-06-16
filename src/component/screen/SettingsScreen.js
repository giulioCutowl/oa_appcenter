import React, { PureComponent } from "react";
import { StyleSheet, Text } from "react-native";

export default class SettingScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red"
  },
  logo: {
    flex: 1,
    color: "white"
  },
  iconMenu: {
    color: "white"
  }
});
