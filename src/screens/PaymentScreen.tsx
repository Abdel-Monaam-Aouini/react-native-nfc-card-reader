import React from 'react';
import {View, Text, Button} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

type PaymentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Payment'
>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

const PaymentScreen = () => {
  const route = useRoute<PaymentScreenRouteProp>();
  const {amount, data} = route.params;
  console.log('🚀 ~ PaymentScreen ~ data:', data);
  const navigation = useNavigation<PaymentScreenNavigationProp>();

  const {cardNumber, typeName, expireDate} = data;
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View>
        <Text className="text-xl mb-8">Total amount: ${amount}</Text>
        <Text className="text-xl mb-8">Card Type: {typeName}</Text>
        <Text className="text-xl mb-8">Card Number: {cardNumber}</Text>
        <Text className="text-xl mb-8">Expiry Date: {expireDate}</Text>
      </View>
      <View className="flex flex-row gap-5">
        <View className="flex">
          <Button
            title="Confirm"
            onPress={() => navigation.navigate('Pin', '')}
            color="#FF4500"
          />
        </View>
        <View className="flex">
          <Button
            title="Cancel"
            onPress={() => navigation.navigate('Pin', '')}
            color="#FF4500"
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;
