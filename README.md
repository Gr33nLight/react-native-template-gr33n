# React native app template with firebase libraries

## Installation
```bash
react-native init [appname] --template gr33n
```
## After installlation

- Edit android/app/build.gradle
- under defaultConfig{} add:
 ```java
  multiDexEnabled true
   ```
 - Create firebase project and link google-services.json file as instructed by google.
