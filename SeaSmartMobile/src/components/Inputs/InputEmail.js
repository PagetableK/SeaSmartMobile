
import { StyleSheet, TextInput } from 'react-native';

export default function InputEmail({ placeHolder, setValor, keyboardType }) {

  return (

    <TextInput
      style={styles.Input}
      placeholder={placeHolder}
      value={setValor}
      placeholderTextColor={'#090A0A'}
      onChangeText={setTextChange}
      keyboardType={keyboardType}
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