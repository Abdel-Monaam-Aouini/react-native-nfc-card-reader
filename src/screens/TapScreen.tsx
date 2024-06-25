import React, {useEffect, useState} from 'react';
import {View, Text, Image, Button} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, readNFCType} from '../../App';
import type {RouteProp} from '@react-navigation/native';
import {readNFC} from '../../CardReader';

type TapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tap'>;
type TapScreenRouteProp = RouteProp<RootStackParamList, 'Tap'>;

const TapScreen = () => {
  const [data, setData] = useState<readNFCType>();
  const route = useRoute<TapScreenRouteProp>();
  const {amount} = route.params;
  const navigation = useNavigation<TapScreenNavigationProp>();

  const handlePayment = async () => {
    const data: readNFCType = await readNFC();
    console.log('🚀 ~ handlePayment ~ data:', data);
    if (data) {
      setData(data);
    }
  };

  useEffect(() => {
    if (data) {
      navigation.navigate('Payment', {amount, data});
    }
  }, [data, amount]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-4xl mb-8">Tap to Pay</Text>
      <Image
        source={require('../assets/contactless_payment.png')}
        style={{width: 300, height: 300, marginBottom: 20}}
        resizeMode="contain"
      />
      <Text className="text-2xl mb-8">Hold your card near the reader</Text>
      <Button
        title="Simulate Payment"
        onPress={handlePayment}
        color="#FF4500"
      />
    </View>
  );
};

export default TapScreen;
