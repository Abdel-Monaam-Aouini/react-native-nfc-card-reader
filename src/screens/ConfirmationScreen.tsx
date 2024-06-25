import React, {useEffect} from 'react';
import {View, Text, ToastAndroid, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import type {RouteProp} from '@react-navigation/native';

type ConfirmationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;
type ConfirmationScreenRouteProp = RouteProp<
  RootStackParamList,
  'Confirmation'
>;

const ConfirmationScreen = () => {
  const route = useRoute<ConfirmationScreenRouteProp>();
  const navigation = useNavigation<ConfirmationScreenNavigationProp>();

  useEffect(() => {
    ToastAndroid.show('Payment Successful', ToastAndroid.SHORT);
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        source={require('../assets/approved_icon.png')}
        style={{width: 300, height: 300, marginBottom: 20}}
        resizeMode="contain"
      />
    </View>
  );
};

export default ConfirmationScreen;
