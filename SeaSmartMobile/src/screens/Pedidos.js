import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, Dimensions, TouchableOpacity } from 'react-native';
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
      <View style={{ flex: 0.1, display: 'flex', flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width, marginLeft: Dimensions.get('window').width / 10, marginTop: Dimensions.get('window').height / 30}}>
        {/* Título de la pantalla */}
        <Text style={styles.title}>Pedidos</Text>
        <View style={{ flex: 0.6 }}>
          <TouchableOpacity style={{backgroundColor: 'green', height: 50, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', borderRadius: 20, flexDirection: 'row', gap: 10, padding: 10}}
          onPress={()=>{navigation.navigate('Direcciones')}}>
            <Image source={require('../../assets/direccion_casa.png')}/>
            <Text style={{ fontWeight: '900', color: 'white' }}>Gestionar direcciones</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ backgroundColor: 'blue' }}>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            width: Dimensions.get('window').width / 1.1,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
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
    textAlign: 'left',
    color: '#000',
    flex: 0.3
  },
});