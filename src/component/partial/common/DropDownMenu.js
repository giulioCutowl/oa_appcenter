import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";

import Icon from "rn_ordine_avvocati_milano/src/component/partial/common/Icon";
import _ from 'lodash'

import { mainColor } from "rn_ordine_avvocati_milano/src/constants";

export default class DropDownMenu extends PureComponent {
  constructor(props) {
    super(props);

    let categoryItems = [
      { description: "Codice", code: null },
      { description: "Codice Civile", code: 66 },
      { description: "Codice Penale", code: 67 },
      { description: "Procedura Civile", code: 68 },
      { description: "Procedura Penale", code: 69 }
    ]

    let descriptionLabel = props.category ? _.find(categoryItems, {code:  props.category }).description : null

    this.state = {
      selectedLabel: descriptionLabel,
      showSelector: false,
      items: categoryItems
    };
  }

  onSelect(item) {

    this.setState({
      selectedLabel: item.description,
      showSelector: false
    });
    this.props.onSelect(item);
  }

  render() {
    return [
      <TouchableWithoutFeedback
        onPress={() => this.setState({ showSelector: false })}
        key={"background-layer"}
      >
        {this.state.showSelector ? (
          <View style={styles.selectorContentBackground} />
        ) : (
          <View />
        )}
      </TouchableWithoutFeedback>,
      <View style={{ zIndex: 3 }} key={"dropdown"}>
        <TouchableWithoutFeedback
          onPress={() => 
            this.setState({ showSelector: !this.state.showSelector })
          }
        >
          <View style={styles.content}>
            <Text style={this.state.selectedLabel === "" ? styles.label : styles.selectedLabel}>
              {!this.state.selectedLabel
                ? "Codice"
                : this.state.selectedLabel}
            </Text>
            <Icon name={"arrow-down"} size={10} style={styles.arrow} />
          </View>
        </TouchableWithoutFeedback>

        {this.state.showSelector ? (
          <View style={styles.selectorContent}>
            {this.state.items.map((item, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={this.onSelect.bind(this, item)}
                  key={i}
                >
                  <View style={styles.cell}>
                    <Text style={styles.selectLabel}>{item.description}</Text>

                    {i + 1 < this.state.items.length ? (
                      <View style={styles.separator} />
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>
    ];
  }
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: 19,
    paddingRight: 19,
    alignItems: "center",
    marginTop: 15,
    flexDirection: "row",
    height: 40,
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 5
  },
  selectorContentBackground: {
    zIndex: 2,
    top: -20,
    bottom: -20,
    left: -20,
    right: -20,
    position: "absolute"
  },
  selectorContent: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 57,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    backgroundColor: "white"
  },
  cell: {
    height: 46,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  separator: {
    height: 1,
    backgroundColor: "#D8D8D8",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  arrow: {
    color: mainColor
  },
  label: {
    flex: 1,
    color: mainColor,
    fontFamily: "Roboto-Regular",
    fontSize: 14
  },
  selectedLabel: {
    flex: 1,
    color: mainColor,
    fontFamily: "Roboto-Medium",
    fontSize: 14
  },
  selectLabel: {
    color: mainColor,
    fontFamily: "Roboto-Medium",
    fontSize: 14
  }
});
