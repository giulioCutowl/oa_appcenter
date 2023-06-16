
import DeviceInfo from "react-native-device-info";
import { getTrackingStatus } from 'react-native-tracking-transparency';


import data from "rn_ordine_avvocati_milano/src/config/data.json";

const privacyHtmlFile = {
    "com.gfl.ordine-avvocati-milano": require('rn_ordine_avvocati_milano/assets/html/privacy_milano.html'),
    "com.gfl.ordine-avvocati-roma": require('rn_ordine_avvocati_milano/assets/html/privacy_roma.html'),
    "com.gfl.ordine-avvocati-arezzo": require('rn_ordine_avvocati_milano/assets/html/privacy_arezzo.html'),
    "com.gfl.ordine-avvocati-siena": require('rn_ordine_avvocati_milano/assets/html/privacy_siena.html'),
    "com.gfl.ordine-avvocati-como": require('rn_ordine_avvocati_milano/assets/html/privacy_como.html'),
};
const contactsHtmlFile = {
  "com.gfl.ordine-avvocati-arezzo": require("rn_ordine_avvocati_milano/assets/html/contatti_arezzo.html"),
  "com.gfl.ordine-avvocati-siena": require("rn_ordine_avvocati_milano/assets/html/contatti_siena.html"),
  "com.gfl.ordine-avvocati-como": require("rn_ordine_avvocati_milano/assets/html/contatti_como.html"),
};

export default class Config {

    static getApiNewsUrl(page) {
        return data[Config.getBundleId()].api_news_url.replace("__PAGE__", page)
    }

    static getApiNewsDetailUrl() {
        return data[Config.getBundleId()].api_news_detail_url
    }

    static getPrivacyUrl() {
        return data[Config.getBundleId()].privacy_url
    }

    static getMenuList() {
        return data[Config.getBundleId()].menu_list
    }

    static getIdGestore() {
        return data[Config.getBundleId()].id_gestore
    }

    static getLoginSferaEnabled() {
        return data[Config.getBundleId()].login_sfera_enabled
    }

    static async getShowPrivacyConsent() {
        const trackingStatus = await getTrackingStatus()
        console.log("getShowPrivacyConsent", trackingStatus)
        const trackingStatusDisabled = trackingStatus === 'restricted' || trackingStatus === 'denied'
        console.log("trackingStatusDisabled", trackingStatusDisabled)
        const showPrivacyConsent = !trackingStatusDisabled //&& data[Config.getBundleId()].show_privacy_consent
        console.log("showPrivacyConsent", showPrivacyConsent)
        return showPrivacyConsent
    }
    //Colors

    static getMainColor() {
        return data[Config.getBundleId()].colors.main_color
    }

    static getIconTextColor() {
        return data[Config.getBundleId()].colors.icon_text_color
    }

    static getHomeHamburgerMenuColor() {
        return data[Config.getBundleId()].colors.homeHamburgerMenuColor
    }

    static getMenuBackgroundColor() {
        return data[Config.getBundleId()].colors.menu_background_color
    }

    static getHomeSelectorBackgroundColor() {
        return data[Config.getBundleId()].colors.home_selector_background_color
    }

    static getGiuffreLogoTintColor() {
        return data[Config.getBundleId()].colors.giuffre_tint_color
    }

    static getNewsListCellBackgroundColor() {
        return data[Config.getBundleId()].colors.news_list_cell_background_color
    }

    static getNewsListCellTitleColor() {
        return data[Config.getBundleId()].colors.news_list_cell_title_color
    }

    static getLocalPrivacyHtmlUrl() {
        return data[Config.getBundleId()].privacy_local_url
    }

    static getLocalContactsHtmlUrl() {
        return data[Config.getBundleId()].contacts_local_url
    }

    static getLocalPrivacyHtmlFile() {
        return privacyHtmlFile[Config.getBundleId()]
    }
    static getLocalContactsHtmlFile() {
        return contactsHtmlFile[Config.getBundleId()]
    }

    static getXApiKey() {
        return data[Config.getBundleId()].x_api_key
    }

    static getApiPushUrl() {
        return data[Config.getBundleId()].api_push_url
    }

    static getBundleId(){

        if ( DeviceInfo.getSystemName() == "Android" ) {
            return DeviceInfo.getBundleId().replace(/_/g, '-');
        }
        return DeviceInfo.getBundleId()
    }

    static getCookiePrivacyConfig() {
        return data[Config.getBundleId()].cookie_privacy
    }
}