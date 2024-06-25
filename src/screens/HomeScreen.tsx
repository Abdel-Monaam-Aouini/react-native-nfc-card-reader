import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        source={require('../assets/home_icon.png')}
        style={{width: 300, height: 300, marginBottom: 20, borderRadius: 150}}
        resizeMode="contain"
        className="animate-slidein bg-primary"
      />
      <Text className="text-4xl text-center font-bold mb-8 animate-slidein">
        Accept payments everywhere
      </Text>
      <Button
        title="Start free trial"
        onPress={() => navigation.navigate('Input')}
        color="#FF4500"
      />
    </View>
  );
};

export default HomeScreen;