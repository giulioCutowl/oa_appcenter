import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { articleHtmlTemplate } from "rn_ordine_avvocati_milano/src/constants";
import * as RNFS from "react-native-fs";
import Header from "rn_ordine_avvocati_milano/src/component/partial/Header";
import { Left } from "native-base";

import { mainColor } from "rn_ordine_avvocati_milano/src/constants";

import {
  WebView
} from "react-native-webview";
import CustomButton from "rn_ordine_avvocati_milano/src/component/partial/common/CustomButton";
import Api from "../../api";


const ArticleScreen = (props) => {

  const { route: { params } } = props

  const [href] = useState(params.href)
  const [articleId] = useState(params.articleId)
  const [html, setHtml] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (href) {
      loadArticleHref(href, articleId)
    }
    else {
      loadArticle(articleId)
    }
  }, [])

  function loadArticleHref(href, id) {
    let api = new Api()

    api.loadArticleHref(href, id)
      .then((result) => {
        console.log("data", result)
        const { getLinksByHref: [{ iddocmasterj }] } = result.data

        console.log("iddocmasterj", iddocmasterj)
        loadArticle(iddocmasterj)
      })
      .catch((e) => {
        console.log("error", e)
        setError(e)
        setLoading(false)
      })
  }

  function loadArticle(id) {
    let api = new Api()

    api.loadArticle(id).then((result) => {
      console.log("data", result)

      const { getDocumentByTipoUd: [{ campo_calcolato_provvedimento: { estremo, estremo_codice }, documenti, testoarticolo_codicebase }] } = result.data
      var content = testoarticolo_codicebase
      var bibliografia = null
      var focus = null

      if (documenti) {

        documenti.forEach((item) => {

          const { testo: text, tipo_ud, rubrica, campo_calcolato_documento: { estremo } } = item

          if (rubrica.toLowerCase() === "bibliografia") {
            bibliografia = content + "<div class='title_paragraph'>" + estremo + "</div>" + text
          }
          else if (tipo_ud == 167) {
            if (focus == null) {
              focus = "<div class=\"focus-box\"><div class=\"title_focus\">FOCUS NOVIT&Agrave;</div>"
            }
            
            focus = focus + "<div>" + estremo + "</div>" + text
            
          }
          else {
            if (focus) {
              focus = focus + "</div>"
              content = content + focus
              focus = null
            }
            content = content + "<div class='title_paragraph'>" + estremo + "</div>" + text
          }
        })

        if (focus) {
          focus = focus + "</div>"
          content = content + focus
          focus = null
        }

        if (bibliografia) {
          content = content + bibliografia
        }
      }

      var htmlString = articleHtmlTemplate.replace("__SUBHEAD__", estremo_codice)
      htmlString = htmlString.replace("__TITLE__", estremo)
      htmlString = htmlString.replace("__CONTENT__", content)

      setHtml(htmlString)
      setLoading(false)

    })
      .catch((e) => {

        setLoading(false)
      })
  }

  function onMessage(event) {

    const { id_doc_master, href } = JSON.parse(event.nativeEvent.data)

    props.navigation.push("Article", {
      href: href,
      articleId: id_doc_master
    });
  }

  function renderHeader() {
    return (

      <Header style={{ ...styles.header, backgroundColor: props.headerBackgroundColor ?? mainColor }}>
        <Left>
          <CustomButton
            onPress={() => {
              props.navigation.goBack();
            }}
            name="back"
            titleButton="Indietro"
            iconSize={25}
          />
        </Left>
      </Header>
    )
  }

  function renderArticleContent() {

    return (

      loading ? <View style={styles.loading}>
        <ActivityIndicator size="large" color="gray" />
      </View> : error ?
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center' }}> Impossibile caricare il contenuto richiesto </Text>
          </View> :

          <View style={styles.content}>
            <View style={styles.separator} />
            <WebView style={styles.article}
              originWhitelist={['*']}
              useWebkit
              source={{ html: html, baseUrl: RNFS.MainBundlePath }}
              onMessage={onMessage} />
          </View>
    )
  }

  /*render() {

    if (this.state.href) {
      return (
        <Query query={QUERY_HREF(this.state.href, this.state.articleId)}>
          {({ loading, error, data }) => {

            if (loading) {

              return (<View style={styles.loading}>
                <ActivityIndicator size="large" color="gray" />
              </View>)
            }

            if (error) {
              return this.renderErrorPage()
            }

            const { getLinksByHref: [{ iddocmasterj }] } = data

            return (
              this.renderArticleContent(iddocmasterj)
            )
          }}
        </Query>
      )
    }*/

  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}
      {renderArticleContent()}
    </View>
  );
  //}
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
  headerButton: {
    marginLeft: 16
  },
  searchBar: {
    height: 40,
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 40,
    marginRight: 10,
    paddingLeft: 20,
    marginBottom: 20
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
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ArticleScreen;