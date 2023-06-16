import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity
} from "react-native";

import Config from "rn_ordine_avvocati_milano/src/config/config";

export default class NewsCell extends PureComponent {

  getCellContent() {
    const { subhead, title } = this.props.data
    var date = null

    if (subhead != null) {
      var d = new Date(subhead.substring(0,10));
      if(isNaN(d)) { // Check if it's invalid date
        d = new Date(subhead.substring(0,10) * 1000);
      }
      var date = + d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()
    }

    return (
      <View key={"content"} style={{flexDirection: "row"}}>
        <View style={{width: 10, backgroundColor: "#1B364C"}} />
        <View style={styles.content}>
          { date != null ? <Text style={styles.subhead}>{date}</Text> : null }
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={[styles.triangleCorner]} />
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
    backgroundColor: Config.getNewsListCellBackgroundColor(),
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10
  },
  content: {
    paddingLeft: 10,
    paddingTop: 13,
    paddingBottom: 17,
    marginRight: 60,
  },
  extraContent: {
    marginLeft: 20,
    marginRight: 20
  },
  subhead: {
    letterSpacing: 1,
    fontFamily: "RobotoCondensed-Regular",
    color: "#1B364C",//mainColor + "77",
    fontSize: 14
  },
  title: {
    letterSpacing: 1,
    fontFamily: "RobotoCondensed-Regular",
    color: Config.getNewsListCellTitleColor(),
    fontSize: 18
  },
  triangleCorner: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 30,
    borderTopWidth: 30,
    borderRightColor: 'transparent',
    borderTopColor: '#1B364C',
    transform: [
      {rotate: '90deg'}
    ]
  }
});
