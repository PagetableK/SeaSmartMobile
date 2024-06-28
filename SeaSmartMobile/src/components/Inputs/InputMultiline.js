
import { StyleSheet, TextInput } from 'react-native';

export default function InputMultiline({ placeHolder, setValor, contra, valor }) {

  return (

    <TextInput
      style={styles.Input}
      placeholder={placeHolder}
      value={valor}
      onChangeText={setValor}
      placeholderTextColor={'#090A0A'}
      secureTextEntry={contra}
      multiline={true}
      numberOfLines={4}
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