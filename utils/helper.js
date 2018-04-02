import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native';
const NOTIFICATION_KEY = 'MFC:notifications'


export function getQuizReminderValue() {
    return {
        today: "👋 Don't forget to complete at least one quiz today!"
    }
}


export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Do your Quiz!',
        body: getQuizReminderValue(),
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setNotificationTest() {

    console.log("setNotificationTest");

    Notifications.cancelAllScheduledNotificationsAsync()

    let tomorrow = new Date()

    //tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setDate(tomorrow.getDate()+5000)
    tomorrow.setHours(23)
    tomorrow.setMinutes(15)

    Notifications.scheduleLocalNotificationAsync(
        createNotification(),
        {
            time: tomorrow,
            repeat: 'minute',
        }
    )
    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
    console.log("Notification set");

}

export function setLocalNotification() {

    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {

            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        console.log("Status is ", status);
                        if (status === 'granted') {

                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()

                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(10)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                            console.log("Notification set");
                        }
                    })
            }
        })
}