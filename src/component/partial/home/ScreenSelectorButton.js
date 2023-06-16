import React, { PureComponent } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import Icon from "rn_ordine_avvocati_milano/src/component/partial/common/Icon";

import { iconTextColor } from "rn_ordine_avvocati_milano/src/constants";

export default class ScreenSelectorButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { icon, description } = this.props.buttonInfo;

    const iconSize = icon === "monitoring" ? 18 : 30

    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={this.props.style}
      >
        <View style={{...styles.iconContainer, backgroundColor: this.props.backgroundColor }}>
          <Icon name={icon} size={ iconSize } color="white" style={styles.icon} />
        </View>
        <Text style={styles.description}>{description.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    borderRadius: 40,
    height: 65,
    width: 65,
    alignSelf: 'center',
  },
  icon: {
    textAlign: "center"
  },
  description: {
    textAlign: "center",
    minHeight: 20,
    marginTop: 5,
    fontFamily: 'RobotoCondensed-Regular',
    fontWeight: 'bold',
    fontSize: 12,
    color: iconTextColor
  }
});
