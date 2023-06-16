let instance;

import * as RNFS from "react-native-fs";

import User from "rn_ordine_avvocati_milano/src/model/User";
import {
  Alert
} from "react-native";


import Config from "rn_ordine_avvocati_milano/src/config/config.js";
export default class Router {
  constructor(navigator) {
    if (!instance) {
      instance = this;
    }
    instance.navigator = navigator;

    return instance;
  }

  static getInstance() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  getHistory() {
    return this.navigator.dangerouslyGetState().history
  }

  navigate(id, params) {

    if ( params && params.url ) {

      this.openWebView(params.url)
    } 
    else{

      switch (id) {
        case "home":
          this.openHome();
          break;
        case "avvocati":
          this.openAvvocati();
          break;
        case "codici":
          this.openCodici();
          break;
        case "news_0":
        case "news_1":
          this.openNews(params);
          break;
        case "gfl":
          this.openGFL();
          break;
        case "sfera":
          this.openProfile();
          break;
        case "privacy":
          this.openPrivacy();
          break;
        case "contatti":
          this.openContacts();
          break;
  
        default:
          this.openError();
          break;
      }
    }
  }

  openHome() {
    console.log("open home")
    this.navigateToScreen("Home");
  }

  openNews(params) {

    if (params && params.id && params.id.indexOf("news") === -1) {
      this.pushToScreen("NewsArticle", params);
    } else {
      this.navigateToScreen("News", params);
    }
  }

  openCodici() {

    if (User.getInstance().isAuthorized()) {
      this.navigateToScreen("Codici");
    } else {
      Alert.alert("Login", "Effettua la login dalla sezione Sfera per visualizzare i codici")
      this.navigateToScreen("Profile");
    }
  }

  openAvvocati() {
    this.navigateToScreen("WebView", {
      url: "http://avvocati.it/"
    });
  }

  openError() {
    this.navigateToScreen("Error");
  }

  openGFL() {
    this.navigateToScreen("GFLContacts");
  }

  openProfile() {
    this.navigateToScreen("Profile");
  }

  openPrivacy() {
    let path;
    if (Platform.OS === "ios") {
      path = Config.getLocalPrivacyHtmlFile();
    } else {
      path = Config.getLocalPrivacyHtmlUrl();
    }

    this.openLocalHtml(path);  
  }

  openContacts() {
    let path;
    if (Platform.OS === "ios") {
      path = Config.getLocalContactsHtmlFile();
    } else {
      path = Config.getLocalContactsHtmlUrl();
    }

    this.openLocalHtml(path)
  }

  openLocalHtml(path){

    if (Platform.OS === "ios") {

      this.navigateToScreen("WebView", {
        localHtml: path,
        html: null,
        url: null
      })
    } else {

      RNFS.readFileAssets(path)
        .then(result => {

          this.navigateToScreen("WebView", {
            html: result,
            localHtml: null,
            url: null
          })
        }).catch(err => {
          console.log(err);
        });
    }
  }

  openWebView(url) {
    this.navigateToScreen("WebView", {
      url: url,
      html: null,
      localHtml: null
    })
  }

  openCodiciPrivacy() {
    let data = {
      url: Config.getPrivacyUrl()
    }

    this.pushToScreen("WebView", data)
  }

  navigateToScreen(route, params) {

    this.navigator.closeDrawer();

    this.navigator.reset({
      index: 0,
      routes: [{
        name: route,
        params: params,
      }, ],
    })
  }

  pushToScreen(route, params) {

    this.navigator.push(route, params);
  }
}