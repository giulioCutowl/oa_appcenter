import React, { PureComponent } from 'react';
import { View, Text, StatusBar } from 'react-native';
import CustomButton from "rn_ordine_avvocati_milano/src/component/partial/common/CustomButton";

import { mainColor } from "rn_ordine_avvocati_milano/src/constants";

class ErrorScreen extends PureComponent {
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
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center'}}> Impossibile caricare il contenuto richiesto </Text>
      </View>
    );
  }
}

export default ErrorScreen;
