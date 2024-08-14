import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import SimpleButton from '../components/Buttons/SimpleButton';
import * as Constantes from '../utils/Constantes';

export default function Perfil({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [dui, setDui] = useState('');
  const [telefono, setTelefono] = useState('');
  const [telefono_fijo, setTelefono_Fijo] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const ip = Constantes.IP;

  // Función que permite cerrar la sesión de un cliente.
  const handleLogout = async () => {
    try {
      // Se realiza la petición a la API.
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
  }

  // Función que permite obtener la información del cliente por medio de una consulta.
  const getUser = async () => {
    try {
      // Se realiza la petición a la API y se almacena en la constante.
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=readProfile`, {
        method: 'GET'
      });
      // Se almacena el conjunto de datos en la constante.
      const data = await response.json();
      
      // Si la respuesta es satisfactoria se ejecuta el código.
      if (data.status) {
        const userData = data.dataset; // Aquí se corrige para obtener el dataset
        setNombre(userData.nombre_cliente);
        setApellido(userData.apellido_cliente);
        setCorreo(userData.correo_cliente);
        setDui(userData.dui_cliente);
        setTelefono(userData.telefono_movil);
        setTelefono_Fijo(userData.telefono_fijo);
        setIdCliente(userData.id_cliente);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', error.toString());
    }
  };

  const handleEditToggle = () => {
    console.log('isEditing:', isEditing);
    setIsEditing(!isEditing);  // Cambiar a su valor opuesto
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('idCliente', idCliente);
      formData.append('nombreCliente', nombre);
      formData.append('apellidoCliente', apellido);
      formData.append('correoCliente', correo);
      formData.append('duiCliente', dui);
      formData.append('telefonoCliente', telefono);
      formData.append('telefonoFijoCliente', telefono_fijo);
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=editProfile`, {
        method: 'POST',
        body: formData
        });
      const data = await response.json();
      console.log('Estoy en el console luego de que da la respuesta la api ',data);
      if (data.status) {
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        setIsEditing(false);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil, reiniciar');
    }
  };

  useEffect(() => {
    getUser();
    handleEditToggle();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>
      <Text style={styles.subtitle}>En este apartado podrás editar tu perfil</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombres: </Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          editable={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Apellidos: </Text>
        <TextInput
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
          editable={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo: </Text>
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          editable={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>DUI: </Text>
        <TextInput
          style={styles.input}
          value={dui}
          onChangeText={setDui}
          editable={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Teléfono móvil: </Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          editable={isEditing}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Teléfono fijo: </Text>
        <TextInput
          style={styles.input}
          value={telefono_fijo}
          onChangeText={setTelefono_Fijo}
          editable={isEditing}
        />
      </View>

      {isEditing ? (
        <SimpleButton
        textoBoton='Guardar cambios'
        accionBoton={handleSaveChanges}
      />
      ) : (
        <SimpleButton
        textoBoton='Editar perfil'
        accionBoton={handleEditToggle}
      />
      )}

      <SimpleButton
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
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  input: {
    flex: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
});