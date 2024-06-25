import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import NumericKeyboard from '../../components/KeyboardNumber';

type InputScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Input'
>;

const InputScreen = () => {
  const [amount, setAmount] = React.useState('');
  const navigation = useNavigation<InputScreenNavigationProp>();

  const handleKeyPress = (key: string) => {
    if (key === 'C') {
      setAmount('0.00');
    } else if (key === 'CONFIRM') {
      // Handle confirm action
      console.log('Confirmed amount:', amount);
    } else {
      // Handle number press
      setAmount(prev =>
        prev === '0.00' ? key.toString() : prev + key.toString(),
      );
    }
  };

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

      <NumericKeyboard onPress={handleKeyPress} />
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
