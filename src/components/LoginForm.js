import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from '@ui-kitten/components';

import Style from '../style/style';
import UserAuth from '../utils/UserAuth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={Style.containerLogin}>
      <Text>Login</Text>
      <Input
        autoCapitalize="none"
        placeholder="Email"
        value={email}
        onChangeText={(nextValue) => setEmail(nextValue)}
      />
      <Input
        autoCapitalize="none"
        placeholder="Password"
        value={password}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Button
        onPress={() => UserAuth.loginUser(email, password)}
        style={Style.button}
      >
        Login
      </Button>
      <Button
        onPress={() => UserAuth.signInUser(email, password)}
        style={Style.button}
      >
        Register
      </Button>
    </View>
  );
};

export default LoginForm;
