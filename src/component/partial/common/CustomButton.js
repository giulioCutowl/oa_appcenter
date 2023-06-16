import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import Icon from "./Icon";
import { Button, Text } from "native-base";

export default class CustomButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let style = this.props.iconColor
      ? { ...styles.icon, color: this.props.iconColor }
      : styles.icon;

    return (
      <Button
        transparent
        onPress={this.props.onPress}
        style={[styles.button, this.props.style]}
      >
        <Icon name={this.props.name} size={this.props.iconSize} style={style} />
        <Text style={{...style, fontFamily:"Roboto-Medium"}}>{this.props.titleButton ?? ""} </Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1
  },
  icon: {
    textAlign: "center",
    color: "white"
  }
});
