import React, { PureComponent } from 'react'

import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';

import Header from "rn_ordine_avvocati_milano/src/component/partial/Header";
import { Left } from "native-base";
import CustomButton from "rn_ordine_avvocati_milano/src/component/partial/common/CustomButton";
import { mainColor } from "rn_ordine_avvocati_milano/src/constants";

export default class PdfScreen extends PureComponent {

  constructor(props) {
    super(props)

    const { route: { params } } = this.props

    this.state = {
      "url": params.url
    }
  }

  renderHeader() {
    return (

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
    )
  }

  render() {
    const source = { uri: this.state.url, cache: true };

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`)
          }}
          style={styles.pdf} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  header: {
    height: 58,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 2
  }
});
