import React, { PureComponent } from "react";
import CustomButton from "rn_ordine_avvocati_milano/src/component/partial/common/CustomButton";
import {
  View,
  StyleSheet,
  Text,
  Linking
} from "react-native";

import { mainColor } from "rn_ordine_avvocati_milano/src/constants";


class GFLContactsScreen extends PureComponent {
  static navigationOptions = ({ navigation, navigationOptions }) => {

    return {
      headerLeft: (
        <CustomButton
          onPress={() => {
            navigation.getScreenProps().drawerNavigation.openDrawer();
          }}
          name="hamburger"
          iconSize={12}
          style={{
            marginLeft: 20
          }}
        />
      ),
      headerStyle: {
        backgroundColor: mainColor
      }/*,
      headerRight: (
        <CustomButton
          onPress={() => {
            navigation.getScreenProps().drawerNavigation.navigate("Profile");
          }}
          name="profilo"
          iconSize={25}
          style={{
            marginRight: 20
          }}
        />
      )*/
    };
  };

  getContent() {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>AGENZIA GFL Milano</Text>
        <Text style={styles.detail} dataDetectorType={"all"}>
        Agenzia Giuffré Francis Lefebvre - Ag. Melluso Emidio{"\n"}
        Via Luciano Manara, 5, 20122 Milano MI{"\n"}
        Orari: da lunedì a venerdì 8.30-18.00{"\n"}
        Tel. 02 545 0312{"\n"}
        <Text style={styles.detail} dataDetectorType={"all"} onPress={ ()=> Linking.openURL('http://www.giuffremilano.it') }>Sito: http://www.giuffremilano.it/</Text>
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.content}>
        {this.getContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex:1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white"
  },
  title: {
    marginTop: 10,
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 20,
    color: mainColor
  },
  mainTitle: {
    marginTop: 10,
    marginBottom:20,
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 18,
    alignSelf: "center"
  },
  detail: {
    color: mainColor
  }
});

export default GFLContactsScreen;