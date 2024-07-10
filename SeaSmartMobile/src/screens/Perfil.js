import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import Buttons from '../components/Buttons/Buttons';
import * as Constantes from '../utils/Constantes';

export default function Perfil({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [dui, setDui] = useState('');
  const [telefono, setTelefono] = useState('');
  const [telefono_fijo, setTelefono_Fijo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const ip = Constantes.IP;

  const handleLogout = async () => {
    navigation.navigate('Login');
  }

  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setNombre(data.nombre);
        setApellido(data.apellido);
        setCorreo(data.correo);
        setDui(data.dui);
        setTelefono(data.telefono);
        setTelefono_Fijo(data.telefono_fijo);
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
      const response = await fetch(`${ip}/SeaSmart/api/services/public/clientes.php?action=editProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          correo: correo,
          dui: dui,
          telefono: telefono,
          telefono_fijo: telefono_fijo,
        }),
      });
      const data = await response.json();
      if (data.status) {
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        setIsEditing(false);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil');
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
        {isEditing && <TouchableOpacity onPress={() => {}}><Text>✏️</Text></TouchableOpacity>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Apellidos: </Text>
        <TextInput
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
          editable={isEditing}
        />
        {isEditing && <TouchableOpacity onPress={() => {}}><Text>✏️</Text></TouchableOpacity>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo: </Text>
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          editable={isEditing}
        />
        {isEditing && <TouchableOpacity onPress={() => {}}><Text>✏️</Text></TouchableOpacity>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>DUI: </ Text>
        <TextInput
          style={styles.input}
          value={dui}
          onChangeText={setDui}
          editable={isEditing}
        />
        {isEditing && <TouchableOpacity onPress={() => {}}><Text>✏️</Text></TouchableOpacity>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Teléfono móvil: </Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          editable={isEditing}
        />
        {isEditing && <TouchableOpacity onPress={() => {}}><Text>✏️</Text></TouchableOpacity>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Teléfono fijo: </Text>
        <TextInput
          style={styles.input}
          value={telefono_fijo}
          onChangeText={setTelefono_Fijo}
          editable={isEditing}
        />
        {isEditing && <TouchableOpacity onPress={() => {}}><Text>✏️</Text></TouchableOpacity>}
      </View>

      {isEditing ? (
        <Buttons textoBoton="Guardar cambios" accionBoton={handleSaveChanges} />
      ) : (
        <Buttons textoBoton="Editar información" accionBoton={handleEditToggle} />
      )}

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
    padding: 20,
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
