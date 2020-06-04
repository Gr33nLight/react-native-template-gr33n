import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import UserAuth from '../utils/UserAuth';

import Style from '../style/style';

const Avatar = require('../assets/avataaars.png');

const ProfileScreen = ({ navigation, route }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.name) {
      getProfile();
    } else {
      setLoading(false);
    }
    // const unsubscribe = navigation.addListener('focus', () => {
    if (route.params && route.params?.user) {
      const { currentUser } = auth();
      if (currentUser) {
        saveProfile(currentUser.uid, route.params?.user);
      }
    }
    // Return the function to unsubscribe from the event so it gets removed on unmount
  }, [route.params?.user]);

  // Pass data do ProfileEdit on click
  const goToProfileEdit = () => {
    navigation.navigate('ProfileEdit', {
      user,
    });
  };

  // Retrieves the user profile
  const getProfile = async () => {
    setLoading(true);
    const { currentUser } = auth();
    if (currentUser) {
      console.log(`uid: ${currentUser.uid}`);

      const userRes = await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get();

      const userData = userRes.data();
      setUser(userData);
      setLoading(false);
    }
  };

  // Saves the user profile
  const saveProfile = (uid, { name, lastname, email, phoneNumber }) => {
    setLoading(true);
    firestore()
      .collection('users')
      .doc(uid)
      .set({
        name,
        lastname,
        email,
        phoneNumber,
      })
      .then(() => {
        setLoading(false);
        setUser({ name, lastname, email, phoneNumber });
      })
      .catch((error) => {
        console.log(`profile error upading  ${error}`);
      });
  };

  if (loading) {
    return (
      <View style={Style.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={Style.profileScreen}>
      <Text category="h2" style={{ fontWeight: 'bold', flex: 0.5 }}>
        Profilo
      </Text>

      {/* Profile Info */}
      <View style={Style.profileInfo}>
        <View style={{ flxe: 1, height: 112 }}>
          <Image style={Style.profileAvatar} source={Avatar} />
        </View>
        <View
          style={{
            flex: 3,
            height: 112,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {user && user.name}
            &nbsp;
            {user && user.lastname}
          </Text>
          <Text style={{ fontSize: 13, fontWeight: '600' }}>
            {user && user.email}
          </Text>
          <Text style={{ fontSize: 13, fontWeight: '600' }}>
            {user && user.phoneNumber}
          </Text>
        </View>
      </View>

      {/* Addresses */}
      <View style={{ flex: 3 }}>
        <Text
          style={{
            flex: 1,
            fontSize: 22,
            fontWeight: 'bold',
          }}
        >
          Indirizzi di consegna:
        </Text>
      </View>

      {/* Action Buttons */}
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'flex-end',
          flex: 1,
        }}
      >
        <Button onPress={goToProfileEdit} style={{ width: 350 }}>
          MODIFICA PROFILO
        </Button>
        <Button
          onPress={() => UserAuth.signOut()}
          style={{ width: 350, marginTop: 24, marginBottom: 20 }}
        >
          LOGOUT
        </Button>
      </View>
    </View>
  );
};

export default ProfileScreen;
