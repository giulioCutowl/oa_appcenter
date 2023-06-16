import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Linking
} from "react-native";
import * as RNFS from "react-native-fs";

import {
  WebView
} from "react-native-webview";


import Header from "rn_ordine_avvocati_milano/src/component/partial/Header";
import { Left } from "native-base";
import CustomButton from "rn_ordine_avvocati_milano/src/component/partial/common/CustomButton";
import { mainColor } from "rn_ordine_avvocati_milano/src/constants";


const WebViewScreen = (props) => {

  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorLoadingPage, setErrorLoadingPage] = useState(false)

  const [source, setSource] = useState(null)

  let webview = React.createRef();

  useEffect(() => {

    if (!props.route.params) {
      return 
    }
    const { route: { params: { url = "", localHtml = "", html = "" } } } = props

    const source = url ? { uri: url } : localHtml ? localHtml : (html ? { html, baseUrl: RNFS.MainBundlePath } : null)

    console.log("source", source)
    setSource(source)

  }, [props])

  function onNavigationStateChange(navState) {
    setCanGoBack(navState.canGoBack)
    setCanGoForward(navState.canGoForward)
  }

  return (
    <View style={styles.component}>

      { props.browsing ?
        <Header style={{ ...styles.header, backgroundColor: props.headerBackgroundColor ?? mainColor }}>
          <Left>
            <CustomButton
              onPress={() => {
                props.navigation.goBack();
              }}
              name="back"
              iconSize={25}
            />
          </Left>
        </Header> : null}

      { source ? 
      <WebView
        originWhitelist={['*']}
        mixedContentMode='always'
        ref={(webView) => webview = webView}
        source={source}
        onLoadStart={() => {
          setLoading(true)
        }}
        onLoadEnd={() => {
          setLoading(false)
          setErrorLoadingPage(false)
        }}
        onError={() => {
          setLoading(false)
          setErrorLoadingPage(true)
        }}
        onNavigationStateChange={onNavigationStateChange}
        renderError={() => {
          Alert.alert(
            'Errore',
            'Impossibile caricare il contenuto. Riprova più tardi.')
        }}
        sharedCookiesEnabled={true}
        onShouldStartLoadWithRequest={(request) => {

          if ( request.url.startsWith('mailto') ) {
            Linking.openURL(request.url) 
            return false
          }

          return true
        }}
        useWebkit
      /> : null }
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : null}
      <View style={{ height: 44, backgroundColor: mainColor, alignItems: "center" }}>
        <View style={{ flexDirection: "row", width: 250, justifyContent: "space-between" }}>

          <CustomButton
            onPress={() => {
              if (canGoBack)
                webview.goBack();
            }}
            name="back"
            iconSize={25}
            style={{ flexDirection: "column", opacity: canGoBack ? 1 : 0.5 }}
          />
          <CustomButton
            onPress={() => {
              if (canGoForward)
                webview.goForward();
            }}
            name="forward"
            iconSize={25}
            style={{ flexDirection: "column", opacity: canGoForward ? 1 : 0.5 }}
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 58,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 2
  },
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

export default WebViewScreen;
