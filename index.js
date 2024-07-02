const express = require('express')
const app = express()
const port = 3000
const aws = require('aws-sdk')
const platformArn = "YOUR_PLATFORM_ARN"
const fcmToken = "MOBILE_DEVICE_FCM_TOKEN"

const sns = new aws.SNS({
    accessKeyId: 'AMAZON_USER_ACCESS_KEY',
    secretAccessKey: 'AMAZON_USER_SECRET_KEY',
    region: 'YOUR_AMAZON_REGION'
})

const registerDevice = () => {
    const params = {
        PlatformApplicationArn: platformArn,
        Token: fcmToken
    }

    sns.createPlatformEndpoint(params, (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        console.log(data)
    })
}

const doPushNotification = () => {
    let payload = JSON.stringify({
        GCM: {
          notification: {
            body: 'great match!',
            title: 'Portugal vs. Denmark'
          },
          data: {
            testdata: 'Check out these awesome deals!',
            url: 'www.amazon.com'
          }
        }
      });
    const params = {
        Message: payload,
        TargetArn: 'ENDPOINT_TARGET_ARN',
    }

    sns.publish(params, (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        console.log(data)
    })
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    // registerDevice()
    // doPushNotification()
})