import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "native-base";
import SearchBar from "rn_ordine_avvocati_milano/src/component/partial/common/SearchBar";
import DropDownMenu from "rn_ordine_avvocati_milano/src/component/partial/common/DropDownMenu";

import Header from "rn_ordine_avvocati_milano/src/component/partial/Header";
import { Left } from "native-base";
import CustomButton from "rn_ordine_avvocati_milano/src/component/partial/common/CustomButton";

import { mainColor } from "rn_ordine_avvocati_milano/src/constants";

export default class CodiciSearchFilterScreen extends PureComponent {

  constructor(props) {
    super(props);

    const { route : { params } } = props

    console.log("params", params)

    this.state = {
      category: params.category,
      numArt: params.numArt,
      text: params.text
    };
  }

  back() {
    navigation.goBack()
  }

  search(data) {
    const { navigation, route } = this.props

    const { params: {updateParams} } = route
    
    updateParams(data)
    navigation.goBack()
  }

  render() {
    return (
      <View 
      style={{
        flex: 1,
        flexDirection: "column"
      }}>

        <Header style={{...styles.header, backgroundColor: this.props.headerBackgroundColor ?? mainColor}}>
          <Left>
            <CustomButton
              onPress={() => {
                this.props.navigation.goBack();
              }}
              name="back"
              titleButton="Indietro"
              iconSize={25}
            />
          </Left>
        </Header>
        
        <View
          style={{
            margin: 20
          }}
        >

          <Text style={styles.searchTitle}> RICERCA AVANZATA </Text>
          <DropDownMenu onSelect={(item) => { this.setState({ category: item.code }) }} category={this.state.category} />
          <SearchBar style={styles.searchBar}
            placeholder={"N. Articolo"}
            onTextChanged={(numArt) => this.setState({ numArt: numArt === "" ?  null : numArt })}
            text={this.state.numArt} />
          <SearchBar style={styles.searchBar}
            onTextChanged={(text) => this.setState({ text: text === "" ?  null : text })}
            text={this.state.text} />
          <View
            style={{
              flexDirection: "row",
              marginTop: 30
            }}
          >
            <Button
              transparent
              style={styles.searchButton}
              accessibilityLabel="Cerca"
              onPress={() => { this.search(this.state) }}
            >
              <Text style={styles.searchButtonText}>CERCA</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 58,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 2
  },
  searchTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 17,
    textAlign: "center",
    color: mainColor
  },
  searchButton: {
    flex: 1,
    height: 40,
    backgroundColor: mainColor,
    justifyContent: "center"
  },
  searchButtonText: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    textAlign: "center",
    color: "white"
  },
  searchBar: {
    height: 40,
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 40,
    paddingLeft: 20,
    marginTop: 30
  }
});
