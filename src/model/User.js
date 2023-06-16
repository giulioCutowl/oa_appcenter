import {
    wsHostURL,
} from 'rn_ordine_avvocati_milano/src/constants';
import DeviceInfo from 'react-native-device-info';
import io from 'socket.io-client';
import Api from 'rn_ordine_avvocati_milano/src/api';
import DefaultPreference from 'react-native-default-preference';
import { isEmpty } from 'lodash';
import store from 'rn_ordine_avvocati_milano/src/redux/store'
import Config from "rn_ordine_avvocati_milano/src/config/config.js";
import { Alert } from 'react-native';
import CookieManager from '@react-native-community/cookies';

var auth = !Config.getLoginSferaEnabled()
var isPrivacyAccepted
var infoUser
var token
let instance

export default class User {

    constructor() {
        
        if (!instance) {
            instance = this;
        }

        DefaultPreference.get("privacypolicy").then((value) => {
            isPrivacyAccepted = !isEmpty(value) 
        })
        this.connect()
        return instance;
    }

    static getInstance() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    connect() {

        let deviceId = DeviceInfo.getUniqueId();
        let gestoreId = Config.getIdGestore();
        let url = wsHostURL + `?device_id=${deviceId}&gestore_id=${gestoreId}`

        const socket = io(url, {
            transports: [ 'websocket' ]
        });
        
        socket.connect(); 
        
        socket.on('connect', () => {
            console.log("connect")
        });

        socket.on(`device-${deviceId}-${gestoreId}`, async (data) => {
            console.log(`device-${deviceId}-${gestoreId}`,"connected", data.data)

            let info = data.data
            
            store.dispatch({
                type: "UPDATE_USER",
                payload: info
            })

            if (info && info.codFisc) {
                auth = true
                infoUser = info

                var re = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i
                auth = re.test(info.codFisc)

                let api = new Api()

                token = await api.getToken(infoUser)
            }
        });

        socket.on('error', (error) => {
            console.log("error", error)
        })
    }

    getToken() {
        return token
    }

    isLogged(){
        return token != null
    }

    isAuthorized() {
        return auth
    }

    isPrivacyAccepted() {
        console.log('isPrivacyAccepted', isPrivacyAccepted)
        return isPrivacyAccepted
    }

    savePrivacyPolicy(privacy1, privacy2){

        let api = new Api()

        return new Promise((resolve, reject) => {
        
            api.savePrivacy(infoUser.codFisc, privacy1, privacy2).then((result)=>{
                DefaultPreference.set('privacypolicy', JSON.stringify({privacy1: privacy1, privacy2: privacy2}))
                isPrivacyAccepted = true
                resolve(result)
            })
            .catch((e) => {
                isPrivacyAccepted = false
                reject(e)
            })
        })
    }

    reset(){
        DefaultPreference.clearAll()
        isPrivacyAccepted = false
        auth = false
        infoUser = null
        token = null
        CookieManager.clearAll(true);

        store.dispatch({
            type: "UPDATE_USER",
            payload: null
        })
    }

    logout(){
        let api = new Api()
        
        api.logout().then((result)=>{
            this.reset()
            Alert.alert("Logout avvenuto con successo")
        })
        .catch((e) => {
            console.log("Error", e)
            Alert.alert("Logout Error")
        })
    }
}