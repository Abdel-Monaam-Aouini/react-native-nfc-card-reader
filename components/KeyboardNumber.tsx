// components/KeyboardNumber.js
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styled} from 'nativewind';

const KeyboardContainer = styled(View);
const KeyboardRow = styled(View);
const KeyboardButton = styled(TouchableOpacity);
const ButtonText = styled(Text);

const keys = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['CLEAR', 0, 'CONFIRM'],
];

const KeyboardNumber = ({
  onPress,
}: {
  onPress: (key: string | number) => void;
}) => {
  return (
    <KeyboardContainer className="w-full px-4 py-10">
      {keys.map((row, rowIndex) => (
        <KeyboardRow
          key={rowIndex}
          className="flex flex-row justify-between mb-3">
          {row.map(key => (
            <KeyboardButton
              key={key}
              className={`flex items-center justify-center w-20 h-20 rounded-xl ${
                key === 'CLEAR'
                  ? 'bg-orange-500'
                  : key === 'CONFIRM'
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
              onPress={() => onPress(key)}>
              <ButtonText className="text-xl text-white">{key}</ButtonText>
            </KeyboardButton>
          ))}
        </KeyboardRow>
      ))}
    </KeyboardContainer>
  );
};

export default KeyboardNumber;
