import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class Header extends Component {
  render() {
    return (
      <View style={{ ...styles.content, ...this.props.style }}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});
