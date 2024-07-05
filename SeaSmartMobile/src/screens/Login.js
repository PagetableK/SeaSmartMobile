import React, { useState, useEffect } from 'react'; // Importar módulos de React y hooks
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions } from 'react-native'; // Importar módulos de React Native
import { TextInput, Button } from 'react-native-paper'; // Importar componentes de react-native-paper
import * as Constantes from '../utils/Constantes'; // Importar constantes desde un archivo utilitario

export default function Login({ navigation }) { // Componente principal para el inicio de sesión
  const ip = Constantes.IP; // Obtener la IP desde las constantes

  // Estados locales para almacenar los valores de los inputs
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');

  // Función para manejar el envío del formulario de login
  const handlerLogin = async () => {
    try {
      // Crear un FormData y agregar los datos del usuario
      const formData = new FormData();
      formData.append('correo', correo);
      formData.append('contra', contra);
  
      // Hacer la petición POST al servidor
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=logIn`, {
        method: 'POST',
        body: formData
      });
  
      // Parsear la respuesta como JSON
      const data = await response.json();
  
      if (data.status) {
        setContra(''); // Limpiar el campo de contraseña
        setCorreo(''); // Limpiar el campo de correo
        navigation.navigate('TabNavigator', { message: 'Inicio de sesión exitoso' }); // Navegar a la pantalla principal
      } else {
        Alert.alert('Error sesión', data.error); // Mostrar alerta de error
      }
    } catch (error) { 
      console.error('Error al iniciar sesión:', error); // Mostrar error en consola
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión'); // Mostrar alerta de error en caso de excepción
    }
  };
  
  // Mostrar alerta de error en caso de excepción
  const irRegistrar = () => {
    navigation.navigate('Registro');
  };

  useEffect(() => {
    // Lógica para validar
  }, []);

  return (
    <View style={styles.container}> {/* Contenedor principal */}
      <Text style={styles.texto}>Inicia Sesión</Text> {/* Título */}
      {/* Input para el correo */}
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
      {/* Input para la contraseña */}
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
      {/* Botón para iniciar sesión */}
      <Button mode="contained" onPress={handlerLogin} style={styles.button}>
        <Text style={styles.textoBoton}>Iniciar Sesión</Text>
      </Button>
       {/* Enlace para ir a la pantalla de registro */}
      <TouchableOpacity onPress={irRegistrar}>
        <Text style={styles.textRegistrar}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { // Estilo del contenedor principal
    flex: 1,
    backgroundColor: '#F7F5F4',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  texto: { // Estilo del texto de título
    color: '#322C2B',
    fontWeight: '900',
    fontSize: 20
  },
  textRegistrar: { // Estilo del texto de registrar
    color: '#322C2B',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 10
  },
  input: {// Estilo de los inputs
    width: Dimensions.get('window').width / 1.2,
    backgroundColor: '#FFFFFF',
  },
  button: { // Estilo del botón
    width: Dimensions.get('window').width / 1.2,
    backgroundColor: '#3E88DE',
  },
  textoBoton: { // Estilo del texto del botón
    fontSize: 15,
    fontWeight: 'bold'
  }
});
