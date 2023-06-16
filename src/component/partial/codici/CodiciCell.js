import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity
} from "react-native";

import { mainColor } from "rn_ordine_avvocati_milano/src/constants";

export default class CodiciCell extends PureComponent {

  getCellContent() {
    const { subhead, title } = this.props.data

    return (
      <View style={styles.content} key={"content"}>
        <View>
          <Text style={styles.subhead}>{subhead}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    )
  }

  render() {
    const backgroundColor = "#FFFFFF";

    return (
      <Animated.View
        style={{
          ...styles.cell,
          flex: this.extraContentFlex
        }}
      >
        <TouchableOpacity onPress={this.props.onPress}>
          <View>{this.getCellContent()}</View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: mainColor,
    marginTop: 10,
    marginBottom: 10
  },
  content: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingTop: 13,
    paddingBottom: 17,
    paddingRight: 40
  },
  extraContent: {
    marginLeft: 20,
    marginRight: 20
  },
  extraContentSeparator: {
    backgroundColor: mainColor + "23",
    marginBottom: 16,
    height: 1
  },
  abstract: {
    fontFamily: "RobotoCondensed-Regular",
    fontSize: 16,
    color: mainColor,
    letterSpacing: 0.33,
    marginBottom: 20
  },
  subhead: {
    letterSpacing: 1,
    fontFamily: "RobotoCondensed-Regular",
    color: "white",//mainColor + "77",
    fontSize: 14
  },
  title: {
    letterSpacing: 1,
    fontFamily: "RobotoCondensed-Bold",
    color: "white",
    fontSize: 18
  },
  accessoryView: {
    position:"absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 40
  },
  arrowButton: {
    width: 40
  }
});
