import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Constantes from '../utils/Constantes';

export default function Login({ navigation }) {
  const ip = Constantes.IP;
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');

  const handlerLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('correo', correo);
      formData.append('contra', contra);
  
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=logIn`, {
        method: 'POST',
        body: formData
      });
  
      const data = await response.json();
  
      if (data.status) {
        setContra('');
        setCorreo('');
        navigation.navigate('TabNavigator', { message: 'Inicio de sesión exitoso' });
      } else {
        Alert.alert('Error sesión', data.error);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };
  

  const irRegistrar = () => {
    navigation.navigate('Registro');
  };

  useEffect(() => {
    // validarSesion()
    // Lógica para validar
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Inicia Sesión</Text>
      <TextInput
        style={styles.input}
        label="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        mode="outlined"
        outlineColor="white"
        theme={{
          colors: {
            primary: '#4593EE'
          }
        }}
      />
      <TextInput
        style={styles.input}
        label="Contraseña"
        value={contra}
        onChangeText={setContra}
        secureTextEntry
        mode="outlined"
        outlineColor="white"
        theme={{
          colors: {
            primary: '#4593EE'
          }
        }}
      />
      <Button mode="contained" onPress={handlerLogin} style={styles.button}>
        <Text style={styles.textoBoton}>Iniciar Sesión</Text>
      </Button>
      <TouchableOpacity onPress={irRegistrar}>
        <Text style={styles.textRegistrar}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F4',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  texto: {
    color: '#322C2B',
    fontWeight: '900',
    fontSize: 20
  },
  textRegistrar: {
    color: '#322C2B',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 10
  },
  input: {
    width: Dimensions.get('window').width / 1.2,
    backgroundColor: '#FFFFFF',
  },
  button: {
    width: Dimensions.get('window').width / 1.2,
    backgroundColor: '#3E88DE',
  },
  textoBoton: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});