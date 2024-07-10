import { StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function Input({ placeHolder, setValor, contra, setTextChange }) {

  return (

    <TextInput
      style={styles.Input}
      label={placeHolder}
      value={setValor}
      secureTextEntry={contra}
      onChangeText={setTextChange}
      mode="outlined"
      outlineColor="white"
      theme={{
        colors: {
          primary: '#4593EE'
        }}}
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
    marginVertical: 10,
    width: Dimensions.get('window').width / 1.2,
    backgroundColor: '#FFFFFF',
  },

});