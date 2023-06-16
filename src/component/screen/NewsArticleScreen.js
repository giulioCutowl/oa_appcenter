import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { articleHtmlTemplate } from "rn_ordine_avvocati_milano/src/constants";
import * as RNFS from "react-native-fs"
import Config from "rn_ordine_avvocati_milano/src/config/config";

import { mainColor } from "rn_ordine_avvocati_milano/src/constants";

import Header from "rn_ordine_avvocati_milano/src/component/partial/Header";
import { Left } from "native-base";
import CustomButton from "rn_ordine_avvocati_milano/src/component/partial/common/CustomButton";

import {
  WebView
} from "react-native-webview";

export default class NewsArticleScreen extends PureComponent {

  constructor(props) {
    super(props)

    const { route : { params } } = props

    this.state = {
      "article": null,
      "loading": false,
      "articleId": params.articleId
    }
  }

  componentDidMount() {
    this.setState({loading: true})
    fetch(Config.getApiNewsDetailUrl() + this.state.articleId).then((response) => {
      response.json().then((result) => {

        const { title, date: subhead, id, text, attachments} = result

        this.setState({article: { title, subhead, id, text, attachments}, loading: false})
      });
    }).catch((error) => {
      this.setState({loading: false})
    })
  }

  onMessage(event) {

    const { type, href } = JSON.parse(event.nativeEvent.data)

    if (type){
      this.props.navigation.push("Pdf", {
        url: href,
        prevState: this.props.navigation.state
      });
    }
    else{
      this.props.navigation.push("Browser", {
        url: href,
      });
    }
  }

  renderErrorPage() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center' }}> Impossibile caricare il contenuto richiesto </Text>
      </View>
    )
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

    if (this.state.loading) {

      return (<View style={styles.loading}>
        {this.renderHeader()}
        <ActivityIndicator style={{}} size="large" color="gray" />
      </View>)
    }

    if (!this.state.article){
      return (null)
    }

    const { text, title, subhead, attachments } = this.state.article

    var content = ""

    if (attachments && attachments.length > 0) {
      attachments.forEach((item)=> {
        content = content + "<a data-type=\"attachment\" data-href=\""+item.file+"\" class=\"attachment-link\" href=\""+item.file+"\"><div id=\"attachments-title-label\">ALLEGATI</div>\
        <div id=\"attachments-title\"><span class=\"attachment-icon\"></span><span class=\"attachment-title\">"+item.title.toUpperCase()+"</span></div>\
        <div id=\"separator\"></div></a>"
      })

      content = content + text 
    }
    else {
      content = text
    }

    var html = articleHtmlTemplate.replace("__SUBHEAD__", subhead != null ? subhead : "")
    html = html.replace("__TITLE__", title)
    html = html.replace("__CONTENT__", content)
    console.log("content", content)

    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}
      <View style={styles.content}>
        <View style={styles.separator} />
        <WebView style={styles.article}
          originWhitelist={['*']}
          useWebkit
          source={{ html: html, baseUrl: RNFS.MainBundlePath }}
          onMessage={this.onMessage.bind(this)} />
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white"
  },
  header: {
    height: 58,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 2
  },
  separator: {
    height: 1,
    backgroundColor: mainColor
  },
  article: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  subhead: {
    fontFamily: "RobotoCondensed-Regular",
    fontSize: 18,
    color: mainColor + "77"
  },
  title: {
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 22,
    color: mainColor,
    marginBottom: 20
  },
  text: {
    fontFamily: "RobotoCondensed-Regular",
    fontSize: 20
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
