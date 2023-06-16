/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from "react";
import {
  StatusBar,
  SafeAreaView,
  BackHandler,
  ToastAndroid
} from "react-native";
import {
  createDrawerNavigator
} from '@react-navigation/drawer';
import codePush from "react-native-code-push";
import CookieManager from '@react-native-community/cookies';


import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "rn_ordine_avvocati_milano/src/component/screen/HomeScreen";
import SettingsScreen from "rn_ordine_avvocati_milano/src/component/screen/SettingsScreen";
import CodiciScreen from "rn_ordine_avvocati_milano/src/component/screen/CodiciScreen";
import NewsScreen from "rn_ordine_avvocati_milano/src/component/screen/NewsScreen";
import WebViewScreen from "rn_ordine_avvocati_milano/src/component/screen/WebViewScreen";
import ProfileScreen from "rn_ordine_avvocati_milano/src/component/screen/ProfileScreen";
import ContactsScreen from "rn_ordine_avvocati_milano/src/component/screen/ContactsScreen";
import GFLContactsScreen from "rn_ordine_avvocati_milano/src/component/screen/GFLContactsScreen";
import NewsArticleScreen from "rn_ordine_avvocati_milano/src/component/screen/NewsArticleScreen";
import ArticleScreen from "rn_ordine_avvocati_milano/src/component/screen/ArticleScreen";
import PdfScreen from "rn_ordine_avvocati_milano/src/component/screen/PdfScreen";
import ComponentScreen from "rn_ordine_avvocati_milano/src/component/screen/ComponentScreen";

import AppMenu from "rn_ordine_avvocati_milano/src/component/screen/AppMenu";
import Router from "rn_ordine_avvocati_milano/src/controller/Router";

import { registerDevice, registerNotificationEvents } from "rn_ordine_avvocati_milano/src/controller/PushNotificationsManager"
import User from "rn_ordine_avvocati_milano/src/model/User"


import { createStackNavigator } from "@react-navigation/stack";
import CodiciSearchFilterScreen from "./src/component/screen/CodiciSearchFilterScreen";


import { Provider } from 'react-redux'
import store from './src/redux/store'

import { requestTrackingPermission } from 'react-native-tracking-transparency';
import Config from "./src/config/config";

const App = () => {

  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  const user = new User()

  useEffect(async () => {

    let trackingStatus = await requestTrackingPermission()

    let cookiePrivacyConfigs = Config.getCookiePrivacyConfig()

    cookiePrivacyConfigs.forEach((config)=>{
    
      var cookiePrivacyValue = config.value_negative

      if (trackingStatus !== 'authorized' && trackingStatus !== 'unavailable') {

        CookieManager.set(
          config.website,
          {
            name: config.name,
            value: cookiePrivacyValue,
            domain: config.domain,
            path: config.path,
          },
          true
        ).then((done) => {
          console.log("CookieManager.set =>", done);
        });

        CookieManager.set(
          config.website,
          {
            name: config.name,
            value: cookiePrivacyValue,
            domain: config.domain,
            path: config.path,
          },
          false
        ).then((done) => {
          console.log("CookieManager.set =>", done);
        });
      }
    }) 

    registerDevice()
    registerNotificationEvents()
    
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  }, [])

  function handleBackButton() {

    let history = Router.getInstance().getHistory()

    if (history.length == 1){

      let isHome = history[0].key.startsWith("Home");
      if (!isHome){
        Router.getInstance().openHome()
        return true
      }
      else {
        BackHandler.exitApp();
      }
    }
    
    return false;
  }

  function menu(props) {
    new Router(props.navigation);
    return (
      <AppMenu {...props} />
    )
  }

  const Home = (props) => (<ComponentScreen navigation={props.navigation} headerPosition={"absolute"} headerBackgroundColor={"transparent"}><HomeScreen {...props} /></ComponentScreen>)
  const News = (props) => (<ComponentScreen navigation={props.navigation} ><NewsScreen {...props} /></ComponentScreen>)
  const Settings = (props) => (<ComponentScreen navigation={props.navigation} ><SettingsScreen {...props} /></ComponentScreen>)
  const Codici = (props) => (<ComponentScreen navigation={props.navigation} ><CodiciScreen {...props} /></ComponentScreen>)
  const WebView = (props) => (<ComponentScreen navigation={props.navigation} ><WebViewScreen {...props} /></ComponentScreen>)
  const Profile = (props) => (<ComponentScreen navigation={props.navigation} ><ProfileScreen {...props} /></ComponentScreen>)
  const Contacts = (props) => (<ComponentScreen navigation={props.navigation} ><ContactsScreen {...props} /></ComponentScreen>)
  const GFLContacts = (props) => (<ComponentScreen navigation={props.navigation} ><GFLContactsScreen {...props} /></ComponentScreen>)
  const Filters = (props) => (<CodiciSearchFilterScreen {...props} />)
  const Browser = (props) => (<WebViewScreen {...props} browsing={true}/>)
  

  function drawer() {
    return <Drawer.Navigator initialRouteName="Home"
      drawerContent={(props) => menu(props)} drawerStyle={{ width: 320 }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="News" component={News} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Codici" component={Codici} />
      <Drawer.Screen name="WebView" component={WebView} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Contacts" component={Contacts} />
      <Drawer.Screen name="GFLContacts" component={GFLContacts} />
    </Drawer.Navigator>
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Main" component={drawer} />
            <Stack.Screen name="NewsArticle" component={NewsArticleScreen} />
            <Stack.Screen name="Article" component={ArticleScreen} />
            <Stack.Screen name="Pdf" component={PdfScreen} />
            <Stack.Screen name="Filters" component={Filters} />
            <Stack.Screen name="Browser" component={Browser} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  )
}

export default codePush(App);