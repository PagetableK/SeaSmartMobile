import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import * as Constantes from '../utils/Constantes';
import trajeHombre4 from '../img/trajeHombre4.png';
import trajeMujer13 from '../img/trajeMujer13.png';

import fetchData from '../components/utils/fetchData';

const BASE_URL_IMG = "http://192.168.0.9/SeaSmart/api/resources/img/";

export default function Inicio({ navigation }) {
  const [nombre, setNombre] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const ip = Constantes.IP;

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

  const getUser = async () => {
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

  const fetchCategories = async () => {
    try {
      const response = await fetchData('categorias', 'readAll');
      console.log('Categorías obtenidas:', response);

      if (response.status === 1 && Array.isArray(response.dataset)) {
        const uniqueCategories = response.dataset.filter((item, index, self) =>
          index === self.findIndex((t) => t.id_categoria === item.id_categoria)
        );
        setCategories(uniqueCategories);
        setFilteredCategories(uniqueCategories);
      } else {
        Alert.alert('Error', 'Ocurrió un error al obtener las categorías');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener las categorías');
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = categories.filter((category) =>
      category.nombre_categoria.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  useEffect(() => {
    getUser();
    fetchCategories();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nombre_categoria}</Text>
      <Image source={item.imagen_categoria ? { uri: `${BASE_URL_IMG}/${item.imagen_categoria}` } : trajeHombre4} style={styles.cardImage} />
      <Text style={styles.cardDescription}>{item.descripcion_categoria}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Productos')}>
        <Text style={styles.buttonText}>Ver productos</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Buscar una categoría" 
          value={searchText} 
          onChangeText={handleSearch}
        />
      </View>
      <Text style={styles.categoryText}>Categorías</Text>
      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_categoria.toString()}
        contentContainerStyle={styles.categoryContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  categoryText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  categoryContainer: {
    alignItems: 'center',
  },
  card: {
    width: '90%', // Asegura que todas las tarjetas tengan el mismo ancho
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center', // Centra el contenido de las tarjetas
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cardImage: {
    width: '100%', // Ajusta el ancho de la imagen al ancho de la tarjeta
    height: 150,
    marginVertical: 10,
    resizeMode: 'contain', // Ajusta la imagen dentro de la tarjeta sin distorsionar
  },
  cardDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#5dade2',
    padding: 10,
    borderRadius: 5,
    width: '80%', // Asegura que todos los botones tengan el mismo ancho
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerText: {
    fontSize: 16,
    color: '#3498db',
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
