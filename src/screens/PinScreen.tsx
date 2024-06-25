import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import type {RouteProp} from '@react-navigation/native';

type PinScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Pin'>;
type PinScreenRouteProp = RouteProp<RootStackParamList, 'Pin'>;

const PinScreen = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<PinScreenNavigationProp>();
  const route = useRoute<PinScreenRouteProp>();

  const handlePinChange = (value: string) => {
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPin(value);
    }
  };

  const handleConfirm = () => {
    if (pin.length === 4) {
      navigation.navigate('Confirmation', '');
    } else {
      setError('Please enter a 4-digit PIN');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-4xl mb-8">Enter PIN</Text>
      <TextInput
        className="border border-gray-300 rounded w-1/2 text-center text-2xl mb-8"
        keyboardType="numeric"
        value={pin}
        onChangeText={handlePinChange}
        secureTextEntry
        maxLength={4}
      />
      <Button title="Confirm" onPress={handleConfirm} color="#FF4500" />
    </View>
  );
};

export default PinScreen;
