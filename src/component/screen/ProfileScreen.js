import React, { PureComponent } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Alert,
  View
} from "react-native";
import CustomButton from "rn_ordine_avvocati_milano/src/component/partial/common/CustomButton";
import DeviceInfo from 'react-native-device-info';

import {
  WebView
} from "react-native-webview";

import { loginURL, mainColor } from "../../constants";
import Config from "rn_ordine_avvocati_milano/src/config/config";

class ProfileScreen extends PureComponent {

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
      headerTransparent: true
    };
  };
  constructor(props) {
    super(props);
    this.state = { canGoBack: false, canGoForward: false, loading: true, errorLoadingPage: false };
    this.webview = React.createRef();
  }

  render() {
    return (
      this.renderProfile()
    );
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward
    });
  }

  renderProfile() {
    let uniqueId = DeviceInfo.getUniqueId();

    let url = loginURL + "?idGestore="+Config.getIdGestore()+"&idSocieta=201&codiceDevice=" + uniqueId

    return (
      <View style={styles.component}>
        <WebView
          ref={(webView) => this.webview = webView}
          source={{ uri: url }}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          onLoadEnd={() => {
            this.setState({ loading: false, errorLoadingPage: false });
          }}
          onError={() => {
            this.setState({ loading: false, errorLoadingPage: true });
          }}
          renderError={() => {
            Alert.alert(
              'Errore',
              'Impossibile caricare il contenuto. Riprova più tardi.')
          }}
          useWebkit />
        {this.state.loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        ) : null}
        <View style={{ height: 44, backgroundColor: mainColor, alignItems: "center" }}>
          <View style={{ flexDirection: "row", width: 250, justifyContent: "space-between" }}>

            <CustomButton
              onPress={() => {
                if (this.state.canGoBack)
                  this.webview.goBack();
              }}
              name="back"
              iconSize={25}
              style={{ flexDirection: "column", justifyContent: "center", opacity: this.state.canGoBack ? 1 : 0.5 }}
            />
            <CustomButton
              onPress={() => {
                if (this.state.canGoForward)
                  this.webview.goForward();
              }}
              name="forward"
              iconSize={25}
              style={{ flexDirection: "column", justifyContent: "center", opacity: this.state.canGoForward ? 1 : 0.5 }}
            />
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    justifyContent: "center"
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ProfileScreen;
