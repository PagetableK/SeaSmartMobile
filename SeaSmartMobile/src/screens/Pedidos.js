import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import Buttons from '../components/Buttons/Buttons';
import * as Constantes from '../utils/Constantes';

export default function Pedidos({ navigation }) {
  const [nombre, setNombre] = useState(null);
  const ip = Constantes.IP;

  const handleLogout = async () => {
    console.log('a1');
    try {
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=logOut`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  const irActualizar = () => {
    navigation.navigate('Productos');
  };

  const EditUser = () => {
    navigation.navigate('UpdateUser');
  };

  const getUser = async () => {
    console.log('b1');
    try {
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setNombre(data.username);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', toString(error));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../../assets/coffee-cup-splash.png')}
        style={styles.image}
      /> */}
      <Text style={styles.title}>Bienvenid@</Text>
      <Text style={styles.subtitle}>
        { /*correo ? correo : 'No hay correo para mostrar'*/}
        {nombre ? nombre : 'No hay Nombre para mostrar'}
      </Text>
      <Buttons
        textoBoton='Cerrar Sesión'
        accionBoton={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  button: {
    borderWidth: 2,
    borderColor: "black",
    width: 100,
    borderRadius: 10,
    backgroundColor: "darkblue"
  },
  buttonText: {
    textAlign: 'center',
    color: "white"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Brown color for the title
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Brown color for the title
  },
});