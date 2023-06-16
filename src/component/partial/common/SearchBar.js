import React, { PureComponent } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "./Icon";

import { mainColor } from "rn_ordine_avvocati_milano/src/constants";

export default class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text:props.text
    }
  }

  onSubmitEditing(event) {
    this.props.search(this.state.text);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.text });
  }

  render() {
    return (
      <View style={[styles.content, this.props.style]}>
        <Icon name={"ricerca-lente"} size={15} style={{ color: mainColor }} />
        <TextInput
          placeholder={
            this.props.placeholder
              ? this.props.placeholder
              : "Ricerca per parola..."
          }
          style={styles.searchField}
          onChangeText={text => { 
              this.setState({text: text})
              if (this.props.onTextChanged) { 
                this.props.onTextChanged(text) 
              } 
            }
          }
          value={this.state.text}
          onSubmitEditing={this.onSubmitEditing.bind(this)}
          editable
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    flexDirection: "row",
  },
  searchField: {
    fontFamily: "Roboto",
    color: 'black',
    marginLeft: 15,
    marginRight: 15,
    flex: 1
  }
});
