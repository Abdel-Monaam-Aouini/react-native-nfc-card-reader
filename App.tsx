import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import InputScreen from './src/screens/InputScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import PinScreen from './src/screens/PinScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import TapScreen from './src/screens/TapScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export type readNFCType = {
  typeName: string;
  aid0: string;
  aid1: string;
  cardNumber: string;
  expireDate: string;
};

export type RootStackParamList = {
  Home: undefined;
  Input: undefined;
  Tap: {amount: string};
  Payment: {amount: string; data: readNFCType};
  Pin: {};
  Confirmation: {};
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="Input"
            component={InputScreen}
            options={{
              title: 'Charge',
            }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{
              title: 'Confirm Payment',
            }}
          />
          <Stack.Screen
            name="Pin"
            component={PinScreen}
            options={{
              title: 'Pin',
            }}
          />
          <Stack.Screen
            name="Tap"
            component={TapScreen}
            options={{
              title: 'Tap To Pay',
            }}
          />
          <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
