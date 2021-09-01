# Typing Test

This project replicates [10FastFingers.com](https://10fastfingers.com/).

# [See Live](https://10-typing-test.netlify.app/)

## Screenshots

![](https://snipboard.io/CaHumr.jpg)
![](https://snipboard.io/0yW6t9.jpg)

In the project directory, you can run:

```
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## About the App

Countdowns starts as soon the user starts typing. When the time's up, results card gets displayed. Replay button resets all the states so the user can make a new start with new words. Timer is set to be 10 seconds for simplicity, yet can be changed in the config file.

_The formula used to calculate WPM:_

![Gross WPM Formula](https://www.speedtypingonline.com/images/Net_WPM.png "Gross WPM Formula")

`References`

This project uses an [Open Source Word Generator API](https://random-word-api.herokuapp.com/home).
