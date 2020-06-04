import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Input, Icon, Button } from '@ui-kitten/components';

import Style from '../style/style';

const Avatar = require('../assets/avataaars.png');

const ProfileSaveIcon = (props) => (
  <Icon {...props} fill="#222B45" name="save" />
);

const ProfileEdit = ({ navigation, route }) => {
  const [name, setName] = useState(route.params.user.name);
  const [lastname, setLastname] = useState(route.params.user.lastname);
  const [email, setEmail] = useState(route.params.user.email);
  const [phoneNumber, setPhoneNumber] = useState(route.params.user.phoneNumber);

  /**
   * saveProfile function called to save profile info
   * user is sent to previous screen
   */
  const saveProfile = () => {
    navigation.navigate('ProfileScreen', {
      user: { name, lastname, email, phoneNumber },
    });
  };

  // Setting save button listener
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          appearance="ghost"
          accessoryLeft={ProfileSaveIcon}
          onPress={() => saveProfile()}
        />
      ),
    });
  }, [navigation, saveProfile]);

  return (
    <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
      {/* Profile Avatr */}
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Image style={Style.profileAvatar} source={Avatar} />
      </View>

      {/* Profile Name */}
      <View style={{ paddingLeft: 32, paddingRight: 32, marginBottom: 12 }}>
        <Text style={{ marginBottom: 12 }}>NOME:</Text>
        <Input
          placeholder="Nome"
          value={name}
          onChangeText={(val) => setName(val)}
        />
      </View>

      {/* Profile Lastname */}
      <View style={{ paddingLeft: 32, paddingRight: 32, marginBottom: 12 }}>
        <Text style={{ marginBottom: 12 }}>COGNOME:</Text>
        <Input
          placeholder="Cognome"
          value={lastname}
          onChangeText={(val) => setLastname(val)}
        />
      </View>

      {/* Profile Email */}
      <View style={{ paddingLeft: 32, paddingRight: 32, marginBottom: 12 }}>
        <Text style={{ marginBottom: 12 }}>INDIRIZZO E-MAIL:</Text>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
      </View>

      {/* Profile Phone */}
      <View style={{ paddingLeft: 32, paddingRight: 32, marginBottom: 12 }}>
        <Text style={{ marginBottom: 12 }}>NUMERO DI TELEFONO:</Text>
        <Input
          placeholder="Telefono"
          value={phoneNumber}
          onChangeText={(val) => setPhoneNumber(val)}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileEdit;
