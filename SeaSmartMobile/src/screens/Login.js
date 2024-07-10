import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useEffect, useState } from 'react';
import Input from '../components/Inputs/Input'
import Buttons from '../components/Buttons/Buttons';
import * as Constantes from '../utils/Constantes'

export default function Login({ navigation }) {
  const ip = Constantes.IP; 

  const [isContra, setIsContra] = useState(true)
  const [usuario, setUsuario] = useState('')
  const [contra, setContra] = useState('')

  // const validarSesion = async () => {
  //   console.log('a');
  //   try {a
  //     const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=getUser`, {
  //       method: 'GET'
  //     });

  //     const data = await response.json();

  //     if (data.status === 1) {
  //       cerrarSesion();
  //     } else {
  //       console.log("No hay sesión activa")
  //       return
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('Error', 'Ocurrió un error al validar la sesión');
  //   }
  // }

  const cerrarSesion = async () => {
    console.log('b');
    try {
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=logOut`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status) {
        console.log("Sesión Finalizada")
      } else {
        console.log('No se pudo eliminar la sesión')
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
    }
  }

  const handlerLogin = async () => {
    setContra('')
        setUsuario('')
        navigation.navigate('TabNavigator');
    /*console.log('c');
    try {
      const formData = new FormData();
      formData.append('correo', usuario);
      formData.append('clave', contra);

      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=getUser`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.status) {
        setContra('')
        setUsuario('')
        navigation.navigate('TabNavigator');
      } else {
        console.log(data);
        Alert.alert('Error sesión', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }*/
  };

  const irRegistrar = async () => {
    navigation.navigate('Registro');
  };

  useEffect(() => {
    // validarSesion()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Inicia Sesión</Text>
      <TextInput
        style={styles.input}
        label="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        keyboardType="email-address"
        mode='outlined'
        outlineColor='white'
        theme={{
          colors: {
            primary: '#4593EE'
          },
        }}
      />
      <TextInput
        style={styles.input}
        label="Contraseña"
        value={contra}
        onChangeText={setContra}
        secureTextEntry
        mode='outlined'
        outlineColor='white'
        theme={{
          colors: {
            primary: '#4593EE'
          },
        }}
      />
      <Button mode="contained" onPress={handlerLogin} style={styles.button}>
        <Text style={styles.textoBoton}>Iniciar Sesión</Text>
      </Button>
      <Button mode="contained" onPress={cerrarSesion} style={styles.button}>
        <Text style={styles.textoBoton}>Cerrar Sesión</Text>
      </Button>
      <TouchableOpacity onPress={irRegistrar}><Text style={styles.textRegistrar}>¿No tienes cuenta? Regístrate aquí</Text></TouchableOpacity>
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
    color: '#322C2B', fontWeight: '900',
    fontSize: 20
  },
  textRegistrar: {
    color: '#322C2B', fontWeight: '700',
    fontSize: 18,
    marginTop: 10
  },
  image: {
    width: 75,
    height: 75,
    marginBottom: 10
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
