import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import iid from '@react-native-firebase/iid';

import Navigator from './navigation/Navigator';
import LoginForm from './components/LoginForm';

const App = () => {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = (currentUser) => {
    setUser(currentUser);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    let mounted = true;
    const authlistener = auth().onAuthStateChanged(onAuthStateChanged);

    // stampo il token FCM per testare il singolo device
    if (mounted) {
      firebase
        .iid()
        .getToken()
        .then((token) => {
          console.log(token);
        });
    }

    const messaginglistener = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return () => {
      mounted = false;
      authlistener();
      messaginglistener();
    }; // unsubscribe on unmount
  }, []);

  if (!user) {
    return <LoginForm />;
  }

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return <Navigator />;
};

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <App />
    </ApplicationProvider>
  </>
);
