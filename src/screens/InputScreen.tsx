import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

type InputScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Input'
>;

const InputScreen = () => {
  const [amount, setAmount] = React.useState('');
  const navigation = useNavigation<InputScreenNavigationProp>();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-6xl mb-8">${amount || '0.00'}</Text>
      <TextInput
        className="border border-gray-300 rounded w-3/4 text-center text-2xl"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
      />
      <View className="mt-6">
        <Button
          title="Charge"
          onPress={() => navigation.navigate('Tap', {amount})}
          color="#FF4500"
        />
      </View>
    </View>
  );
};

export default InputScreen;
