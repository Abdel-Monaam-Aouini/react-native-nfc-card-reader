import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {isEnabled, readNFC, isSupported, gotoSettings} from './CardReader';

function App() {
  const [isNfcEnabled, setIsNfcEnabled] = useState(false);
  const [isNfcSupported, setIsNfcSupported] = useState(false);
  const [card, setCard] = useState('');

  useEffect(() => {
    (async () => {
      const CheckEnabl = await isEnabled();
      const support = await isSupported();

      setIsNfcEnabled(CheckEnabl);
      setIsNfcSupported(support);
    })();
  }, []);

  async function readNdef() {
    try {
      const result = await readNFC();
      setCard(result);
    } catch (ex) {
      console.warn('Oops!', ex);
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>NFC is {isNfcSupported ? 'supported' : 'not supported'}</Text>
      <Text>NFC is {isNfcEnabled ? 'enabled' : 'disabled'}</Text>
      {isNfcSupported && isNfcEnabled && (
        <>
          <Text>{card}</Text>
          <Button title="Read NFC Card" onPress={readNdef} />
          <Button title="Go to NFC Settings" onPress={gotoSettings} />
        </>
      )}
    </View>
  );
}

export default App;
