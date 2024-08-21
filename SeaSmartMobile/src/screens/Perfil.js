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

  // Función que permite obtener la información del cliente por medio de una consulta.
  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=readProfile`, {
        method: 'GET'
      });
      const data = await response.json();
      
      if (data.status) {
        let nombre = data.dataset.nombre_cliente;
        let apellido = data.dataset.apellido_cliente;

        // Capitalizar nombres
        let nombreArray = nombre.split(" ");
        let nombreCapitalizado = "";
        for (var i = 0; i < nombreArray.length; i++) {
          nombreCapitalizado += " " + nombreArray[i].charAt(0).toUpperCase() + nombreArray[i].substring(1);
        }

        // Capitalizar apellidos
        let apellidoArray = apellido.split(" ");
        let apellidoCapitalizado = "";
        for (var i = 0; i < apellidoArray.length; i++) {
          apellidoCapitalizado += " " + apellidoArray[i].charAt(0).toUpperCase() + apellidoArray[i].substring(1);
        }

        setNombre(nombreCapitalizado.trim());
        setApellido(apellidoCapitalizado.trim());
        setCorreo(data.dataset.correo_cliente);
        setDui(data.dataset.dui_cliente);
        setTelefono(data.dataset.telefono_movil);
        setTelefono_Fijo(data.dataset.telefono_fijo);
        setIdCliente(data.dataset.id_cliente);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', error.toString());
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
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
      if (data.status) {
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        setIsEditing(false);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil, reiniciar');
    }
  };

  useEffect(() => {
    getUser();
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
