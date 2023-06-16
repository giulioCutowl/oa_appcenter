import { Item } from "native-base";
import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "rn_ordine_avvocati_milano/src/component/partial/common/Icon";

export default class AppMenuCell extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { icon, item, explandable, expanded } = this.props;

    const iconSize = icon === "monitoring" ? 12 : 25;

    const height = 50 + (item.list ? item.list.length * 50 : 0)

    return (

      <View style={{...styles.cell, height: height}}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.onPress(null)}>
          <View style={styles.content}>
            {icon ? <Icon name={icon} size={iconSize} style={styles.icon} /> : null}
            <Text style={styles.label}> {this.props.label.toUpperCase()} </Text>
            {explandable ? <Icon name={ expanded ? "minus" : "plus" } size={10} style={styles.accessoryView} /> : null}
          </View>
          <View style={styles.separator} />
        </TouchableOpacity>

        { item.list != null ? item.list.map((elem)=>{

          return (
            <TouchableOpacity style={{ flex: 1, marginLeft: 54 }} onPress={() => this.props.onPress(elem)}>
              <View style={styles.content}>
                <Text style={styles.label}>{elem.description.toUpperCase()}</Text>
              </View>
              <View style={styles.separator} />
            </TouchableOpacity>
          )
        }) : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    height: 50
  },
  icon: {
    textAlign: "center",
    color: "white",
    marginRight: 10,
    width: 40,
    justifyContent: "center"
  },
  accessoryView: {
    textAlign: "right",
    color: "white",
    marginRight: 10,
    flex: 1,
    justifyContent: "center"
  },
  label: {
    fontFamily: "RobotoCondensed-Regular",
    fontSize: 16,
    color: "white"
  },
  content: {
    height: 49,
    flex: 1,
    alignItems: "center",
    flexDirection: "row"
  },
  separator: {
    backgroundColor: "#ffffff12",
    height: 1,
    marginBottom: 0
  }
});
