import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createCollapsibleStack } from 'react-navigation-collapsible';
import { Image, YellowBox, View, Text } from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CartScreen from '../screens/CartScreen';
import ProfileEdit from '../components/ProfileEdit';
import Style from '../style/style';

/**
 * Fix temporaneo per un warning del navigator
 * ref:  https://github.com/benevbright/react-navigation-collapsible/issues/113
 *
 */
YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

const TabNavigator = createBottomTabNavigator();
const StackNavigator = createStackNavigator();

/**
 * TabNavigator icons
 */
const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const OrderIcon = (props) => <Icon {...props} name="list-outline" />;
const CartIcon = (props) => <Icon {...props} name="shopping-cart-outline" />;
const ProfileIcon = (props) => <Icon {...props} name="person-outline" />;
const AppLogo = require('../assets/check.png');

/**
 * UIKitten BottomNavigation styling
 */
const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={OrderIcon} />
    <BottomNavigationTab icon={CartIcon} />
    <BottomNavigationTab icon={ProfileIcon} />
  </BottomNavigation>
);

/**
 * HomeScreen stack navigator
 * Contains the list of shopos and the details page
 */
const HomeStackNavigator = () => (
  <StackNavigator.Navigator initialRouteNam="HomeScreen">
    {createCollapsibleStack(
      <StackNavigator.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerTitle: () => (
            <Image style={Style.headerLogo} source={AppLogo} />
          ),
          headerStyle: Style.headerStyle,
        }}
      />
    )}
  </StackNavigator.Navigator>
);

/**
 * ProfileScreen stack navigator
 * Contains the ProfileScreen and ProfileEdit screen
 */
const ProfileStackNavigator = () => (
  <StackNavigator.Navigator initialRouteNam="ProfileScreen">
    {createCollapsibleStack(
      <StackNavigator.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: () => (
            <Image style={Style.headerLogo} source={AppLogo} />
          ),
          headerStyle: Style.headerStyle,
        }}
      />
    )}
    <StackNavigator.Screen
      name="ProfileEdit"
      component={ProfileEdit}
      options={{
        title: 'Modifica Profilo',
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerTitle: () => (
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
              Modifica profilo
            </Text>
            <Text style={{ color: '#8F9BB3', fontSize: 12 }}>
              Aggiorna le informazioni del tuo profilo
            </Text>
          </View>
        ),

        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
      }}
    />
  </StackNavigator.Navigator>
);

/**
 * Main TabNavigator
 */
const TabNavigatorContainer = () => (
  <TabNavigator.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <TabNavigator.Screen name="HomeScreen" component={HomeStackNavigator} />
    <TabNavigator.Screen name="OrdersScreen" component={OrdersScreen} />
    <TabNavigator.Screen name="CartScreen" component={CartScreen} />
    <TabNavigator.Screen
      name="ProfileScreen"
      component={ProfileStackNavigator}
    />
  </TabNavigator.Navigator>
);

const NavigatorComponent = () => {
  return (
    <NavigationContainer>
      <TabNavigatorContainer />
    </NavigationContainer>
  );
};

export default NavigatorComponent;
