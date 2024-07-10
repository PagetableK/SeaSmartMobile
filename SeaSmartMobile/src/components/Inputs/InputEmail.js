import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function InputEmail({ placeHolder, setValor, setTextChange }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={styles.Input}
      label={placeHolder}
      value={setValor}
      onChangeText={setTextChange}
      mode="outlined"
      outlineColor="white"
      theme={{
        colors: {
          primary: '#4593EE'
        }
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      keyboardType="email-address"
    />
  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor: '#FFF',
    color: "#090A0A",
    fontWeight: '800',
    width: Dimensions.get('window').width / 1.2,
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
  },
});
