import {
    Notifications
} from 'react-native-notifications'

import {
    apiPushURL
} from "rn_ordine_avvocati_milano/src/constants";
import DeviceInfo from 'react-native-device-info';
import {
    Platform
} from "react-native";

import Router from "rn_ordine_avvocati_milano/src/controller/Router";
import Config from "rn_ordine_avvocati_milano/src/config/config.js";


export function registerDevice() {
    Notifications.events().registerRemoteNotificationsRegistered(event => {

        let os = Platform.OS
        let uniqueId = DeviceInfo.getUniqueId();
        let body = "{\"device_id\":\"" + uniqueId + "\",\"platform\":\"" + os + "\",\"push_token\":\"" + event.deviceToken + "\"}"

        fetch(Config.getApiPushUrl(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': Config.getXApiKey()
            },
            body: body

        }).then((response) => {
            console.log("response", response)
        }).catch((error) => {
            console.log("error", error)
        })

        console.log('Device Token Received', event.deviceToken)
    })
    Notifications.events().registerRemoteNotificationsRegistrationFailed(event => {
        console.log(event)
    })

    Notifications.registerRemoteNotifications()
}

export function registerNotificationEvents() {
    Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
        console.log('Notification Received - Foreground', notification)

        if (Platform.OS == "android") {
            Notifications.postLocalNotification({
                "title": notification.payload["gcm.notification.title"],
                "body": notification.payload["gcm.notification.body"],
                "silent": false,
                ...notification.payload
            })
        }

        completion({ alert: true })
    })

    Notifications.events().registerNotificationOpened((notification, completion) => {
        console.log('Notification opened by device user', notification)
        console.log(`Notification opened with an action identifier: ${notification.identifier}`)
        handleNotifiction(notification)
    })

    Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
        console.log('Notification Received - Background', notification)

        handleNotifiction(notification)
    })

    Notifications.getInitialNotification()
        .then(notification => {
            console.log('Initial notification was:', notification || 'N/A')
            handleNotifiction(notification)
        })
        .catch(err => console.error('getInitialNotifiation() failed', err))
}



function handleNotifiction(notification) {

    if (notification) {

        var additional_parameters
        const {
            payload
        } = notification

        if (Platform.OS == "ios") {
            const {
                aps
            } = payload
            additional_parameters = aps.additional_parameters
        } else {
            additional_parameters = payload
        }

        if (additional_parameters) {
            const {
                section,
                articleId
            } = additional_parameters

            if (section) {
                switch (section) {
                    case "news":
                        let params = null
                        if (articleId) {
                            params = {
                                articleId: articleId
                            }
                        }

                        Router.getInstance().navigate("news", params)
                        break

                    default:
                        break
                }
            }
        }

    }
}