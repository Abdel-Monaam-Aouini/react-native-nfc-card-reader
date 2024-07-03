import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import NumericKeyboard from '../components/NumericKeyboard';

type InputScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Input'
>;

const InputScreen = () => {
  const [amount, setAmount] = React.useState('');
  const navigation = useNavigation<InputScreenNavigationProp>();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="border border-gray-300 rounded-md w-3/4 text-center text-5xl">
        {amount}
      </Text>
      <NumericKeyboard setPress={setAmount} />
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
