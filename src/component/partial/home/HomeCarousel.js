import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Config from "rn_ordine_avvocati_milano/src/config/config.js";

export default class HomeCarousel extends PureComponent {
  constructor(props) {
    super(props);
  }

  content(){

    if ( Config.getBundleId() == "com.gfl.ordine-avvocati-arezzo") {

      return ( 
        <View style={{...this.props.style, ...styles.container, justifyContent: 'flex-end'}}>
          <Image source={{uri:'giuffre_logo'}} style={{width: 263, height: 55, marginBottom: 40}} />
        </View>
      )
    }    
    else{
      return(
  
        <View style={[this.props.style, styles.container]}>
          <Image source={{uri:'logo_ordine'}} style={{width: 300, height: 200}} resizeMode='contain'/>
          <Text style={styles.label1}>in collaborazione con</Text>
          <Image source={require("rn_ordine_avvocati_milano/resources/images/giuffre-logo.png")}
                  style={{width: 232, height: 19, marginBottom: 20, tintColor: Config.getGiuffreLogoTintColor()}} />
        </View>
      )
    }
  }

  render() {
    return this.content()
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label1: {
    marginTop: 40,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 12,
    marginBottom: 5,
    color: Config.getGiuffreLogoTintColor()
  }
});


