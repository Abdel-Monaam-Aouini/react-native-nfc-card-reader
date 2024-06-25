import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const NumericKeyboard = ({onPress}: {onPress: (event: string) => void}) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', ','];

  return (
    <View style={styles.container}>
      {keys.map((key, index) => (
        <TouchableOpacity
          key={index}
          style={styles.key}
          onPress={() => key && onPress(key)}
          disabled={!key}>
          <Text style={styles.keyText}>{key}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 280,
    justifyContent: 'center',
    marginTop: 50,
  },
  key: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  keyText: {
    fontSize: 30,
    color: '#000',
  },
});

export default NumericKeyboard;
