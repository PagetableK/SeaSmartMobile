import { StyleSheet, TextInput } from 'react-native';

export default function Input({ placeHolder, setValor, contra, setTextChange }) {

  return (

    <TextInput
      style={styles.Input}
      placeholder={placeHolder}
      value={setValor}
      placeholderTextColor={'#090A0A'}
      secureTextEntry={contra}
      onChangeText={setTextChange}
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor: '#FFF',
    color: "#090A0A", fontWeight: '800',
    width: 300,
    borderRadius: 5,
    padding: 5,
    marginVertical: 10
  },

});