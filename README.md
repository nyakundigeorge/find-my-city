# Find my City

Super simple Ionic v3 app that demostrate the use of SQL Lite and Gelocation/Google Maps plugin.

### Features
- Shows the place where the phone is
- Shows the distance from Jardim Botânico - Curitiba - BR

### Technologies

- Ionic Angular V3
- Angular v4.4.3
- SQL Lite native plugin
- Google Maps v2 Native Plugin

### How to run

```bash
$ sudo npm install -g ionic cordova
$ sudo npm install
```

Set your own Google Maps API KEY in config.xml

```xml
<plugin name="cordova-plugin-googlemaps" spec="2.0.11">
    <variable name="API_KEY_FOR_ANDROID" value="KEY" />
    <variable name="API_KEY_FOR_IOS" value="KEY" />
</plugin>
```

Then, to run it, on IOS run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

To run it on Android just run:

```bash
$ ionic cordova run android
```